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
   * @summary Explode each classfile to an array of breakpoint files, then concatenate.
   * @type {{filename:string, contents:string}}
   */
  let stylesheets_dev = cssclassfiles.map((file) => breakpoints.map((bp) => ({
    filename: `${path.parse(file.filename).name.slice(1)}${bp.suffix}.less`, // slice(1) removes the underscore `_`
    contents: `
      @import (reference) url('../../src/${file.filename}');
      @media ${bp.query} {
        ${file.classes.map((classname) => `.${classname}${bp.suffix} { .${classname} };`).join('\n')}
      }
    `
  }))).reduce((a,b) => a.concat(b), [])
  // TODO: uncomment this after `/css/src/xmeter.less` is removed and can be automated (after v7)
  // stylesheets_dev.push({
  //   filename: 'xmeter.less',
  //   contents: cssclassfiles.map((file) => `@import url('../../src/${file.filename}');`).join('\n')
  // })

  /**
   * @summary Map the breakpoints to Less file setups.
   * @type {{filename:string, contents:string}}
   */
  let stylesheets_prod = breakpoints.map((bp) => ({
    filename: `xmeter${bp.suffix}.less`,
    contents: `
      ${cssclassfiles.map((file) => `@import (reference) url('../../src/${file.filename}');`).join('\n')}
      @media ${bp.query} {
        ${
          cssclassfiles.map((file) =>
            file.classes.map((classname) => `.${classname}${bp.suffix} { .${classname} };`).join('\n')
          ).join('\n')
        }
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

  await createDir('./css/dist/')
  await Promise.all([
    (async function () {
  await createDir('./css/dist/dev/')
  await Promise.all(stylesheets_dev.map((ss) =>
    util.promisify(fs.writeFile)(path.resolve(__dirname, './css/dist/dev/', ss.filename), ss.contents, 'utf8')
  ))
    })(),
    (async function () {
  await createDir('./css/dist/prod/')
  await Promise.all(stylesheets_prod.map((ss) =>
    util.promisify(fs.writeFile)(path.resolve(__dirname, './css/dist/prod/', ss.filename), ss.contents, 'utf8')
  ))
    })(),
  ])
})


gulp.task('lessc-dev', ['generate-less'], function () {
  return gulp.src(['./css/src/*.less', './css/dist/dev/*.less'])
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(rename(function (pathish) {
      if (pathish.basename[0] === '_') pathish.basename = pathish.basename.slice(1)
    }))
    .pipe(gulp.dest('./css/dist/dev/'))
})

gulp.task('lessc-prod', ['lessc-dev'], function () {
  return gulp.src(['./css/src/xmeter.less', './css/dist/prod/xmeter-*.less'])
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
    .pipe(gulp.dest('./css/dist/prod/'))
})

gulp.task('lessc:core', ['lessc-prod'], function () {
  return gulp.src('./css/dist/prod/xmeter.css{,.map}')
    .pipe(gulp.dest('./css/'))
})

gulp.task('build', ['lessc:core', 'build:docs'])
