describe('userService: Unit testing #4', function() {

	var User;
	var httpBackend, rootScope;
	// var authRequestHandler;

	beforeEach(module('userService'));

	beforeEach(inject(function($injector) {
	     // Set up the mock http service responses
	     httpBackend = $injector.get('$httpBackend');
	     User 		 = $injector.get('User');
	     rootScope   = $injector.get('$rootScope');
 	}));


	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('User defined', function() {
		expect(User).toBeDefined();
	});

	// TEST LOGIN FUNCTION
	describe('login ', function() {

		var userTest = {id:'1', uname: 'admin'};

		it('should have a User.login() function', function() {
		    expect(angular.isFunction(User.login)).toBe(true);
		});

		it('success: authorized', function() {
			var returnVal;
			httpBackend.when('POST','/login', userTest).respond(userTest);
			User.login(userTest).success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual(userTest);
		});

		it('fail: unauthorize', function() {
			var returnVal;
			httpBackend.when('POST','/login', userTest).respond(401);
			User.login(userTest).then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();

			expect(returnVal.status).toEqual(401);
		});

		it('error 500', function() {
			var returnVal;
			httpBackend.when('POST','/login', userTest).respond(500);
			User.login(userTest).then(function(data){
				returnVal = data;
			}, function(reason) {
		      returnVal = reason;
		    });
			httpBackend.flush();

			expect(returnVal.status).toEqual(500);
		});
	});

	// TEST SIGNUP FUNCTION
	describe('signup', function() {

		var userTest = {id:'1', uname: 'admin'};

		it('should have a User.signup() function', function() {
		    expect(angular.isFunction(User.login)).toBe(true);
		});

		it('success', function() {
			var returnVal;
			httpBackend.when('POST','/signup', userTest).respond(userTest);
			User.signup(userTest).success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual(userTest);
		});

		it('user name existed', function() {
			var returnVal;
			httpBackend.when('POST','/signup', userTest).respond(401);
			User.signup(userTest).then(function(data){
				returnVal = data;
			}, function(reason){
				returnVal = reason;
			});
			httpBackend.flush();

			expect(returnVal.status).toEqual(401);
		});

		it('error 500', function() {
			var returnVal;
			httpBackend.when('POST','/signup', userTest).respond(500);
			User.signup(userTest).then(function(data){
				returnVal = data;
			}, function(reason){
				returnVal = reason;
			});
			httpBackend.flush();

			expect(returnVal.status).toEqual(500);
		});
	});

	// TEST LOGOUT FUNCTION
	describe('logout', function() {

		var userTest = {id:'1', uname: 'admin'};

		it('should have a User.logout() function', function() {
		    expect(angular.isFunction(User.login)).toBe(true);
		});

		it('success', function() {
			var returnVal;
			httpBackend.when('GET','/logout').respond({id: '200'});
			User.logout().success(function(data){
				returnVal = data;
			});
			httpBackend.flush();

			expect(returnVal).toEqual({id: '200'});
		});
	});

})



