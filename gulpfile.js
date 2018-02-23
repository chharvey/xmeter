const fs = require('fs')
const path = require('path')
const util = require('util')

const kss          = require('kss')
const gulp         = require('gulp')
const jsdoc        = require('gulp-jsdoc3')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')

gulp.task('docs:api', function () {
  return gulp.src(['README.md', './index.js', 'class/Xmeter.class.js'], {read: false})
    .pipe(jsdoc(require('./config/jsdoc.json')))
})

gulp.task('docs:kss', function () {
  return kss(require('./config/kss.json'))
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
    }))
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('build:docs', ['docs:api', 'docs:kss', 'pug:docs', 'lessc:docs'])

gulp.task('lessc:each', async function () {
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

  let files = [
    // TODO use `fs.readdir(path.resolve(__dirname, './css/src/'))` and filter out only the ones you want
    'o-List',
    'o-Flex',
    'o-Grid',
    'h-Block',
    'h-Inline',
    'h-Clearfix',
    'h-Measure',
    'h-Ruled',
  ]

  let classes = [
    'o-List',
    'o-List__Item',
    'o-Flex',
    'o-Flex__Item',
    'o-Grid',
    'o-Grid__Item',
    'h-Block',
    'h-Inline',
    'h-Clearfix',
    'h-Measure',
    'h-Measure--narrow',
    'h-Measure--wide',
    'h-Ruled',
  ]

  let stylesheets = breakpoints.map((bp) => ({
    filename: `xmeter${bp.suffix}.less`,
    contents: `
      ${files.map((filename) => `@import (reference) url('../src/_${filename}');`).join('\n')}
      @media ${bp.query} {
        ${classes.map((classname) => `.${classname}${bp.suffix} { .${classname}; }`).join('\n')}
      }
    `,
  }))

  try {
    await util.promisify(fs.mkdir)(path.resolve(__dirname, './css/build/'))
  } catch (err) {}

  await Promise.all(stylesheets.map((ss) =>
    util.promisify(fs.writeFile)(path.resolve(__dirname, './css/build/', ss.filename), ss.contents, 'utf8')
  ))
})

gulp.task('lessc:core', function () {
  return gulp.src('css/src/xmeter.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(gulp.dest('./css/'))
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

gulp.task('build', ['lessc:core', 'build:docs'])
