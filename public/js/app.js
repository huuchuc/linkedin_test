var app = angular.module('notes', [
 'ui.router',
 'ngCookies',
 'ngSanitize',
 'ui.bootstrap',
 'ngMessages',
 'appDirectives',
 'appRoutes',
 'baseCtrl',
 'userCtrl',
 'userService',
 'noteCtrl',
 'noteService'
]);

// interceptor
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

// Check login and progress bar
app.run(['$log', '$rootScope', '$timeout', '$window', '$state', '$location', 'GetLoggedIn', 
    function($log, $rootScope, $timeout, $window, $state, $location, GetLoggedIn) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
            $rootScope.currentParam = toParams;
            $rootScope.oldState = fromState.name;
            $rootScope.oldParam = fromParams;

            // check login in every router
            // if (toState.access.requiredLogin && !GetLoggedIn.isLogged) {
            if (toState.access.requiredLogin && !$rootScope.currentUser) {
                $state.transitionTo('login');
                event.preventDefault();
            }
        });
	}]);