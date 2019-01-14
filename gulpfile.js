const fs = require('fs')
const path = require('path')
const util = require('util')

const gulp         = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const inject       = require('gulp-inject-string')
const less         = require('gulp-less')
const rename       = require('gulp-rename')
const sourcemaps   = require('gulp-sourcemaps')
const jsdom        = require('jsdom')
const kss          = require('kss')

const xjs = require('extrajs-dom')
const {xDirectory,xPermalink} = require('aria-patterns')

const PACKAGE = require('./package.json')
const META = JSON.stringify({
	package: `https://www.npmjs.com/package/${PACKAGE.name}`,
	version: PACKAGE.version,
	license: PACKAGE.license,
	built  : new Date().toISOString(),
}, null, '\t')


function dist() {
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
		.pipe(rename((p) => {
			if (p.basename[0] === '_') {
				p.basename = p.basename.slice(1)
			}
		}))
		.pipe(inject.prepend(`/* ${META} */`))
		.pipe(sourcemaps.write('./')) // writes to an external .map file
		.pipe(gulp.dest('./css/dist/'))
}

// HOW-TO: https://github.com/kss-node/kss-node/issues/161#issuecomment-222292620
async function docs_kss_markup() {
  return kss(require('./config/kss.json'))
}

function docs_kss_style() {
  return gulp.src('./docs/css/kss-custom.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(gulp.dest('./docs/styleguide/'))
}

const docs_kss = gulp.parallel(docs_kss_markup, docs_kss_style)

async function docs_my_markup() {
  const dom = new jsdom.JSDOM(await util.promisify(fs.readFile)(path.join(__dirname, './docs/tpl/index.tpl.html'), 'utf8'))
  const {document} = dom.window

  await new xjs.Document(document).importLinksAsync(path.resolve(__dirname, './docs/tpl/'))

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
      ].join()).forEach((hn) => {
        hn.append(xPermalink.render({ id: hn.parentNode.id }))
      })
      fragment.querySelectorAll(Object.keys(classname).join()).forEach((el) => {
        let xel = new xjs.HTMLElement(el)
        if (classname[xel.tagName]) xel.addClass(classname[xel.tagName])
      })
      document.querySelector('main').append(fragment)
    })(),
  ])

  await util.promisify(fs.writeFile)(path.resolve(__dirname, './docs/index.html'), dom.serialize(), 'utf8')
}

function docs_my_style() {
  return gulp.src('docs/css/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(gulp.dest('./docs/css/'))
}

const docs_my = gulp.parallel(docs_my_markup, docs_my_style)

const docs = gulp.parallel(docs_kss, docs_my)

const build = gulp.parallel(dist, docs)

module.exports = {
	dist,
	docs_kss_markup,
	docs_kss_style,
	docs_kss,
	docs_my_markup,
	docs_my_style,
	docs_my,
	docs,
	build,
}
