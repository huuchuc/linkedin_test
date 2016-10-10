var app = angular.module('notes', [
 'ui.router',
 'ngCookies',
 'ngSanitize',
 'ui.bootstrap',
 'ngMessages',
 'ngFlash',
 'msgService',
 'appDirectives',
 'appRoutes',
 'baseCtrl',
 'userCtrl',
 'userService',
 'noteCtrl',
 'noteService'
]);

// interceptor
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

// config flash message
app.config(function(FlashProvider){
    FlashProvider.setTimeout(5000);
    FlashProvider.setShowClose(true);
});

// Check login and progress bar
app.run(['$log', '$rootScope', '$timeout', '$window', '$state', '$location', 'GetLoggedIn', 
    function($log, $rootScope, $timeout, $window, $state, $location, GetLoggedIn) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
            $rootScope.currentParam = toParams;
            $rootScope.oldState = fromState.name;
            $rootScope.oldParam = fromParams;

            // check login in every router
            if (toState.access.requiredLogin && !GetLoggedIn.isLogged) {
                $state.transitionTo('login');
                event.preventDefault();
            }
        });
	}]);
angular.module('appRoutes', [])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){
		// 404 page
		$urlRouterProvider.otherwise("/404");
		$urlRouterProvider.when('/_=_', '/');

		$stateProvider
		// HOMEPAGE
		.state( 'home', 
		{
			url: "/",
			templateUrl: "./views/home/home.html",
			controller: "baseController",
			access: {
				requiredLogin: false
			}
		})
		.state('404',
		{
			url: "/404",
			templateUrl : './views/home/404.html',
			title: '404 - Page not found',
			access: {
				requiredLogin: false
			}
		})
		.state('tos', {
			url: '/terms-of-service.html',
			templateUrl: './views/home/tos.html',
			controller: 'userController',
			title: 'Terms of service',
			access: {
				requiredLogin: false
			}
		})

		// NOTE router
		.state('list-note',
		{
			url: "/list-note",
			templateUrl: "./views/note/list_note.html",
			controller: 'listNoteController',
			access: {
				requiredLogin: true
			}
		})
		.state('create-note',
		{
			url: "/create-note",
			templateUrl: "./views/note/create_note.html",
			controller: 'createNoteController',
			access: {
				requiredLogin: true
			}
		})
		.state('detail-note',
		{
			url: "/detail-note",
			templateUrl: "./views/note/detail_note.html",
			controller: 'detailNoteController',
			params: {id: null},
			access: {
				requiredLogin: true
			}
		})
		

		// USER
		.state('login', 
		{
			url: "/login.html",
			templateUrl: "./views/user/login.html",
			controller: "userController",
			title: 'Login',
			access: {
				requiredLogin: false
			}
		})
		.state('register', {
			url: '/register.html',
			templateUrl: './views/user/register.html',
			controller: 'userController',
			title: 'Register',
			access: {
				requiredLogin: false
			}
		})
		.state('list-user', 
		{
			url: "/list-user",
			templateUrl: "./views/user/list_user.html",
			controller: 'listUserController',
			access: {
				requiredLogin: true
			}	

		})
		;
		
		//remove '#!' from path
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		$locationProvider.hashPrefix('!');

	}
]);
angular.module('appDirectives', [])

// COMPARE PASSWORD 
.directive('passwordMatch', function() {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function(scope, elem, attrs, control) {
            var checker = function() {
                // get password
                var e1 = scope.$eval(attrs.ngModel);

                // get re_password
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function(n) {
                // form control
                control.$setValidity('unique', n);
            });
        }
    };
})
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


angular.module('userCtrl', [])
.controller('userController', ['$scope', '$rootScope', '$window','$cookieStore', '$state', 'Message', 'User','GetLoggedIn',
	function($scope, $rootScope, $window, $cookieStore, $state, Message, User, GetLoggedIn){

	// RESET FORM DATA
    $scope.userData = {};

    // LOGIN 
    $scope.login = function() {
        // Check null
        if (!$.isEmptyObject($scope.userData)) {
            User.login($scope.userData)
                .success(function(data) {
                    $cookieStore.put('currentUser', data);
                    $rootScope.currentUser = $cookieStore.get('currentUser');
                    $window.sessionStorage.token = data.token;
                    GetLoggedIn.isLogged = true;
                    Message.createAlertSuccess('Login successful');
                    $state.go('home');
                })
                .error(function(err) {
                    Message.createAlertError('Login fail!');
                	GetLoggedIn.isLogged = true;
                    $state.go('login');
                });
        }else{
            Message.createAlertError('User name & password must be filled!');
        }
    };

	// REGISTER
    $scope.register = function() {
        // Check null
        if (!$.isEmptyObject($scope.userData)) {
            User.signup($scope.userData)
                .success(function(data) {
                    Message.createAlertSuccess('Signup successful');
                    $state.go('home');
                })
                .error(function(err) {                    
                    Message.createAlertError('Signup fail!');
                    $state.go('register');
                });
        }
    };
	
}])
.controller('listUserController', ['$scope', '$rootScope', 'User', 'Message', function($scope, $rootScope, User, Message){
	// LIST ALL USERS
	var listAll = function(){
	    User.list().success(function(users){
	        $scope.users = users;
	    });
    };

    listAll();

    // DELETE USER
    $scope.deleteUser = function(id){
        if(id !== $rootScope.currentUser.id){
            User.delete(id).success(function(){
                Message.createAlertSuccess('Delete fail!');
                listAll();
            });
        }else{
            Message.createAlertError('Delete fail!');
        }
    };

}]);







angular.module('msgService', [])
.factory('Message', ['Flash', function(Flash) {
	return {
	 	// SUCCESS MESSAGE
	    createAlertSuccess : function (message) {
	        Flash.clear();
	        var fullmessage = '<strong> Well done!</strong> '+message;
	        Flash.create('success', fullmessage, 5000);
	    },
	    // ERROR MESSAGE
	    createAlertError : function (message) {
	        Flash.clear();
	        var fullmessage = '<strong>Not good !</strong> '+message;
	        Flash.create('warning', fullmessage, 5000);
	    }

	};

}]);

angular.module('noteService', [])
.factory('Note', ['$http', '$stateParams', function($http, $stateParams) {
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
angular.module('userService', [])
.factory('User', ['$http', '$stateParams', function($http, $stateParams) {
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
        list: function() {
            return $http.get('/api/user/list');
        },
        detail: function(id) {
            return $http.get('api/user/detail/' + id);
        },
        delete: function(id) {
            return $http.delete('/api/user/delete/' + id);
        }
    };
}])
.factory('GetLoggedIn', function() {
    var auth = {
        isLogged: false
    };
    return auth;
})
.factory('TokenInterceptor', ['$q', '$window', '$location', 'GetLoggedIn',
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