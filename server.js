// INIT APP ======================================

var express 	  = require('express');
var app 		  = express();
var server    	  = require('http').createServer(app);

// var pg 		  	  = require('pg');
// var database      = require('./config/database');
// const connString  = process.env.DATABASE_URL || database.connString;


var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var passport      = require('passport');

var session       = require('express-session');
var routes        = require('./app/routes');

var models		  = require('./app/models');

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
    secret: 'note'
    // cookie:{maxAge : 60000 * 30} // 30 mins
}));

// Init passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Authenticate middleware
var isLoggedIn = require('./app/middleware');
isLoggedIn(app, passport);

// Routes ===================

routes(app, passport);


// LAUNCH ===================
// Sequelize
models.sequelize.sync().then(function () {
  	server.listen(port);
	console.log('Server is running on '+ port);
});

// server.listen(port);
// console.log('Server is running on '+ port);

module.exports = app;

















