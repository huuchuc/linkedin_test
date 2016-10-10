angular.module('appDirectives', [])

// COMPARE PASSWORD 
.directive('passwordMatch', function() {
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