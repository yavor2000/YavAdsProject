/**
 * Created by Yavor on 31.12.2014 г..
 */
adsApp.controller('HomeController', function($scope, $rootScope, $location, $routeParams, adsService, filterService, growl, $cookieStore) {
    $rootScope.$broadcast('changeNavTitle', 'Ads - Home');

    $scope.adsParams = $cookieStore.get('adsParams') || {
        startPage: 1,
        pageSize: 5
    };

    $scope.setPage = function (pageNo) {
        $scope.adsParams.startPage = pageNo;
        $cookieStore.put('adsParams', $scope.adsParams);
        $location.path('/home/page='+pageNo);
    };

    $scope.totalItems = 99999999; // will be updated on ads load but of not set will cause setPage to 1

    if ($routeParams.page && $routeParams.page>0 ) {
        $scope.adsParams.startPage = $routeParams.page;
        $cookieStore.put('adsParams', $scope.adsParams);
    }

    $scope.pageChanged = function() {
        $location.path('/home/page='+$scope.adsParams.startPage);
    };

    $scope.pageSizeChanged = function() {
        $cookieStore.put('adsParams', $scope.adsParams);
        reloadsAllAds();
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

    reloadsAllAds();

    $scope.categoryClicked = function (categorySelected) {
        if (categorySelected != $scope.adsParams.categoryId) {
            $scope.adsParams.categoryId = categorySelected;
            $scope.adsParams.startPage = 1;
            $cookieStore.put('adsParams', $scope.adsParams);
            reloadsAllAds();
            $location.path('/home/page='+$scope.adsParams.startPage);
        }
    };

    $scope.townClicked = function (townSelected) {
        if (townSelected != $scope.adsParams.townId) {
            $scope.adsParams.townId = townSelected;
            $scope.adsParams.startPage = 1;
            $cookieStore.put('adsParams', $scope.adsParams);
            reloadsAllAds();
            $location.path('/home/page='+$scope.adsParams.startPage);
        }
    };

    function reloadsAllAds () {
        adsService.getAllAds(
            $scope.adsParams,
            function(resp) {
                $scope.data = resp;
                $scope.totalItems = $scope.data.numItems;
                //$rootScope.$broadcast('isLoading', false);
                if (resp.ads.length==0) {
                    growl.warning('No ads to display', {ttl: 1500});
                } else {
                    growl.info('There are ' + resp.numItems + ' ad(s)', {ttl: 2500});
                }
            },
            function (error) {
                growl.error(error.error_description, {ttl: 5000});
            });
    }

    /*$scope.$watch('adsParams', function (newVal, oldVal, scope) {
        if(newVal) {
            $cookieStore.put('adsParams', scope.adsParams);
            console.log('adsParam changed!');
        }
    });*/
});
