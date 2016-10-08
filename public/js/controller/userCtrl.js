var userCtrl = angular.module('userCtrl', []);

userCtrl.controller('userController', ['$scope', '$rootScope', '$window','$cookieStore', '$state', 'User','GetLoggedIn',
	function($scope, $rootScope, $window, $cookieStore, $state, User, GetLoggedIn){

	// Reset Form data
    $scope.userData = {};

    var resetMsg = function(){
    	// reset message
        $scope.error = '';
        $scope.success = '';
    }

    // Login function
    $scope.login = function() {
        // Check null
        if (!$.isEmptyObject($scope.userData)) {
            User.login($scope.userData)
                .success(function(data) {
                    $cookieStore.put('currentUser', data);
                    $rootScope.currentUser = $cookieStore.get('currentUser');
                    $window.sessionStorage.token = data.token;
                    GetLoggedIn.isLogged = true;
                    $state.go('home');
                })
                .error(function() {
                	GetLoggedIn.isLogged = true;
                    $state.go('login');
                });
        }
    };

	// function register
    $scope.register = function() {
    	//reset message
    	resetMsg();

        console.log($scope.userData);

        // Check null
        if (!$.isEmptyObject($scope.userData)) {
            User.signup($scope.userData)
                .success(function(data) {
                    $scope.success = 'Register successful';
                    $state.go('home');
                })
                .error(function() {
                    $scope.error = 'Register failed!';
                    $state.go('register');
                });
        }
    };


	
}]);