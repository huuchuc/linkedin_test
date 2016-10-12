angular.module('msgService', [])
.factory('Message', ['Flash', function(Flash) {
	return {
	 	// SUCCESS MESSAGE
	    createAlertSuccess : function (message) {
	        Flash.clear();
	        var fullmessage = '<strong> Well done!</strong> '+message;
	        return Flash.create('success', fullmessage, 5000);
	    },
	    // ERROR MESSAGE
	    createAlertError : function (message) {
	        Flash.clear();
	        var fullmessage = '<strong>Not good !</strong> '+message;
	        return Flash.create('warning', fullmessage, 5000);
	    }

	};

}]);
