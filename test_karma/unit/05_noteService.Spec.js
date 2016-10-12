describe('noteService: Unit testing #5', function() {

	var Note;
	var httpBackend, rootScope;

	var userTest  = {id:'1', uname:'admin'};

	beforeEach(module('noteService'));

	beforeEach(inject(function($injector) {
	     // Set up the mock http service responses
	     httpBackend = $injector.get('$httpBackend');
	     Note 		 = $injector.get('Note');
	     rootScope   = $injector.get('$rootScope');
 	}));


	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('Note defined', function() {
		expect(Note).toBeDefined();
	});

	// TEST LIST ALL NOTE OF USER
	describe('list ', function() {

		var listNotes = [
				{id:'1', title: 'note1', content: '123213', user_id: '1'},
				{id:'2', title: 'note2', content: '434434', user_id: '1'}
			];

		it('should have a Note.list() function', function() {
		    expect(angular.isFunction(Note.list)).toBe(true);
		});

		it('success', function() {
			var returnVal;
			httpBackend.when('GET','/api/note/list/' + userTest.id).respond(listNotes);
			Note.list(userTest.id).success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual(listNotes);
		});

		it('return null list', function() {
			var returnVal;
			httpBackend.when('GET','/api/note/list/' + userTest.id).respond({});
			Note.list(userTest.id).then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();

			expect(returnVal.status).toEqual(200);
			expect(returnVal.data).toEqual({});
		});

		it('input user.id null', function() {
			var returnVal;
			httpBackend.when('GET','/api/note/list/'+'').respond(0);
			Note.list('').then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();
			expect(returnVal.status).toEqual(0);
			expect(returnVal.data).toBeUndefined();

		});
	});

	// TEST GET SINGLE NOTE
	describe('detail ', function() {

		var note = {id:'1', title: 'note1', content: '123213', user_id: '1'};

		it('should have a Note.detail() function', function() {
		    expect(angular.isFunction(Note.detail)).toBe(true);
		});

		it('note.id note null', function() {
			var returnVal;
			httpBackend.when('GET','/api/note/detail/' + note.id).respond(note);
			Note.detail(note.id).success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual(note);
		});

		it('note.id null', function() {
			var returnVal;
			httpBackend.when('GET','/api/note/detail/' + '').respond(0);
			Note.detail('').then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();

			expect(returnVal.status).toEqual(0);
			expect(returnVal.data).toBeUndefined();
		});
	});

	// TEST ADD SINGLE NOTE
	describe('add ', function() {

		var note = {title: 'note1', content: '123213', user_id: '1'};
		var nullnote = {title:'', content:'', user_id:''};
		it('should have a Note.add() function', function() {
		    expect(angular.isFunction(Note.add)).toBe(true);
		});

		it('add a not null note', function() {
			var returnVal;
			httpBackend.when('POST','/api/note/add', note).respond(note);
			Note.add(note).success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual(note);
		});

		it('add a null note', function() {
			var returnVal;
			httpBackend.when('POST','/api/note/add', nullnote).respond(0);
			Note.add(nullnote).then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();

			expect(returnVal.status).toEqual(0);
			expect(returnVal.data).toBeUndefined();
		});
	});

	// TEST EDIT SINGLE NOTE
	describe('put ', function() {

		var note = {title: 'note1', content: '123213', user_id: '1'};
		var nullnote = {title:'', content:'', user_id:''};

		it('should have a Note.put() function', function() {
		    expect(angular.isFunction(Note.put)).toBe(true);
		});

		it('update a not null note', function() {
			var returnVal;
			httpBackend.when('PUT','/api/note/update', note).respond(note);
			Note.put(note).success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual(note);
		});

		it('update a null note', function() {
			var returnVal;
			httpBackend.when('PUT','/api/note/update', nullnote).respond(0);
			Note.put(nullnote).then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();

			expect(returnVal.status).toEqual(0);
			expect(returnVal.data).toBeUndefined();
		});
	});

	// TEST DELETE A NOTE
	describe('delete ', function() {

		var note = {id: '1', title: 'note1', content: '123213', user_id: '1'};
		var nullnote = {id: '1', title:'', content:'', user_id:''};

		it('should have a Note.delete() function', function() {
		    expect(angular.isFunction(Note.delete)).toBe(true);
		});

		it('dalete a not null note', function() {
			var returnVal;
			httpBackend.when('DELETE','/api/note/delete/'+note.id).respond({id: 1});
			Note.delete(note.id).success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual({id:1});
		});

		it('delete a null note', function() {
			var returnVal;
			httpBackend.when('DELETE','/api/note/delete/'+ nullnote.id).respond(0);
			Note.delete(nullnote.id).then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();

			expect(returnVal.status).toEqual(0);
		});
	});
})



