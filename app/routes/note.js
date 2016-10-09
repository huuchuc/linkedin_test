var models = require('../models/index');

module.exports 	= function(app){

	// list notes by user
	app.get('/api/note/list/:user_id', function(req, res){
		models.note.findAll({
			where: {
				user_id: req.params.user_id
				}
			}).then(function(notes) {
			console.log('/note/list: ');
			console.log(notes);
		    res.json(notes);
		});
	});

	// get single note
	app.get('/api/note/detail/:id', function(req, res) {
	  models.note.find({
	    where: {
	      id: req.params.id
	    }
	  }).then(function(note) {
	    res.json(note);
	  });
	});

	// add new note
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

	// update single note
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

		    console.log(version);

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

	// delete a single note
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