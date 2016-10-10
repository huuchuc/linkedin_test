angular.module('noteCtrl', [])
.controller('listNoteController', ['$scope', '$rootScope', '$window','$cookieStore', '$state', 'Note', 'Message',
	function($scope, $rootScope, $window, $cookieStore, $state, Note, Message){

    $scope.notes = {};

    var resetMsg = function(){
        // reset message
        $scope.error = '';
        $scope.success = '';
    }   

    // LIST ALL NOTES
    var listAllNote = function(){
        if($rootScope.currentUser.id){
            Note.list($rootScope.currentUser.id).success(function(notes){
                $scope.notes = notes;
            }).error(function(err){
            Message.createAlertError(err);
        });;
        }else{
            $state.go('/login');
        }
    };
    // List all note by user
    listAllNote();

    // DELETE NOTE
    $scope.deleteNote = function(id){
        Note.delete(id).success(function(){
            Message.createAlertSuccess('Note was deleted successful');
            listAllNote();
        }).error(function(err){
            Message.createAlertError(err);
        });
    };

}])
.controller('createNoteController',['$scope', '$rootScope', '$state', '$stateParams', 'Message', 'Note' , 
    function($scope, $rootScope, $state, $stateParams, Message, Note){
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
    }
}])
.controller('detailNoteController',['$scope', '$rootScope', '$stateParams', 'Note', 'Message' , 
    function($scope, $rootScope, $stateParams, Note, Message){
    // VIEW NOTE
    var note_id = $stateParams.id;
    var detailNote = function(id){
        Note.detail(id).success(function(note){
            $scope.note = note;
        }).error(function(err){
            Message.createAlertError(err);
        });
    };
    detailNote(note_id);

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

