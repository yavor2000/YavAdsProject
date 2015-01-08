var adsApp = angular.module('adsApp', [
  'ngRoute', 'ui.bootstrap', 'ngCookies', 'ngResource', 'angular-growl', 'ngAnimate'
]);

adsApp.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
//adsApp.constant('baseServiceUrl', 'http://localhost:1337');

adsApp.config(["growlProvider", "$httpProvider", function(growlProvider, $httpProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.onlyUniqueMessages(true);
    growlProvider.globalPosition('top-center');
}]);

adsApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
      .when('/', {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
      })
      .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      })
      .when('/home/page=:page', {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
      })
      .when('/register', {
          templateUrl: 'templates/register.html',
          controller: 'RegisterController'
      })
      .when('/login', {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
      })
      .otherwise({redirectTo: '/home'});
}]);


