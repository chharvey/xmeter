var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')

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
