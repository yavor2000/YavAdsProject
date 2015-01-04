var adsApp = angular.module('adsApp', [
  'ngRoute', 'ui.bootstrap', 'ngCookies', 'angular-growl'
]);

adsApp.config(["growlProvider", "$httpProvider", function(growlProvider, $httpProvider) {
    growlProvider.globalTimeToLive(4000);
    growlProvider.onlyUniqueMessages(true);
}]);

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
          controller: 'RegisterController'
      })
      .when('/login', {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
      })
      .otherwise({redirectTo: '/home'});
}]);


