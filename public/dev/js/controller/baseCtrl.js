angular.module('baseCtrl', [])
.controller('baseController',['$scope', '$rootScope', '$window','$cookieStore', '$state', 'User', 'Message', '$http','GetLoggedIn',
	function($scope, $rootScope, $window, $cookieStore, $state, User, Message, $http, GetLoggedIn){

	// Every link user clicked, system will get login infor from node server 
    $scope.reFresh = function(){
        $http.get('/loggedin').success(function(data) {
        	if (data.id !== '0') {
    	        $cookieStore.put('currentUser', data);
    	        $rootScope.currentUser = $cookieStore.get('currentUser');
    	        GetLoggedIn.isLogged = true;
    	        $window.sessionStorage.token = data.token;
    	    } else {
    	        $rootScope.currentUser = null;
                GetLoggedIn.isLogged = false;
    	    }
        }).error(function(err){
    	    $scope.createAlertError(err);
        });
    };
    $scope.reFresh();

	// logout
    $scope.logout = function(){
        User.logout()
            .success(function(data) {
                $rootScope.currentUser = null;
                GetLoggedIn.isLogged = false;
                $cookieStore.remove('currentUser');
                delete $window.sessionStorage.token;
                Message.createAlertSuccess('Logout successful');
                $state.go('home');
            }).error(function(err){
                Message.createAlertSuccess('Logout fail! Unexpected error');
            });
    };

    

}]);