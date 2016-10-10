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
                    Message.createAlertSuccess('Login successful');
                    $state.go('home');
                })
                .error(function(err) {
                    Message.createAlertError('Login fail!');
                	GetLoggedIn.isLogged = true;
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
	
}])
.controller('listUserController', ['$scope', '$rootScope', 'User', 'Message', function($scope, $rootScope, User, Message){
	// LIST ALL USERS
	var listAll = function(){
	    User.list().success(function(users){
	        $scope.users = users;
	    });
    };

    listAll();

    // DELETE USER
    $scope.deleteUser = function(id){
        if(id !== $rootScope.currentUser.id){
            User.delete(id).success(function(){
                Message.createAlertSuccess('Delete fail!');
                listAll();
            });
        }else{
            Message.createAlertError('Delete fail!');
        }
    };

}]);






