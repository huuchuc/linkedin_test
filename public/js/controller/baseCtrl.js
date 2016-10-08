var baseCtrl = angular.module('baseCtrl', []);

baseCtrl.controller('baseController',['$scope', '$rootScope', '$window','$cookieStore', '$state', 'User', '$http','GetLoggedIn',
	function($scope, $rootScope, $window, $cookieStore, $state, User, $http, GetLoggedIn){

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
    });

	// logout
    $scope.logout = function(){
        User.logout()
            .success(function() {
                $rootScope.currentUser = null;
                $cookieStore.remove('currentUser');
                delete $window.sessionStorage.token;
                $state.go('home');
            });
    };

}]);