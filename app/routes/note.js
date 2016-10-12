var models = require('../models/index');
var isLoggedIn = require('../middleware/isLoggedIn');

module.exports 	= function(app){

	// LIST ALL NOTES BY USER
	app.get('/api/note/list/:user_id', isLoggedIn, function(req, res){
		var user_id = req.params.user_id;
		if(user_id){
			models.note.findAll({
			where: {
				user_id: user_id
				}
			}).then(function(notes) {
				console.log('success: ');
				console.log(notes);
		    	res.json(notes);
			}).error(function(err){
				console.log('err: ');
				console.log(err);
				res.send(err);
		});
		}else{
			res.send(0);
		}
		
	});

	// GET SINGLE NOTE
	app.get('/api/note/detail/:id', isLoggedIn, function(req, res) {
		var note_id = req.params.id;
		if(note_id){
			models.note.find({
			    where: {
			      id: note_id
			    }
			  }).then(function(note) {
			    res.json(note);
			  }).error(function(err){
			  	res.send(err);
			});
		}else{
			res.send(0);
		}
	  
	});

	// ADD NEW NOTE
	app.post('/api/note/add', isLoggedIn, function(req, res) {
		var note = req.body;
		if(note){
			models.note.create({
			    title: note.title,
			    content: note.content,
			    version: 1,
			    user_id: note.user_id
			  }).then(function(note) {
			    res.json(note);
			  }).error(function(err){
			  	res.send(0);
			  });
		}else{
			res.send(0);
		}
	});

	// UPDATE SINGLE NOTE
	app.put('/api/note/update', isLoggedIn, function(req, res) {
	  // Check note is belong to current user
	  models.note.find({
	    where: {
	      id 	 : req.body.id,
	      user_id: req.body.user_id
	    }
	  }).then(function(note) {
	    if(note){
		    var version = note.version;
		    version++;
		    note.updateAttributes({
		        content: req.body.content,
		        version: version
		      }).then(function(note) {
		        res.json(note);
		      });
	    }else{
	    	// cannot found note to update
	    	res.send(0);
	    }
	  }).error(function(err){
	  	res.send(err);
	  });
	});

	// DELETE NOTE
	app.delete('/api/note/delete/:id', isLoggedIn, function(req, res) {
		var note_id = req.params.id;
		if(note_id){
			models.note.destroy({
			    where: {
			      id: note_id
			    }
			  }).then(function(note) {
			  	console.log('delete: ');
			  	console.log(note);
			    res.json({id: note});
			  });
		}else{
			// note id null
			res.send(0);
		}
	  
	});

}