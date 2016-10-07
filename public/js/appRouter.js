var appRouter = angular.module('appRoutes', []);

appRouter.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){
		// 404 page
		$urlRouterProvider.otherwise("/404");
		$urlRouterProvider.when('/_=_', '/');

		$stateProvider
		.state( 
			'home', 
			{
				url: "/",
				templateUrl: "./views/home/home.html",
				controller: "baseController",
				access: {
	                requiredLogin: false
	            }
			}
			)
		.state('list', 
		{
			url: "/list-user",
			templateUrl: "./views/user/list.html",
			controller: 'userController',
			access: {
	                requiredLogin: false
	            }

		})
		.state('create',
		{
			url: "/create-user",
			templateUrl: "./views/user/create.html",
			controller: 'userController',
			access: {
	                requiredLogin: false
	            }
		})
		.state('detail',
			{
				url: "/detail-user",
				templateUrl: "./views/user/detail.html",
				controller: 'userController',
				params: {id: null},
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
        .state('forgotpwd', {
            url: '/forgot-password.html',
            templateUrl: './views/user/forgot_pwd.html',
            controller: 'userController',
            title: 'Forgot Password',
            access: {
                requiredLogin: false
            }
        })
        .state('tos', {
            url: '/terms-of-service.html',
            templateUrl: './views/user/tos.html',
            controller: 'userController',
            title: 'Terms of service',
            access: {
                requiredLogin: false
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