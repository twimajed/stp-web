var path = require('path');
var fs = require('fs-extra');

var bowerDir = 'bower_components',
  themeDir = bowerDir + '/AdminLTE',
  staticDir = 'src/main/static';

function copyFont(outputDir) {
  var srcs = [
    themeDir + '/bootstrap/fonts',
    bowerDir + '/font-awesome/fonts'
  ];

  console.log('===== COPY FONT =====');
  fs.mkdirsSync(outputDir);
  srcs.forEach(function (path) {
    fs.copySync(path, outputDir);
  });
}

function copyImage(outputDir) {
  console.log('===== COPY IMGS =====');
  fs.mkdirsSync(outputDir);
  fs.copySync(staticDir + '/images', outputDir);
}

function copySource(names, outputDir) {
  fs.mkdirsSync(outputDir);
  names.forEach(function(name) {
    fs.copySync(staticDir + '/el/' + name, path.join(outputDir, name));
  });
}

function buildCSS(outputDir) {
  var srcs = [
    bowerDir + '/font-awesome/css/font-awesome.css',
    themeDir + '/bootstrap/css/bootstrap.css',
    themeDir + '/plugins/datepicker/datepicker3.css',
    bowerDir + '/fullcalendar/dist/fullcalendar.css',
    bowerDir + '/antiscroll/antiscroll.css',

    staticDir + '/theme/theme.css',
    staticDir + '/theme/theme.skin.css',
    staticDir + '/theme/theme-stp.css'
  ];

  // @see https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
  var opts = {
    // debug: true,
    // sourceMap: true,
    rebase: false
  };

  console.log('===== BUILD CSS =====');
  // Copy source files
  copySource(['el.css', 'el_stp.css'], outputDir);
  // Build source files
  var CleanCSS = require('clean-css');
  new CleanCSS(opts).minify(srcs, function (error, minified) {
    if (error) console.log(error);
    fs.writeFileSync(outputDir + '/ui.css', minified.styles);
  });
}

function buildJS(outputDir) {
  var srcs = [
    bowerDir + '/system.js/dist/system.js',
    bowerDir + '/moment/moment.js',
    bowerDir + '/lodash/dist/lodash.js',
    bowerDir + '/handlebars/handlebars.js',
    bowerDir + '/jquery/dist/jquery.js',

    themeDir + '/bootstrap/js/bootstrap.js',
    themeDir + '/plugins/datepicker/bootstrap-datepicker.js',
    themeDir + '/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js',

    bowerDir + '/fullcalendar/dist/fullcalendar.js',
    bowerDir + '/fullcalendar/dist/lang/zh-cn.js',
    bowerDir + '/Chart.js/dist/Chart.js',

    bowerDir + '/jquery-mousewheel/jquery.mousewheel.js',
    bowerDir + '/antiscroll/scrollbar.js',
    bowerDir + '/antiscroll/antiscroll.js',

    staticDir + '/theme/theme.js'
  ];

  // @see https://github.com/mishoo/UglifyJS2
  var opts = {
    compress: {
      unused: true,
      dead_code: true,
      join_vars: true,
      drop_console: true,
      global_defs: {
        DEBUG: false
      }
    }
  };

  console.log('===== BUILD  JS =====');
  // Copy source files
  copySource(['el.js', 'el_stp.js'], outputDir);
  // Build source files
  var uglifyJS = require('uglify-js');
  var minified = uglifyJS.minify(srcs, opts);
  fs.writeFileSync(outputDir + '/ui.js', minified.code);
}

function build() {
  var outputDir = 'build';
  copyImage(outputDir + '/images');
  copyFont(outputDir + '/fonts');
  buildCSS(outputDir + '/css');
  buildJS(outputDir + '/js');
}

build();
