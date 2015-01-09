/**
 * Created by Yavor on 09.01.2015 г..
 */
adsApp.controller('UserAdsController', function ($scope, $cookieStore, $location, $rootScope, $routeParams, authService, userAdsService, growl) {
        $rootScope.pageTitle = 'My Ads';

        $scope.navMenuId = $cookieStore.get('navMenuId') || 0;
        $scope.statusMenuId = $cookieStore.get('statusMenuId') || undefined;

        $scope.navMenuClicked = function (id) {
            $scope.navMenuId = id;
            $cookieStore.put('navMenuId', id);
        };

        $scope.statusMenuClicked = function (id) {
            $scope.statusMenuId = id;
            $cookieStore.put('statusMenuId', id);
            reloadAllAds();
        };

        $scope.userAdsParams = $cookieStore.get('userAdsParams') || {
            startPage: 1,
            pageSize: 5
        };

        $scope.setPage = function (pageNo) {
            $scope.userAdsParams.startPage = pageNo;
            $cookieStore.put('userAdsParams', $scope.userAdsParams);
            $location.path('/user/ads/page='+pageNo);
        };

        $scope.totalItems = 99999999; // will be updated on ads load but of not set will cause setPage to 1

        if ($routeParams.page && $routeParams.page>0 ) {
            $scope.userAdsParams.startPage = $routeParams.page;
            $cookieStore.put('userAdsParams', $scope.userAdsParams);
        }

        $scope.pageChanged = function() {
            $location.path('/user/ads/page='+$scope.userAdsParams.startPage);
        };

        $scope.pageSizeChanged = function() {
            $cookieStore.put('userAdsParams', $scope.userAdsParams);
            reloadAllAds();
        };

        $scope.dataLoading = false;

        $scope.$on('isLoading', function (event, working) {
            $scope.dataLoading = working;
        });

        reloadAllAds();

        function reloadAllAds () {
            userAdsService.getUserAds(

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
                },
                $scope.statusMenuId, $scope.userAdsParams.startPage, $scope.userAdsParams.pageSize);
        }

    }
);