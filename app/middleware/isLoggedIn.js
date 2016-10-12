var express = require('express');

module.exports = function(req, res, next) {
	console.log('/isLoggedIn: ');
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    if (req.isAuthenticated())
        return next();

    // IF A USER ISN'T LOGGED IN
    return res.send(401);
}