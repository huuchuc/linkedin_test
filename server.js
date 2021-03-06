// INIT APP ======================================

var express 	  = require('express');
var app 		  = express();
var server    	  = require('http').createServer(app);
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
    secret: 'note',
    saveUninitialized: true,
  	resave: true,
    cookie:{maxAge : 60000 * 30} // 30 mins
}));

// Init passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Authenticate middleware
var middleware = require('./app/middleware');
middleware(app);

// Routes ===================

routes(app, passport);

// LAUNCH ===================
// Sequelize sync models to db
models.sequelize.sync().then(function () {
  	server.listen(port);
	console.log('Server is running on '+ port);
});

module.exports = app;

















