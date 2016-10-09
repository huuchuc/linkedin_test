var noteCtrl = angular.module('noteCtrl', []);

noteCtrl.controller('listNoteController', ['$scope', '$rootScope', '$window','$cookieStore', '$state', 'Note',
	function($scope, $rootScope, $window, $cookieStore, $state, Note){

    $scope.notes = {};

    var resetMsg = function(){
        // reset message
        $scope.error = '';
        $scope.success = '';
    }   

    // LIST ALL NOTES
    var listAllNote = function(){
        resetMsg();
        Note.list($rootScope.currentUser.id).success(function(notes){
            $scope.notes = notes;
            console.log(notes);
            $scope.success = "Loaded successful";
        }).error(function(err){
            $scope.error = err;
        });
    };
    // List all note by user
    listAllNote();

    // DELETE NOTE
    $scope.deleteNote = function(id){
        resetMsg();

        Note.delete(id).success(function(){
            $scope.success = "Note was deleted successful";
            listAllNote();
        }).error(function(err){
            $scope.error = "You cannot delete this note!";
        });
    };

}]);

noteCtrl.controller('createNoteController',['$scope', '$rootScope', '$state', '$stateParams', 'Note' , function($scope, $rootScope, $state, $stateParams, Note){
    // RESET FORM
    $scope.note = {};

    // ADD NEW NOTE
    $scope.addNote = function(){
        $scope.note.user_id = $rootScope.currentUser.id;

        Note.add($scope.note).success(function(note){
            $scope.note = note;
            $scope.success = "Added successful";
            $state.go('detail-note', {id: note.id});
        }).error(function(err){
            $scope.error = err;
        }); 
    }
}]);

noteCtrl.controller('detailNoteController',['$scope', '$rootScope', '$stateParams', 'Note' , function($scope, $rootScope, $stateParams, Note){
    // VIEW NOTE
    var note_id = $stateParams.id;
    var detailNote = function(id){
        Note.detail(id).success(function(note){
            $scope.success = "Success";
            $scope.note = note;
        }).error(function(err){
            $scope.error = "Error!";
        });
    };
    detailNote(note_id);

    // UPDATE NOTE
    $scope.updateNote = function(){

        console.log($scope.note);

        Note.put($scope.note).success(function(note){
            $scope.success = "Success";
            $scope.note = note;
        }).error(function(err){
            $scope.error = "Error!";
        });
    };
}]);

