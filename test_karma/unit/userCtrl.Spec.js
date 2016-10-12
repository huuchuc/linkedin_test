describe('userCtrl: Unit testing #4', function() {

	var scope, rootScope, xwindow, cookieStore, state, Message, GetLoggedIn;
	var userController;
	var User, httpBackend;

	beforeEach(module('userCtrl', 'userService', 'ngCookies'));

    // Mock User service & http backend
	beforeEach(inject(function($injector) {
	     // Set up the mock http service responses
	     httpBackend = $injector.get('$httpBackend');
	     User 		 = $injector.get('User');
 	}));

	// Mock dependencies
	beforeEach(inject(function($rootScope, $window, $cookieStore) {

		rootScope 	= $rootScope.$new();
	    scope 		= rootScope.$new();
	    xwindow 	= $window;
	    cookieStore = $cookieStore;

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
		expect(GetLoggedIn).toBeDefined();
		expect(xwindow).toBeDefined();
		expect(cookieStore).toBeDefined();
		expect(state).toBeDefined();
	});

	// Test userController
	describe('userController ', function() {

		// Mock userController
		beforeEach(inject(function($injector) {

	     	 // The $controller service is used to create instances of controllers
		     var $controller = $injector.get('$controller');

		     userController = function() {
		     	return $controller('userController', {
		     		$scope: scope, 
		     		$rootScope: rootScope ,
		     		$cookieStore: cookieStore, 
		     		User: User, 
		     		Message: Message, 
		     		GetLoggedIn: GetLoggedIn, 
		     		$state: state,
		     		$window: xwindow });
		     };

	 	}));

		// TEST LOGIN FUNCTION
		describe('login()', function() {
			// User for testing
			var userTest = {id:'1', uname: 'admin', password:'12345678'};
			var tokenTest = 'xxx';

			it('should has $scope.login() function', function() {
				userController();
			    expect(angular.isFunction(scope.login)).toBe(true);
			});

			it('login success', function() {
				
				// init controller
				userController();

				// mock data input
				scope.userData.uname = userTest.uname;
				scope.userData.password = userTest.password;

				// mock http response
				httpBackend.when('POST','/login', scope.userData).respond(userTest);

				// run function
				scope.login();

				httpBackend.flush();

				//compare
				expect(rootScope.currentUser).toEqual(userTest);
				expect(GetLoggedIn.isLogged).toBe(true);
			});

			it('login with fail: wrong uname || password', function() {

				// init controller
				userController();

				// mock data input
				scope.userData.uname = userTest.uname;
				scope.userData.password = userTest.password;

				// mock http response
				httpBackend.when('POST','/login', scope.userData).respond(401);

				// run function
				scope.login();

				httpBackend.flush();

				// compare
				expect(rootScope.currentUser).toBeUndefined();
				expect(GetLoggedIn.isLogged).toBe(false);
			});

		});


		// TEST SIGNUP FUNCTION
		describe('signup()', function() {
			// User for testing
			var userTest = {id:'1', uname: 'admin', password:'12345678'};
			var tokenTest = 'xxx';

			it('should has $scope.register() function', function() {
				userController();
			    expect(angular.isFunction(scope.register)).toBe(true);
			});

			it('signup success', function() {
				
				// init controller
				userController();

				// mock data input
				scope.userData.uname = userTest.uname;
				scope.userData.password = userTest.password;

				// mock http response
				httpBackend.when('POST','/signup', scope.userData).respond(userTest);

				// run function
				scope.register();

				httpBackend.flush();

				// compare
				expect(rootScope.flashes).toEqual('success');
			});

			it('existed uname || wrong uname, password', function() {

				// init controller
				userController();

				// mock data input
				scope.userData.uname = userTest.uname;
				scope.userData.password = userTest.password;

				// mock http response
				httpBackend.when('POST','/signup', scope.userData).respond(401);

				// run function
				scope.register();

				httpBackend.flush();

				// compare
				expect(rootScope.flashes).toBe('error');
			});
		});
	});

	// Reset variable
	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
		GetLoggedIn.isLogged = false;
		cookieStore.remove('currentUser');
		Message.clear();
	});

})


