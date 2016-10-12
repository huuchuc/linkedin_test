angular.module('userService', [])
.factory('User', ['$http', function($http) {
    return {
        login: function(userData) {
            return $http.post('/login', userData);
        },
        signup: function(userData) {
            return $http.post('/signup', userData);
        },
        logout: function() {
            return $http.get('/logout');
        }
    };
}])
// Authentication service
.factory('GetLoggedIn', function() {
    var auth = {
        isLogged: false
    };
    return auth;
})
// Update authentication value
.factory('TokenInterceptor', ['$q', '$window', '$location', 'GetLoggedIn',
 function($q, $window, $location, GetLoggedIn) {
    return {
        // On request success
        // create token
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        // On request failure
        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        // On response success 
        //Set GetLoggedIn.isLogged to true if 200 received */
        response: function(response) {
            if (response !== null && response.status == 200 && $window.sessionStorage.token && !GetLoggedIn.isLogged) {
                GetLoggedIn.isLogged = true;
            }
            return response || $q.when(response);
        },

        // On response failure
        // Revoke client if 401 is received
        responseError: function(rejection) {
            if (rejection !== null && rejection.status === 401 && ($window.sessionStorage.token || GetLoggedIn.isLogged)) {
                delete $window.sessionStorage.token;
                GetLoggedIn.isLogged = false;
                // $location.path("/login");
            }

            return $q.reject(rejection);
        }
    };
}]);