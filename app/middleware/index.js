var express = require('express');

module.exports = function(app, passport) {
    // expose session to views
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });

    
    function isLoggedIn (req, res, next) {
    	console.log('isLoggedIn');
      if (!(req.session && req.session.user)) {
        return res.redirect('/login');
      }
      next();
    }
}