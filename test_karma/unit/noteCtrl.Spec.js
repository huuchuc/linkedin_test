describe('userCtrl: Unit testing #5', function() {

	var scope, rootScope, state, Message;
	var Note, httpBackend;

	// user test for all function
	var userTest  = {id:'1', uname:'admin'};

	// include dependencies
	beforeEach(module('noteCtrl', 'noteService'));

    // Mock User service & http backend
	beforeEach(inject(function($injector) {
	     // Set up the mock http service responses
	     httpBackend = $injector.get('$httpBackend');
	     Note 		 = $injector.get('Note');
 	}));

	// Mock dependencies
	beforeEach(inject(function($rootScope) {

		rootScope 	= $rootScope.$new();
	    scope 		= rootScope.$new();

	    Message = {
	    	createAlertSuccess : function(msg){
	    		rootScope.flashes = 'success';
	    		return 1;
	    	},
	    	createAlertError : function(msg){
	    		rootScope.flashes='error';
	    		return 1;
	    	},
	    	clear: function(){
	    		rootScope.flashes = '';
	    	}
	    };

	    state = jasmine.createSpyObj('$state', ['go']);

	}));

	// All dependencies are defined
	it('Dependencies defined', function() {
		expect(Note).toBeDefined();
		expect(Message).toBeDefined();
		expect(state).toBeDefined();
		expect(rootScope).toBeDefined();
		expect(scope).toBeDefined();
		expect(httpBackend).toBeDefined();
	});

	// Test listNoteController
	describe('listNoteController ', function() {

		var listNoteController;

		// Mock listNoteController
		beforeEach(inject(function($injector) {

	     	 // The $controller service is used to create instances of controllers
		     var $controller = $injector.get('$controller');

		     listNoteController = function() {
		     	return $controller('listNoteController', {
		     		$scope: scope, 
		     		$rootScope: rootScope,
		     		Message: Message, 
		     		Note: Note, 
		     		$state: state
		     	});
		     };

	 	}));

		// listAllNote function
		describe('listAllNote()', function() {

			// list notes for testing
			var listNotes = [
				{id:'1', title: 'note1', content: '123213', user_id: '1'},
				{id:'2', title: 'note2', content: '434434', user_id: '1'}
			];

			it('list all notes', function() {
				
				//user infor
				rootScope.currentUser = userTest;

				// mock http response
				httpBackend.when('GET','/api/note/list/'+rootScope.currentUser.id)
				.respond(listNotes);

				// init controller
				listNoteController();

				scope.listAllNote();

			    httpBackend.flush();

				// compare
			    expect(scope.notes).toEqual(listNotes);
			});

			it('return null list', function() {
				
				//user infor
				rootScope.currentUser = userTest;

				// mock http response
				httpBackend.when('GET','/api/note/list/'+rootScope.currentUser.id)
				.respond(200);

				// init controller
				listNoteController();

				scope.listAllNote();

			    httpBackend.flush();

				// compare
			    expect(scope.notes).toBeUndefined();
			});

		});

		// deleteNote function
		describe('deleteNote()', function() {

			// list notes for testing
			var listNotes = [
				{id:'1', title: 'note1', content: '123213', user_id: '1'},
				{id:'2', title: 'note2', content: '434434', user_id: '1'}
			];

			var resData = {id: 1};

			it('delete one note', function() {
				
				//user infor
				rootScope.currentUser = userTest;

				// mock http list
				httpBackend.when('GET','/api/note/list/'+rootScope.currentUser.id)
				.respond(listNotes);

				// mock http delete
				httpBackend.when('DELETE','/api/note/delete/'+listNotes[0].id)
				.respond(resData);

				// init controller
				listNoteController();

				scope.deleteNote(listNotes[0].id);

				httpBackend.flush();

				// compare
			    expect(rootScope.flashes).toEqual('success');
			});

			it('delete null note', function() {
				
				//user infor
				rootScope.currentUser = userTest;

				// mock http list
				httpBackend.when('GET','/api/note/list/'+rootScope.currentUser.id)
				.respond(0);

				// mock http delete
				httpBackend.when('DELETE','/api/note/delete/'+listNotes[0].id)
				.respond(resData);

				// init controller
				listNoteController();

				scope.deleteNote(listNotes[0].id);

				httpBackend.flush();

				// compare
			    expect(rootScope.flashes).toEqual('error');
			});
		});

	});

	


	// Test createNoteController
	describe('createNoteController ', function() {

		var createNoteController;

		// Mock createNoteController
		beforeEach(inject(function($injector) {

	     	 // The $controller service is used to create instances of controllers
		     var $controller = $injector.get('$controller');

		     createNoteController = function() {
		     	return $controller('createNoteController', {
		     		$scope: scope, 
		     		$rootScope: rootScope,
		     		Message: Message, 
		     		Note: Note, 
		     		$state: state
		     	});
		     };

	 	}));

		// addNote function
		describe('addNote()', function() {
		 	// list notes for testing
			var inputNote = {title: 'note1', content: '123213', user_id: '1'};
			var res  = {id: '1', title: 'note1', content: '123213', user_id: '1'};

			it('successful', function() {
				
				//user infor
				rootScope.currentUser = userTest;

				// init controller
				createNoteController();

				// input note
				scope.note = inputNote;

				// mock http response
				httpBackend.when('POST','/api/note/add', scope.note)
				.respond(res);

				scope.addNote();

			    httpBackend.flush();

				// compare
			    expect(scope.note).toEqual(res);
			    expect(rootScope.flashes).toEqual('success');
			});

			it('fail', function() {
				
				//user infor
				rootScope.currentUser = userTest;

				// init controller
				createNoteController();

				// make error input
				inputNote.title ='';

				// input note
				scope.note = inputNote;

				// mock http response
				httpBackend.when('POST','/api/note/add', scope.note)
				.respond(0);

				scope.addNote();

			    httpBackend.flush();

				// compare
			    expect(scope.note).toEqual(inputNote);
			    expect(rootScope.flashes).toEqual('error');
			});

		});

	});

	// Test detailNoteController
	describe('detailNoteController ', function() {

		var createNoteController;
		var stateParams;

		// Mock detailNoteController
		beforeEach(inject(function($injector) {

			stateParams = {id: '1'};

	     	 // The $controller service is used to create instances of controllers
		     var $controller = $injector.get('$controller');

		     detailNoteController = function() {
		     	return $controller('detailNoteController', {
		     		$scope: scope, 
		     		$rootScope: rootScope,
		     		Message: Message, 
		     		Note: Note, 
		     		$state: state,
		     		$stateParams: stateParams
		     	});
		     };

	 	}));

		// detailNote function
		describe('detailNote()', function() {
		 	// list notes for testing
			var note = {id: '1', title: 'note1', content: '123213', user_id: '1'};
			var res  = {id: '1', title: 'note1', content: '123213 edited', user_id: '1'};

			it('successful', function() {
				
				//param id
				var note_id = note.id;

				// init controller
				detailNoteController();

				// mock http response
				httpBackend.when('GET','/api/note/detail/'+note_id)
				.respond(res);

				scope.detailNote(note_id);

			    httpBackend.flush();

				// compare
			    expect(scope.note).toEqual(res);
			});

			it('fail', function() {
				
				//param id
				var note_id = note.id;

				// init controller
				detailNoteController();

				// mock http response
				httpBackend.when('GET','/api/note/detail/'+note_id)
				.respond(404);

				scope.detailNote(note_id);

			    httpBackend.flush();

				// compare
			    expect(scope.note).toBeUndefined();
			    expect(rootScope.flashes).toEqual('error');
			});

		});

		// updateNote function
		describe('updateNote()', function() {
		 	// list notes for testing
			var note = {id: '1', title: 'note1', content: '123213 fsd', user_id: '1'};
			var res  = {id: '1', title: 'note1', content: '123213 edited', user_id: '1'};

			it('successful', function() {
				
				//param id
				var note_id = note.id;

				// mock detail http response
				httpBackend.when('GET','/api/note/detail/'+note_id)
				.respond(note);

				// mock http response
				httpBackend.when('PUT','/api/note/update', note)
				.respond(res);

				// init controller
				detailNoteController();

				scope.updateNote();

			    httpBackend.flush();

				// compare
			    expect(scope.note).toEqual(res);
			});

			it('cannot found note to update', function() {
				
				//param id
				var note_id = note.id;

				// mock detail http response
				httpBackend.when('GET','/api/note/detail/'+note_id)
				.respond(note);

				// mock http response
				httpBackend.when('PUT','/api/note/update', note)
				.respond(0);

				// init controller
				detailNoteController();
				
				scope.updateNote();

			    httpBackend.flush();

				// scope.note doesnt change
			    expect(scope.note).toEqual(note);
			    // get error message
			    expect(rootScope.flashes).toEqual('error');
			});

		});

	});

	// Reset variable
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
		Message.clear();
	});

})


