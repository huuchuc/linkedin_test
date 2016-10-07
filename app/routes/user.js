// var User = require('../models/user');
module.exports = function(app){

	// Create request
	app.post('/api/user/create', function(req, res){
		res.send("create user");
	});

	// list request
	app.get('/api/user/list', function(req, res){
	 	res.send("List user");
	});

	// detail request
	app.get('/api/user/detail/:user_id', function(req, res){
	 	res.send("detail");
	});

	// Delete user
	app.delete('/api/user/delete/:user_id', function(req, res) {
	   	res.send("deleted");
	});

};