describe('appDirectives', function() {

  var scope, form;

  beforeEach(module('appDirectives'));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope.$new();
    var element = angular.element(
          '<form name="form">' +
            '<input ng-model="userData.password" name="password">' +
            '<input ng-model="userData.re_password" name="re_password" password-match="userData.password">' +
          '</form>'
    );

    scope.userData = { password: null, re_password: null }
    $compile(element)(scope);
    form = scope.form;
  }));

  describe('passwordMatch', function() {
    it('should pass if password == re_password', function() {
      form.password.$setViewValue('123456');
      form.re_password.$setViewValue('123456');

      scope.$digest();
      expect(form.re_password.$valid).toBe(true);
    });

    it('should not pass if password != re_password', function() {
      form.password.$setViewValue('123456');
      form.re_password.$setViewValue('12434343');

      scope.$digest();
      expect(form.re_password.$valid).toBe(false);
    });
  });
});