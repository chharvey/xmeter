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
const kss          = require('kss')


const PACKAGE = require('./package.json')
const META = JSON.stringify({
  package: `https://www.npmjs.com/package/${PACKAGE.name}`,
  version: PACKAGE.version,
  license: PACKAGE.license,
  built  : new Date().toISOString(),
}, null, 2)


gulp.task('dist', async function () {
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
})

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

gulp.task('docs', ['docs-kss'])

gulp.task('build', ['dist', 'docs'])
