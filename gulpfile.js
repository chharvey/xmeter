const fs = require('fs')
const path = require('path')
const util = require('util')

const kss          = require('kss')
const jsdom        = require('jsdom')
const gulp         = require('gulp')
const jsdoc        = require('gulp-jsdoc3')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')

const {xDirectory} = require('aria-patterns')

const createDir = require('./lib/createDir.js')


gulp.task('docs:api', function () {
  return gulp.src(['README.md', './index.js', 'class/Xmeter.class.js'], {read: false})
    .pipe(jsdoc(require('./config/jsdoc.json')))
})

gulp.task('docs:kss', function () {
  return kss(require('./config/kss.json'))
})

gulp.task('render:docs', async function () {
  const dom = new jsdom.JSDOM(await util.promisify(fs.readFile)(path.join(__dirname, './docs/tpl/index.tpl.html'), 'utf8'))
  const {document} = dom.window

  async function importLinks(relativepath) {
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
  }

  await importLinks(path.resolve(__dirname, './docs/tpl/'));

  await Promise.all([
    (async function () {
      document.querySelector('#contents').append(xDirectory.render(require('./docs/index-toc.json')))
    })(),
    (async function () {
      document.querySelector('main').append()
    })(),
  ])

  await util.promisify(fs.writeFile)(path.resolve(__dirname, './docs/index.html'), dom.serialize(), 'utf8')
})

gulp.task('pug:docs', function () {
  return gulp.src('docs/{index,base}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Xmeter: require('./class/Xmeter.class.js'),
        Docs  : require('./docs/class/Docs.class.js'),
      },
    }))
    .pipe(gulp.dest('./docs/'))
})

gulp.task('lessc:docs', function () {
  gulp.src('./docs/css/kss-custom.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(gulp.dest('./docs/styleguide/'))
  return gulp.src('docs/css/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('build:docs', ['docs:api', 'docs:kss', 'pug:docs', 'lessc:docs'])

gulp.task('generate-less', async function () {
  /**
   * @summary List of breakpoints, corresponding to query-specific stylesheets.
   * @type {Array<{suffix:string, query:string}>}
   */
  let breakpoints = [
    { suffix: '-sK', query: 'screen  and (min-width: 30em)' },
    { suffix: '-sM', query: 'screen  and (min-width: 45em)' },
    { suffix: '-sG', query: 'screen  and (min-width: 60em)' },
    { suffix: '-sT', query: 'screen  and (min-width: 75em)' },
    { suffix: '-sP', query: 'screen  and (min-width: 90em)' },
    { suffix: '-nK', query: 'not all and (min-width: 30em)' },
    { suffix: '-nM', query: 'not all and (min-width: 45em)' },
    { suffix: '-nG', query: 'not all and (min-width: 60em)' },
    { suffix: '-nT', query: 'not all and (min-width: 75em)' },
    { suffix: '-nP', query: 'not all and (min-width: 90em)' },
  ]
  /**
   * @summary List of source files.
   * @type {Array<{filename:string, classes:Array<string>}>}
   * @property {string} filename the name of the file
   * @property {Array<string>} classes the classes written in the file
   */
  let cssclassfiles = [
    // REVIEW use `fs.readdir(path.resolve(__dirname, './css/src/'))` and filter out only the ones you want
    { filename: '_o-List.less'     , classes: [ 'o-List', 'o-List__Item' ] },
    { filename: '_o-Flex.less'     , classes: [ 'o-Flex', 'o-Flex__Item' ] },
    { filename: '_o-Grid.less'     , classes: [ 'o-Grid', 'o-Grid__Item' ] },
    { filename: '_h-Block.less'    , classes: [ 'h-Block' ] },
    { filename: '_h-Inline.less'   , classes: [ 'h-Inline' ] },
    { filename: '_h-Clearfix.less' , classes: [ 'h-Clearfix' ] },
    { filename: '_h-Measure.less'  , classes: [ 'h-Measure', 'h-Measure--narrow', 'h-Measure--wide' ] },
    { filename: '_h-Constrain.less', classes: [ 'h-Constrain' ] },
    { filename: '_h-FontSize.less' , classes: [ 'h-FontSize' ] },
    { filename: '_h-Ruled.less'    , classes: [ 'h-Ruled' ] },
    {
      filename: '_-fz.less',
      classes: [
        '-fz-peta',
        '-fz-tera',
        '-fz-giga',
        '-fz-mega',
        '-fz-kilo',
        '-fz-norm',
        '-fz-mill',
        '-fz-micr',
        '-fz-el-peta', // CHANGED-DEPRECATED
        '-fz-el-tera', // CHANGED-DEPRECATED
        '-fz-el-giga', // CHANGED-DEPRECATED
        '-fz-el-mega', // CHANGED-DEPRECATED
        '-fz-el-kilo', // CHANGED-DEPRECATED
        '-fz-el-norm', // CHANGED-DEPRECATED
        '-fz-el-mill', // CHANGED-DEPRECATED
        '-fz-el-micr', // CHANGED-DEPRECATED
      ],
    },
  ]
  /**
   * @summary Map the breakpoints to Less file setups.
   * @type {{filename:string, contents:string}}
   */
  let stylesheets_prod = breakpoints.map((bp) => ({
    filename: `xmeter${bp.suffix}.less`,
    contents: `
      ${cssclassfiles.map((file) => `@import (reference) url('../src/${file.filename}');`).join('\n')}
      @media ${bp.query} {
        ${
          cssclassfiles.map((file) =>
            file.classes.map((classname) => `.${classname}${bp.suffix} { .${classname} };`).join('\n')
          ).join('\n')
        }
      }
    `,
  }))
  await createDir('./css/dist/')
  await Promise.all(stylesheets_prod.map((ss) =>
    util.promisify(fs.writeFile)(path.resolve(__dirname, './css/dist/', ss.filename), ss.contents, 'utf8')
  ))
})

gulp.task('lessc-dist', ['generate-less'], function () {
  return gulp.src(['./css/src/xmeter.less', './css/dist/xmeter-*.less'])
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
    .pipe(sourcemaps.write('./')) // writes to an external .map file
    .pipe(gulp.dest('./css/dist/'))
})

gulp.task('lessc:core', ['lessc-dist'], function () {
  return gulp.src('./css/dist/xmeter.css{,.map}')
    .pipe(gulp.dest('./css/'))
})

gulp.task('build', ['lessc:core', 'build:docs'])
