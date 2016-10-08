// LOGIN FUNCTION
module.exports = function(app, passport) {
    
    //check is logged in?
    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    // Login page
    app.post('/login', passport.authenticate('login'), function(req, res) {
        res.send(req.user);
    });

    // Register page
    app.post('/signup', passport.authenticate('signup'), function(req, res) {
        return res.send(req.user);
    });

    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy();
        res.send(200);
    });
}