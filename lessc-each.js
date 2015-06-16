
// This module takes a groups of files, filters out the non-less files,
// then compiles all the less files into their css counterparts.
//
// Run `node  lessc-each.js  <dir1>  <dir2>` to activate.
// @param `<dir1>` - the directory of files to compile
// @param `<dir2>` - the directory for output files to go

var
    fs = require('fs')
  , path = require('path')
  , less = require('less')

var dir_start = process.cwd()                                     // directory from which node was run
  , dir_in    = path.normalize(process.cwd() + '/' + process.argv[2]) // directory where less src files are
  , dir_out   = path.normalize(process.cwd() + '/' + process.argv[3]) // directory to put output css

try {
  process.chdir(dir_in)

fs.readdir(dir_in, function (err, files) {
  if (err) return console.error('There was an error: ', err)

  var less_files = files.filter(function (el) {
    var ext = path.parse(el).ext
    var name = path.parse(el).name
    return (ext === '.less') && (name.slice(0,2) !== '__')
  })

  less_files.forEach(function (el) {
    var path_less = path.normalize(dir_in  + '/' + el)
    var path_css  = path.normalize(dir_out + '/' + el.slice(0, el.length-5) + '.css')

    fs.readFile(path_less, 'utf8', function (err, data) {
      if (err) return console.error('There was an error: ', err)
      less.render(data, function (error, output) {
        if (error) {
          console.error('FATAL! ' + path_less + ' does NOT compile due to:' + '\n    ' + error.message)
          console.log('Continuing to next file...')
        } else {
          fs.writeFile(path_css, output.css, function (err, data) {
            if (err) return console.error('There was an error: ', err)
            path_less = path_less.split(dir_start + '/')[1] // removes the first dir_start from string
            path_css = path_css.split(dir_start + '/')[1]   // removes the first dir_start from string
            console.log('Success! ' + path_less + ' > ' + path_css)
          })
        }
      })
    })
  })
})

} catch (err) {
  console.error('chdir: ' + err)
}
