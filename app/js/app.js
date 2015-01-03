var adsApp = angular.module('adsApp', [
  'ngRoute', 'ui.bootstrap', 'ngCookies'
]);

adsApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
      .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'MainController'
      })
      .when('/home/page=:page', {
          templateUrl: 'templates/home.html',
          controller: 'MainController'
      })
      .when('/all-ads', {
          templateUrl: 'templates/home.html',
          controller: 'MainController'
      })
      .when('/all-ads/page=:page', {
          templateUrl: 'templates/home.html',
          controller: 'MainController'
      })
      .when('/register', {
          templateUrl: 'templates/register.html',
          controller: 'MainController'
      })
      .when('/login', {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
      })
      .otherwise({redirectTo: '/home'});
}]);


