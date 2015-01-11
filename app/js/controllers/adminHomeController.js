/**
 * Created by Yavor on 11.01.2015 г..
 */
/**
 * Created by Yavor on 31.12.2014 г..
 */
adsApp.controller('AdminHomeController', function($scope, $rootScope, $location, $routeParams, adminService, filterService, authService, growl, $cookieStore) {
    //$rootScope.$broadcast('changeNavTitle', 'Ads Administration - Home');
    $rootScope.pageTitle = authService.isAdmin() ? 'Administration - Home' : 'Home';

    $scope.adminAdsParams = $cookieStore.get('adminAdsParams') || {
        startPage: 1,
        pageSize: 5
    };

    $scope.adminNavMenuId = $cookieStore.get('adminNavMenuId') || 0;

    $scope.navMenuClicked = function (id) {
        $scope.adminNavMenuId = id;
        $cookieStore.put('adminNavMenuId', id);
    };

    $scope.setPage = function (pageNo) {
        $scope.adminAdsParams.startPage = pageNo;
        $cookieStore.put('adminAdsParams', $scope.adminAdsParams);
        $location.path('/admin/home/page='+pageNo);
    };

    if ($routeParams.page && $routeParams.page>0 ) {
        $scope.adminAdsParams.startPage = $routeParams.page;
        $cookieStore.put('adminAdsParams', $scope.adminAdsParams);
    }

    $scope.pageChanged = function() {
        $location.path('/admin/home/page='+$scope.adminAdsParams.startPage);
    };

    $scope.pageSizeChanged = function() {
        $cookieStore.put('adminAdsParams', $scope.adminAdsParams);
        reloadAllAds();
    };

    $scope.dataLoading = false;

    $scope.$on('isLoading', function (event, working) {
        $scope.dataLoading = working;
    });

    filterService.getTowns(function(resp) {
            $scope.towns = resp;
        },
        function(error){
            growl.error(error.error_description, {ttl: 5000});
        });
    filterService.getCategories(function(resp) {
            $scope.categories = resp;
        },
        function(error){
            growl.error(error.error_description, {ttl: 5000});
        });

    reloadAllAds();

    $scope.categoryClicked = function (categorySelected) {
        if (categorySelected != $scope.adminAdsParams.categoryId) {
            $scope.adminAdsParams.categoryId = categorySelected;
            $scope.adminAdsParams.startPage = 1;
            $cookieStore.put('adminAdsParams', $scope.adminAdsParams);
            //reloadAllAds();
            $location.path('/admin/home/page='+$scope.adminAdsParams.startPage);
        }
    };

    $scope.townClicked = function (townSelected) {
        if (townSelected != $scope.adminAdsParams.townId) {
            $scope.adminAdsParams.townId = townSelected;
            $scope.adminAdsParams.startPage = 1;
            $cookieStore.put('adminAdsParams', $scope.adminAdsParams);
            //reloadAllAds();
            $location.path('/admin/home/page='+$scope.adminAdsParams.startPage);
        }
    };

    function reloadAllAds () {
        adminService.getAllAds(
            $scope.adminAdsParams,
            function(resp) {
                $scope.data = resp;
                $scope.totalItems = $scope.data.numItems;
                if (resp.ads.length==0) {
                    growl.warning('No ads to display', {ttl: 1500});
                } else if (resp.ads.length==1) {
                    growl.info('There is only one ad', {ttl: 2500});
                } else {
                    growl.info('There are ' + resp.numItems + ' ads', {ttl: 2500});
                }
            },
            function (error) {
                growl.error(error.error_description, {ttl: 5000});
            });
    }
});
