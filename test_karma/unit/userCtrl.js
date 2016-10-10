describe('userService: Unit testing #1', function() {
  
  var scope,
      xwindow, 
      cookieStore, 
      state,
      httpBackend;
  var userController;
  var User, GetLoggedIn;

  var userTest = {id:'1', uname:'admin'};
  var errTest  = "Unauthorized";

  beforeEach(angular.mock.module('notes'));
  beforeEach(angular.mock.module('notes.userService'));
  
  beforeEach(angular.mock.inject(function($controller, $rootScope, $injector){
      scope          = $rootScope.$new();
      scope.userData = {};
      httpBackend     = $injector.get('$httpBackend');
      cookieStore     = $injector.get('$cookieStore');
      xwindow         = $injector.get('$window');
      state           = $injector.get('$state');
      // $location       = $injector.get('$location');

      GetLoggedIn     = $injector.get('GetLoggedIn');
      User            = $injector.get('User');

      httpBackend.when('POST', '/login').respond(userTest);

      userController = $controller('userController', {
          $scope      : scope,
          $cookieStore: cookieStore,
          $window     : xwindow,
          $state      : state,
          User        : User,
          GetLoggedIn : GetLoggedIn
      });

  }));

  afterEach(function(){
    // httpBackend.verifyNoOutstandingExpectation();
    // httpBackend.verifyNoOutstandingRequest();
    $scope={};
    $rootScope={};
    $cookieStore={};

  });

  //DEMO
  it('Demo', function(){
    expect(1+1).toEqual(2);
  })

  // CHECK INITIAL
  it('userController define', function() {
    expect(userController).toBeDefined();
  });
  // CHECK INITIAL userData
  it('check userData exist', function() {
    expect(scope.userData).toBeDefined();
  });

  // CHECK LOGIN SUCCESS
  it('Login success with uname, password', function() {
    scope.userData.uname     = 'admin';
    scope.userData.password     = '12345678';

    scope.login();

    httpBackend.flush();

    expect(User.login()).toBe(userTest);

    expect(cookieStore.get('currentUser')).toBe(userTest);
    expect(GetLoggedIn.isLogged).toBeTruthy();
    expect(state.current.name).toBe('home');

  });

  // CHECK LOGIN FAIL
  it('Login fail with uname, password', function() {
    scope.userData.uname     = 'xyzass';
    // httpBackend.expectPOST('/login').respond(401);

    scope.login();

    httpBackend.flush();

    expect(cookieStore.get('currentUser')).toBeNull();
    expect(GetLoggedIn.isLogged).toBeFalsy();
    expect(state.current.name).toBe('login');

  });

})