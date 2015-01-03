/**
 * Created by Yavor on 31.12.2014 г..
 */
adsApp.controller('MainController', function($scope, $rootScope, $location, $routeParams, mainData) {
    $rootScope.$broadcast('changeNavTitle', 'Ads - Home');

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        $location.path('/home/page='+pageNo);
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
        $location.path('/home/page='+$scope.currentPage);
    };

    $scope.dataLoading = false;

    $scope.$on('isLoading', function (event, working) {
        $scope.dataLoading = working;
    });

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

    var currentCategorySelected = 'all';
    var currentTownSelected = 'all';

    $scope.categoryClicked = function (categorySelected) {
        currentCategorySelected = categorySelected;
        filterByTownAndCategory();
    };

    $scope.townClicked = function (townSelected) {
        currentTownSelected = townSelected;
        filterByTownAndCategory();
    };

    function filterByTownAndCategory () {
        var categoryFilterId = currentCategorySelected == 'all' ? '' : currentCategorySelected;
        var townFilterId = currentTownSelected == 'all' ? '' : currentTownSelected;
        mainData.getAdsFilter(townFilterId, categoryFilterId, function(resp) {
            $scope.data = resp;
            $scope.totalItems = $scope.data.numItems;
        });
    }

    $scope.getCategoryClass = function (categoryId) {
        return categoryId === currentCategorySelected ? 'active' : '';
    };
    $scope.getTownClass = function (townId) {
        return townId === currentTownSelected ? 'active' : '';
    };
    //$scope.$watch('currentPage + itemsPerPage', function() {
    //    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage)
    //        , end = begin + $scope.itemsPerPage;
    //    //$scope.filteredTodos = $scope.todos.slice(begin, end);
    //});
});
