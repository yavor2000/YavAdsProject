var adsApp = angular.module('adsApp', [
  'ngRoute'
]);

adsApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
      .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'MainController'
      })
      .when('/all-ads', {
          templateUrl: 'templates/all-ads.html',
          controller: 'MainController'
      })
      .when('/register', {
          templateUrl: 'templates/register.html',
          controller: 'MainController'
      })
      .when('/login', {
          templateUrl: 'templates/login.html',
          controller: 'MainController'
      })
      .otherwise({redirectTo: '/home'});
}]);

adsApp.controller('MainController', function($scope) {
  $scope.name = 'test';
});
