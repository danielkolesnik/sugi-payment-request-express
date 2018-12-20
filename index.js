// outsource modules
var path = require('path');
var express = require('express');
var config = require('./environment');
var mustacheExpress = require('mustache-express');
// local modules
var initRouter = require('./router');

// declare global variables
var app = express();
// setup static resources
app.use(express.static(path.join(__dirname, 'public')));
// NOTE setup routing
initRouter(app);

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
