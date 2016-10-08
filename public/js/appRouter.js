var appRouter = angular.module('appRoutes', []);

appRouter.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
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
			controller: 'noteController',
			access: {
				requiredLogin: true
			}
		})
		.state('create-note',
		{
			url: "/create-note",
			templateUrl: "./views/note/create.html",
			controller: 'noteController',
			access: {
				requiredLogin: true
			}
		})
		.state('detail',
		{
			url: "/detail-user",
			templateUrl: "./views/user/detail.html",
			controller: 'noteController',
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
			controller: 'userController',
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