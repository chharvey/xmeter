
var fs = require('fs');
var path = require('path');
var less = require('less');


fs.readdir(process.argv[2], function (err, files) {
  if (err) throw err;

  var less_files = files.filter(function (el) {
    return path.extname(el) === '.less';
  });

  less_files.forEach(function (el) {
    var less_fullpath = process.argv[2] + el;
    var css_fullpath = process.argv[3] + el.slice(0, el.length-5) + '.css';

    fs.readFile(less_fullpath, 'utf8', function (err, data) {
      if (err) throw err;
      less.render(data, {}, function (error, output) {
        if (error) {
          console.warn('FATAL! ' + less_fullpath + ' does NOT compile due to:' + '\n    ' + error.message);
          console.log('Continuing to next file...');
        }
        else {
          fs.writeFile(css_fullpath, output.css, function (err, data) {
            if (err) throw err;
            console.log('Success! ' + less_fullpath + ' > ' + css_fullpath);
          });
        }
      });
    });
  });
});
