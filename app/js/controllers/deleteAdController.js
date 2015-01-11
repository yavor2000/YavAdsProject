/**
 * Created by Yavor on 11.01.2015 г..
 */
adsApp.controller('DeleteAdController',
    function ($scope, $cookieStore, $location, $route, $rootScope, $routeParams, authService, userAdsService, filterService, growl){
        $rootScope.pageTitle = 'Delete Ad';

        if (!($routeParams.id) || isNaN($routeParams.id)) {
            growl.error('Invalid id');
            $location.path('/user/ads');
        }

        userAdsService.getAdById(
            $routeParams.id,
            function(ad) {
                $scope.ad = ad;
            }
        );

        $scope.confirmDeleteAd = function () {
            userAdsService.deleteAd($routeParams.id,
                function() {
                    growl.success('Ad deleted successfully.', {ttl: 3500});
                    $location.path('/user/ads');
                },
                function() {
                    growl.error('Could not delete your ad', {ttl:3500});
                    $location.path('/user/ads');
                });
        };
    });