// LOGIN FUNCTION
module.exports = function(app, passport) {
    
    //CHECK IS LOGGED IN?
    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    // LOGIN 
    app.post('/login', passport.authenticate('login'), function(req, res) {
        res.send(req.user);
    });

    // REGISTER
    app.post('/signup', passport.authenticate('signup'), function(req, res) {
        return res.send(req.user);
    });

    // LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy();
        res.send(200);
    });
}