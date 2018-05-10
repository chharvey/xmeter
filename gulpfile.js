const fs = require('fs')
const path = require('path')
const util = require('util')

const gulp         = require('gulp')
const rename       = require('gulp-rename')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')
const jsdom        = require('jsdom')
const kss          = require('kss')

const xjs          = require('extrajs-dom')
const {xDirectory,xPermalink} = require('aria-patterns')

const createDir = require('./lib/createDir.js')


// HOW-TO: https://github.com/kss-node/kss-node/issues/161#issuecomment-222292620
gulp.task('docs-kss-markup', async function () {
  return kss(require('./config/kss.json'))
})

gulp.task('docs-kss-style', async function () {
  return gulp.src('./docs/css/kss-custom.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(gulp.dest('./docs/styleguide/'))
})

gulp.task('docs-kss', ['docs-kss-markup', 'docs-kss-style'])

gulp.task('docs-my-markup', async function () {
  const dom = new jsdom.JSDOM(await util.promisify(fs.readFile)(path.join(__dirname, './docs/tpl/index.tpl.html'), 'utf8'))
  const {document} = dom.window

  await (async function importLinks(relativepath) {
    if (!('import' in jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link'))) {
      console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents.')
      return Promise.all(Array.from(document.querySelectorAll('link[rel~="import"][data-import]')).map(async function (link) {
        const import_switch = {
          'document': async () => jsdom.JSDOM.fragment(await util.promisify(fs.readFile)(path.resolve(relativepath, link.href), 'utf8')),
          'template': async () => (await xjs.HTMLTemplateElement.fromFile(path.resolve(relativepath, link.href))).content(),
          async default() { return null },
        }
        let imported = await (import_switch[link.getAttribute('data-import')] || import_switch.default).call(null)
        if (imported) {
          link.after(imported)
          link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
        }
      }))
    } else return;
  })(path.resolve(__dirname, './docs/tpl/'))

  await Promise.all([
    (async function () {
      document.querySelector('#contents').append(xDirectory.render(require('./docs/index-toc.json')))
    })(),
    (async function () {
      const classname = {
        figure: 'docs-figure',
        pre   : 'docs-pre',
        code  : 'docs-code',
        form  : 'docs-form',
      }
      let fragment = (await xjs.HTMLTemplateElement.fromFile(path.resolve(__dirname, './docs/tpl/base.tpl.html'))).content().cloneNode(true)
      fragment.querySelectorAll([
        'section[id] > h2:first-of-type',
        'section[id] > h3:first-of-type',
        'section[id] > h4:first-of-type',
        'section[id] > h5:first-of-type',
        'section[id] > h6:first-of-type',
      ].join()).forEach(function (hn) {
        hn.append(xPermalink.render({ id: hn.parentNode.id }))
      })
      fragment.querySelectorAll(Object.keys(classname).join()).forEach(function (el) {
        let xel = new xjs.HTMLElement(el)
        if (classname[xel.tagName]) xel.addClass(classname[xel.tagName])
      })
      document.querySelector('main').append(fragment)
    })(),
  ])

  await util.promisify(fs.writeFile)(path.resolve(__dirname, './docs/index.html'), dom.serialize(), 'utf8')
})

gulp.task('docs-my-style', async function () {
  return gulp.src('docs/css/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('build:docs', ['docs:kss', 'render:docs', 'lessc:docs'])

gulp.task('docs-my', ['docs-my-markup', 'docs-my-style'])

gulp.task('docs', ['docs-kss', 'docs-my'])

gulp.task('dist-style', async function () {
  return gulp.src(['./css/src/*.less', '!./css/src/__*.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(clean_css({
      level: {
        2: {
          overrideProperties: false, // need fallbacks for `initial` and `unset`
          restructureRules: true, // combines selectors having the same rule (akin to `&:extend()`) // REVIEW be careful here
        },
      },
    }))
    .pipe(rename(function (p) {
      if (p.basename[0] === '_') {
        p.basename = p.basename.slice(1)
      }
    }))
    .pipe(sourcemaps.write('./')) // writes to an external .map file
    .pipe(gulp.dest('./css/dist/'))
})

gulp.task('dist', ['dist-style'])

gulp.task('build', ['docs', 'dist'])
