angular.module('userCtrl', [])
.controller('userController', ['$scope', '$rootScope', '$window','$cookieStore', '$state', 'Message', 'User','GetLoggedIn',
	function($scope, $rootScope, $window, $cookieStore, $state, Message, User, GetLoggedIn){

	// RESET FORM DATA
    $scope.userData = {};

    // LOGIN 
    $scope.login = function() {
        // Check null
        if (!$.isEmptyObject($scope.userData)) {
            User.login($scope.userData)
                .success(function(data) {
                    $cookieStore.put('currentUser', data);
                    $rootScope.currentUser = $cookieStore.get('currentUser');
                    $window.sessionStorage.token = data.token;
                    GetLoggedIn.isLogged = true;
                    
                    // Message
                    Message.createAlertSuccess('Login successful');
                    
                    // get back to old page or go home
                    nextState();
                })
                .error(function(err) {
                    Message.createAlertError('Login fail!');
                	GetLoggedIn.isLogged = false;
                    $state.go('login');
                });
        }else{
            Message.createAlertError('User name & password must be filled!');
        }
    };

	// REGISTER
    $scope.register = function() {
        // Check null
        if (!$.isEmptyObject($scope.userData)) {
            User.signup($scope.userData)
                .success(function(data) {
                    Message.createAlertSuccess('Signup successful');
                    $state.go('home');
                })
                .error(function(err) {                    
                    Message.createAlertError('Signup fail!');
                    $state.go('register');
                });
        }
    };

    var nextState = function(){
        $state.go('home');
    };
}]);