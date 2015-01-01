var adsApp = angular.module('adsApp', [
  'ngRoute', 'ui.bootstrap'
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
      .when('/all-ads/page=:page', {
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
      .otherwise({redirectTo: '/all-ads'});
}]);

adsApp.controller('MainController', function($scope, $location, $routeParams, mainData) {
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        $location.path('/all-ads/page='+pageNo);
    };

    $scope.currentPage = 1;
    $scope.totalItems = 99999999; // will be updated on ads load but of not set will cause setPage to 1
    $scope.maxSize = 5; // number of pages in pagination control
    $scope.itemsPerPage = 5;

    if ($routeParams.page && $routeParams.page>0 ) {
        $scope.currentPage = $routeParams.page;
    }

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
        $location.path('/all-ads/page='+$scope.currentPage);
    };

    mainData.getAllAds($scope.itemsPerPage, $scope.currentPage, function(resp) {
        $scope.data = resp;
        $scope.totalItems = $scope.data.numItems;
    });
    mainData.getAllTowns(function(resp) {
        $scope.towns = resp;
    });
    mainData.getAllCategories(function(resp) {
        $scope.categories = resp;
    });

    //$scope.$watch('currentPage + itemsPerPage', function() {
    //    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage)
    //        , end = begin + $scope.itemsPerPage;
    //    //$scope.filteredTodos = $scope.todos.slice(begin, end);
    //});
});

