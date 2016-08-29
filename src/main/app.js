var path = require('path');
var express = require('express');

var app = express();

// -- VIEW ENGINE --

(function (app) {
  var exphbs = require('express-handlebars');
  var viewEngine = 'hbs';
  var viewPath = path.join(__dirname, 'views');
  var viewLayoutPath = path.join(viewPath, 'layouts');
  var viewPartialPath = path.join(viewPath, 'partials');
  var hbs = exphbs.create({
    extname: '.' + viewEngine,
    layoutsDir: viewLayoutPath,
    partialsDir: viewPartialPath,
    defaultLayout: 'base',
    helpers: {
      hole: function (holeName) {
        var holes = this._holes;
        parts = holes && holes[holeName];
        return parts ? parts.join('\n') : null;
      },
      fill: function (holeName, options) {
        var holes = this._holes || (this._holes = {})
          , hole = holes[holeName] || (holes[holeName] = []);
        hole.push(options.fn(this));
      }
    }
  });
  app.engine(viewEngine, hbs.engine);
  app.set('view engine', viewEngine);
  app.set('views', viewPath);
  app.set('view cache', false);
})(app);

// -- STATIC RESOURCES --
app.use('/build', express.static('build'));
app.use('/bower', express.static('bower_components'));
app.use('/theme', express.static('bower_components/AdminLTE'));
app.use('/static', express.static(path.join(__dirname, 'static')));

// -- ROUTERS --
var menuService = require('./services/MenuService');
app.get('/', function (req, res) {
  res.render('home', {
    layout: req.query.dist ? 'dist' : 'base',
    debug: true,
    menus: menuService.menus()
  });
});

var mockService = require('./services/MockService');
app.get('/api/mock/:fn', function (req, res) {
  var fn = req.params.fn;
  res.json(mockService[fn](req.query));
});

// --------------------------------------------------------
// START SERVICE

var PORT = 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});
