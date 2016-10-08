var models  = require('../models/index');

module.exports 	= function(app){

	// Create user
	app.post('/api/user/create', function (req, res, next) {  
	  models.user.create({
	    uname	: req.body.uname,
	    password: req.body.password
	  }).then(function(user) {
	    res.json(user);
	  });
	});

	// list all users
	app.get('/api/user/list', function(req, res){
		models.user.findAll({}).then(function(users) {
		    res.json(users);
		});
	});

	// detail single user
	app.get('/api/user/detail/:uid', function(req, res){
		models.user.find({
			where: {
				id: req.params.uid
			}
		}).then(function(user) {
			res.json(user);
		});
	});

	// Delete user
	app.delete('/api/user/delete/:uid', function(req, res) {
		models.user.destroy({
			where: {
				id: req.params.uid
			}
		}).then(function(user) {
			res.json(user);
		});
	});

};