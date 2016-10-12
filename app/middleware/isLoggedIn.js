// middleware for authentication
module.exports = function(req, res, next) {
	console.log('/isLoggedIn: ');
    // check authenticated?
    if (req.isAuthenticated())
        return next();

    // if not return message to screen
    return res.json({message: 'you dont have permissions to access this url'});
}