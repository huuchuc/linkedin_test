describe('baseCtrl: Unit testing #6', function() {

	var scope, rootScope, xwindow, state, Message, GetLoggedIn;
	var User, httpBackend, cookieStore;

	// user test for all function
	var userTest  = {id:'1', uname:'admin'};

	// include dependencies
	beforeEach(module('baseCtrl', 'userService', 'ngCookies'));

    // Mock User service & http backend
	beforeEach(inject(function($injector) {
	     // Set up the mock http service responses
	     httpBackend = $injector.get('$httpBackend');
	     User 		 = $injector.get('User');
 	}));

	// Mock dependencies
	beforeEach(inject(function($rootScope, $cookieStore, $window) {

		rootScope 	= $rootScope.$new();
	    scope 		= rootScope.$new();
	    cookieStore = $cookieStore;
	    xwindow 	= $window;

	    GetLoggedIn = { isLogged: false};

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
		expect(User).toBeDefined();
		expect(Message).toBeDefined();
		expect(state).toBeDefined();
		expect(rootScope).toBeDefined();
		expect(scope).toBeDefined();
		expect(httpBackend).toBeDefined();
		expect(cookieStore).toBeDefined();
	});

	// Test listNoteController
	describe('baseController ', function() {

		var baseController;

		// Mock listNoteController
		beforeEach(inject(function($injector) {

	     	 // The $controller service is used to create instances of controllers
		     var $controller = $injector.get('$controller');

		     baseController = function() {
		     	return $controller('baseController', {
		     		$scope: scope, 
		     		$rootScope: rootScope,
		     		Message: Message,
		     		$state: state,
		     		$window: xwindow,
		     		$cookieStore: cookieStore,
		     		User: User,
		     		GetLoggedIn: GetLoggedIn
		     	});
		     };

	 	}));

		// reFresh function: Get login infor from node server
		describe('reFresh()', function() {

			// User for testing
			var userTest = {id:'1', uname: 'admin', password:'12345678'};
			var tokenTest = 'xxx';

			it('get login success: authorize', function() {

				// mock http response
				httpBackend.when('GET','/loggedin').respond(userTest);

				// init controller
				baseController();

				// run function
				scope.reFresh();

				httpBackend.flush();

				//compare
				expect(rootScope.currentUser).toEqual(userTest);
				expect(GetLoggedIn.isLogged).toBe(true);
			});

			it('get login fail: unauthorize', function() {

				// mock http response
				httpBackend.when('GET','/loggedin').respond({id: '0'});

				// init controller
				baseController();

				// run function
				scope.reFresh();

				httpBackend.flush();

				// compare
				expect(rootScope.currentUser).toBeNull();
				expect(GetLoggedIn.isLogged).toBe(false);
			});
		});

		// logout function
		describe('logout()', function() {

			// User for testing
			var userTest = {id:'1', uname: 'admin', password:'12345678'};
			var tokenTest = 'xxx';

			it('logout success', function() {

				// mock /loggedin http response
				httpBackend.when('GET','/loggedin').respond(userTest);

				// mock /logout http response
				httpBackend.when('GET','/logout').respond({id: '200'});

				// init controller
				baseController();

				// run function
				scope.logout();

				httpBackend.flush();

				//all user infor had been cleared
				expect(rootScope.currentUser).toBeNull();
				expect(cookieStore.get('currentUser')).toBeUndefined();
				expect(GetLoggedIn.isLogged).toBe(false);
				expect(rootScope.flashes).toEqual('success');
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


