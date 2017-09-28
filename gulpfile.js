const kss          = require('kss')
const gulp         = require('gulp')
const gulp_doc     = require('gulp-documentation')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')

gulp.task('docs:api', function () {
  return gulp.src('./index.js')
    .pipe(gulp_doc('html'))
    .pipe(gulp.dest('./docs/api/'))
})

gulp.task('docs:kss', function () {
  return kss(require('./kss-config.json'))
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
  return gulp.src('docs/css/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('lessc:core', function () {
  return gulp.src('css/src/xmeter.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(sourcemaps.init())
    .pipe(clean_css({
      level: {
        2: {
          overrideProperties: false, // need fallbacks for `initial` and `unset`
          restructureRules: true, // combines selectors having the same rule (akin to `&:extend()`) // REVIEW be careful here
        },
      },
    }))
    .pipe(sourcemaps.write('./')) // writes to an external .map file
    .pipe(gulp.dest('./css/'))
})

gulp.task('build', ['pug:docs', 'lessc:docs', 'lessc:core'])
