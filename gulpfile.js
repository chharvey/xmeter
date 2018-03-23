const fs = require('fs')
const path = require('path')
const util = require('util')

const kss          = require('kss')
const gulp         = require('gulp')
const rename       = require("gulp-rename");
const jsdoc        = require('gulp-jsdoc3')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')

const createDir = require('./lib/createDir.js')


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
        '-fz-el-peta',
        '-fz-el-tera',
        '-fz-el-giga',
        '-fz-el-mega',
        '-fz-el-kilo',
        '-fz-el-norm',
        '-fz-el-mill',
        '-fz-el-micr',
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
