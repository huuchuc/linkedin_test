// INIT APP ======================================

var express = require('express');
var app = express();
var server    = require('http').createServer(app);

var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var passport      = require('passport');

var session       = require('express-session');
var routes        = require('./app/routes');


// CONFIG APP ============================

// View engine
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

// server port and home folder
var port = process.env.PORT || 3000;
app.use(express.static(__dirname+'/public'));

// Log every request
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(cookieParser());

// required for passport
app.use(session({
    secret: 'note',
    cookie:{maxAge : 60000 * 30} // 30 mins
}));

// Routes ===================

routes(app);

// LAUNCH ===================

server.listen(port);
console.log('Server is running on '+ port);

exports = module.exports = app;

// module.exports = app;
