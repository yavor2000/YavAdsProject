var adsApp = angular.module('adsApp', [
  'ngRoute', 'ui.bootstrap', 'ngCookies', 'ngResource', 'angular-growl', 'ngAnimate'
]);

adsApp.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
//adsApp.constant('baseServiceUrl', 'http://localhost:1337');

adsApp.config(["growlProvider", "$httpProvider", function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalPosition('top-center');
}]);

adsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
      })
      .when('/home', {
          redirectTo: '/'
      })
      .when('/home/page=:page', {
          redirectTo: '/'
      })
      .when('/register', {
          templateUrl: 'templates/register.html',
          controller: 'RegisterController'
      })
      .when('/login', {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
      })
      .when('/user/ads', {
          templateUrl: 'templates/user-ads.html',
          controller: 'UserAdsController'
      })
      .when('/user/ads/page=:page', {
          redirectTo: '/user/ads'
      })
      .when('/user/ads/publish', {
          templateUrl: 'templates/publish-ad.html',
          controller: 'UserAdsController'
      })
      .when('/user/ads/delete=:id', {
          templateUrl: 'templates/delete-ad.html',
          controller: 'DeleteAdController'
      })
      .when('/user/ads/edit=:id', {
          templateUrl: 'templates/edit-ad.html',
          controller: 'EditAdController'
      })
      .otherwise({redirectTo: '/'});
}]);



