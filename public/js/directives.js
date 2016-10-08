var appDirect = angular.module('appDirectives', []);

/*So sánh mật khẩu trùng khớp*/
appDirect.directive('passwordMatch', function() {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function(scope, elem, attrs, control) {
            var checker = function() {
                // get password
                var e1 = scope.$eval(attrs.ngModel);

                // get re_password
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function(n) {
                // form control
                control.$setValidity('unique', n);
            });
        }
    };
})