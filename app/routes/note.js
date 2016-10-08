var models  = require('../models');

var models = require('../models/index');

module.exports 	= function(app){

	// list notes
	app.get('/api/note/list', function(req, res){
		models.note.findAll({}).then(function(notes) {
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
	    content: req.body.user_id,
	    version: 1
	  }).then(function(note) {
	    res.json(note);
	  });
	});

	// update single note
	app.put('/api/note/update/:id', function(req, res) {
	  models.note.find({
	    where: {
	      id: req.params.id
	    }
	  }).then(function(note) {
	    if(note){
	      note.updateAttributes({
	        title: req.body.title,
	        content: req.body.content,
	        version: (note.version + 1)
	      }).then(function(note) {
	        res.send(note);
	      });
	    }
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