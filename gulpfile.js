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

gulp.task('generate-less', async function () {
  /**
   * @summary List of breakpoints, corresponding to query-specific stylesheets.
   * @private
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
   * @summary List of files to import with `@import (reference) url();`.
   * @private
   * @type {Array<string>}
   */
  let imports = [
    // TODO use `fs.readdir(path.resolve(__dirname, './css/src/'))` and filter out only the ones you want
    '_o-List.less',
    '_o-Flex.less',
    '_o-Grid.less',
    '_h-Block.less',
    '_h-Inline.less',
    '_h-Clearfix.less',
    '_h-Measure.less',
    '_h-Ruled.less',
    '_-fz.less',
  ]

  /**
   * @summary List of classnames that have suffix extensions.
   * @private
   * @type {Array<string>}
   */
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
  ]

  /**
   * @summary Map the breakpoints to Less file setups.
   * @type {{filename:string, contents:string}}
   */
  let stylesheets = breakpoints.map((bp) => ({
    filename: `xmeter${bp.suffix}.less`,
    contents: `
      ${imports.map((filename) => `@import (reference) url('../../src/${filename}');`).join('\n')}
      @media ${bp.query} {
        ${classes.map((classname) => `.${classname}${bp.suffix} { .${classname}; }`).join('\n')}
      }
    `,
  }))


  /**
   * @summary Test access of a directory; if error, make directory.
   * @param   {string} dir directory name relative to `__dirname` (this file)
   */
  async function createDir(dir) {
    try {
      await util.promisify(fs.access)(path.resolve(__dirname, dir))
    } catch (e) {
      await util.promisify(fs.mkdir)(path.resolve(__dirname, dir))
    }
  }

  // @summary Create the actual directories and files.
  await createDir('./css/dist/')
  await createDir('./css/dist/prod/')
  await Promise.all(stylesheets.map((ss) =>
    util.promisify(fs.writeFile)(path.resolve(__dirname, './css/dist/prod/', ss.filename), ss.contents, 'utf8')
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
