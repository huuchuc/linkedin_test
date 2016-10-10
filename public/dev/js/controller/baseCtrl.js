angular.module('baseCtrl', [])
.controller('baseController',['$scope', '$rootScope', '$window','$cookieStore', '$state', 'User', 'Message', '$http','GetLoggedIn',
	function($scope, $rootScope, $window, $cookieStore, $state, User, Message, $http, GetLoggedIn){

	// Get login infor from node server
    $http.get('/loggedin').success(function(data) {
    	if (data !== '0') {
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

	// logout
    $scope.logout = function(){
        User.logout()
            .success(function() {
                $rootScope.currentUser = null;
                $cookieStore.remove('currentUser');
                delete $window.sessionStorage.token;
                Message.createAlertSuccess('Logout successful');
                $state.go('home');
            });
    };

    

}]);