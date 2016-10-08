var usrServ = angular.module('userService', []);

usrServ.factory('User', ['$http', '$stateParams', function($http, $stateParams) {
    return {
        login: function(userData) {
            return $http.post('/login', userData);
        },
        signup: function(userData) {
            return $http.post('/signup', userData);
        },
        logout: function() {
            return $http.get('/logout');
        },
        get: function() {
            return $http.get('/api/user/list');
        },
        getUserDetail: function() {
            return $http.get('api/user/detail/' + $stateParams.id);
        },
        delete: function(id) {
            return $http.delete('/api/user/delete/' + id);
        }
    };
}]);

usrServ.factory('GetLoggedIn', function() {
    var auth = {
        isLogged: false
    };
    return auth;
});

usrServ.factory('TokenInterceptor', ['$q', '$window', '$location', 'GetLoggedIn',
 function($q, $window, $location, GetLoggedIn) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function(response) {
            if (response !== null && response.status == 200 && $window.sessionStorage.token && !GetLoggedIn.isLogged) {
                GetLoggedIn.isLogged = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection !== null && rejection.status === 401 && ($window.sessionStorage.token || GetLoggedIn.isLogged)) {
                delete $window.sessionStorage.token;
                GetLoggedIn.isLogged = false;
                $location.path("/login");
            }

            return $q.reject(rejection);
        }
    };
}]);