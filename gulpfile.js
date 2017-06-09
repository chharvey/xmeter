var gulp = require('gulp')
var rename = require('gulp-rename')
var pug = require('gulp-pug')
var less = require('gulp-less')
var clean_css = require('gulp-clean-css')

gulp.task('pug:docs', function () {
  return gulp.src('docs/{index,base,obj,comp,help,atom}.pug')
    .pipe(pug({
      basedir: './'
    , locals: {
        Docs: require('./docs/_models/Docs.class.js')
      }
    }))
    .pipe(gulp.dest('./docs/'))
})

gulp.task('lessc:docs', function () {
  return gulp.src('docs/styles/docs.less')
    .pipe(less())
    .pipe(gulp.dest('./docs/styles/'))
})

gulp.task('lessc:xmeter', function () {
  return gulp.src('xmeter.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('minify', ['lessc:xmeter'], function () {
  return gulp.src('xmeter.css')
    .pipe(clean_css())
    .pipe(rename('xmeter.min.css')) // TODO: use a SourceMap!
    .pipe(gulp.dest('./'))
})

gulp.task('build', ['pug:docs', 'lessc:docs', 'minify'])
