angular.module('noteCtrl', [])
.controller('listNoteController', ['$scope', '$rootScope', '$state', 'Note', 'Message',
	function($scope, $rootScope, $state, Note, Message){

    $scope.notes = {};

    // LIST ALL NOTES
    $scope.listAllNote = function(){
        if($rootScope.currentUser){
            Note.list($rootScope.currentUser.id).success(function(notes){
                $scope.notes = notes;
            }).error(function(err){
                Message.createAlertError(err);
            });
        }else{
            $state.go('login');
        }
    };
    // List all note by user
    $scope.listAllNote();

    // DELETE NOTE
    $scope.deleteNote = function(id){
        Note.delete(id).success(function(data){
            Message.createAlertSuccess('Note was deleted successful');
            $scope.listAllNote();
        }).error(function(err){
            Message.createAlertError(err);
        });
    };

}])
.controller('createNoteController',['$scope', '$rootScope', '$state', 'Message', 'Note' , 
    function($scope, $rootScope, $state, Message, Note){
    // RESET FORM
    $scope.note = {};

    // ADD NEW NOTE
    $scope.addNote = function(){
        $scope.note.user_id = $rootScope.currentUser.id;

        Note.add($scope.note).success(function(note){
            $scope.note = note;
            Message.createAlertSuccess('Note was added successful');
            $state.go('detail-note', {id: note.id});
        }).error(function(err){
            Message.createAlertError(err);
        });
    };
}])
.controller('detailNoteController',['$scope', '$rootScope', '$stateParams', 'Note', 'Message' , 
    function($scope, $rootScope, $stateParams, Note, Message){
    // VIEW NOTE
    var note_id = $stateParams.id;
    $scope.detailNote = function(id){
        Note.detail(id).success(function(note){
            $scope.note = note;
        }).error(function(err){
            Message.createAlertError(err);
        });
    };
    $scope.detailNote(note_id);

    // UPDATE NOTE
    $scope.updateNote = function(){
        Note.put($scope.note).success(function(note){
            Message.createAlertSuccess('Note was updated successful');
            $scope.note = note;
        }).error(function(err){
            Message.createAlertError(err);
        });
    };
}]);

