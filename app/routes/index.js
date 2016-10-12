var user 	= require('./user');
var login	= require('./login');
var note    = require('./note');

module.exports = function(app, passport) {

    //user 
    user(app);
    //Note
    note(app);
    //login
    login(app, passport);

    //route all request to index.html
    app.get('*', function(req, res) {
        res.sendfile('public/index.html');
    });
};
