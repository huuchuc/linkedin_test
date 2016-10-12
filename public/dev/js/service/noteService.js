angular.module('noteService', [])
.factory('Note', ['$http', function($http) {
    return {
        list: function(user_id) {
            return $http.get('/api/note/list/'+user_id);
        },
        detail: function(id){
            return $http.get('/api/note/detail/'+id);
        },
        add: function(note){
            return $http.post('/api/note/add', note);
        },
        put: function(note){
            return $http.put('/api/note/update', note);
        },
        delete: function(id) {
            return $http.delete('/api/note/delete/'+id);
        }
    };
}]);