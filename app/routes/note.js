var models = require('../models/index');

module.exports 	= function(app){

	// LIST ALL NOTES BY USER
	app.get('/api/note/list/:user_id', function(req, res){
		models.note.findAll({
			where: {
				user_id: req.params.user_id
				}
			}).then(function(notes) {
		    res.json(notes);
		});
	});

	// GET SINGLE NOTE
	app.get('/api/note/detail/:id',  function(req, res) {
	  models.note.find({
	    where: {
	      id: req.params.id
	    }
	  }).then(function(note) {
	    res.json(note);
	  });
	});

	// ADD NEW NOTE
	app.post('/api/note/add', function(req, res) {
	  models.note.create({
	    title: req.body.title,
	    content: req.body.content,
	    version: 1,
	    user_id: req.body.user_id
	  }).then(function(note) {
	    res.json(note);
	  });
	});

	// UPDATE SINGLE NOTE
	app.put('/api/note/update', function(req, res) {
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
	    }
	  }).error(function(err){
	  	res.send(err);
	  });
	});

	// DELETE USER
	app.delete('/api/note/delete/:id', function(req, res) {
	  models.note.destroy({
	    where: {
	      id: req.params.id
	    }
	  }).then(function(note) {
	    res.json(note);
	  });
	});

}