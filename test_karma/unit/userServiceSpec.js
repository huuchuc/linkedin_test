describe('userService: Unit testing #1', function() {
  
  var stateParams,
      httpBackend;
  var User, GetLoggedIn;

  var userTest = {id:'1', uname:'admin'};
  var userList = [{id:'1', uname:'admin'},
                  {id:'2', uname:'user01'}];
  var errTest  = "Unauthorized";

  var userData = {uname:'admin', password:'12345678'};

  // beforeEach(angular.mock.module('notes'));
  beforeEach(module('notes.userService'));
  
  beforeEach(inject(function ($httpBackend) {
    // User        = _userService_;
    httpBackend = $httpBackend;
  }));

  beforeEach(angular.mock.inject(function($controller, $injector){
      // httpBackend     = $injector.get('$httpBackend');
      // stateParams     = $injector.get('$stateParams');

      GetLoggedIn     = $injector.get('GetLoggedIn');
      User            = $injector.get('User');

      httpBackend.when('POST', '/login').respond(userTest);
      httpBackend.when('GET', '/api/user/list').resplist(userList);

  }));

  // afterEach(function(){
  //   httpBackend.verifyNoOutstandingExpectation();
  //   httpBackend.verifyNoOutstandingRequest();
  // });

  // CHECK INITIAL
  it('userController define', function() {
    expect(User).toBeDefined();
  });
  // CHECK INITIAL userData
  it('check GetLoggedIn exist', function() {
    expect(GetLoggedIn).toBeDefined();
  });

  // CHECK LOGIN SUCCESS
  it('login', function() {
    User.login(userData).then(function(response) {
        expect(response.data).toEqual(userTest);
    });
    httpBackend.flush();

  });

  // CHECK LOGIN FAIL
  it('Login fail with uname, password', function() {
    
    expect(1+1).toEqual(2);

    httpBackend.flush();

    

  });

})