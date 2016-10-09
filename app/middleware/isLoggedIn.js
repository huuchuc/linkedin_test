module.exports = function (app, passport) {
	console.log('isLoggedIn');
    function isLoggedIn (req, res, next) {
      if (!(req.session && req.session.user)) {
        return res.redirect('/login');
      }
      next();
    }
}
