var usrService = angular.module('userService', []);

usrService.factory('User', ['$http', '$stateParams', function($http, $stateParams) {
    return {
        get: function() {
            return $http.get('/api/user');
        },
        login: function(userData) {
            return $http.post('/login', userData);
        },
        signup: function(userData) {
            return $http.post('/signup', userData);
        },
        logout: function() {
            return $http.get('/logout');
        },
        countUser: function() {
            return $http.get('api/countUser');
        },
        getUserDetail: function() {
            return $http.get('api/user/profile/' + $stateParams.id);
        },
        delete: function(id) {
            return $http.delete('/api/user/delete/' + id);
        },
        countQuestion: function() {
            return $http.get('api/user/count/question/' + $stateParams.id);
        },
        countAnswer: function() {
            return $http.get('api/user/count/answer/' + $stateParams.id);
        },
        activeAccount: function() {
            return $http.get('api/user/active/' + $stateParams.user_id + '/' + $stateParams.token);
        },
        getUserbyEmail: function(userData) {
            return $http.post('api/user/getUserbyEmail', userData);
        },
        edit: function(userData) {
            return $http.post('/api/user/edit', userData);
        },
        changePassword: function(userData) {
            return $http.post('/api/user/changePassword', userData);
        },
        resetPassword: function(userData) {
            return $http.post('/api/user/resetPassword', userData);
        },
        forgot: function(userData) {
            return $http.post('/forgot', userData);
        },
        updatePermission: function(userData) {
            return $http.post('/api/user/updatePermission', userData);
        }

    };
}]);