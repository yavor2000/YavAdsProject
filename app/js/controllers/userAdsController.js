/**
 * Created by Yavor on 09.01.2015 г..
 */
adsApp.controller('UserAdsController',
    function ($scope, $cookieStore, $location, $route, $rootScope, $routeParams, authService, userAdsService, filterService, growl) {
        $rootScope.pageTitle = 'My Ads';

        $scope.navMenuId = $cookieStore.get('navMenuId') || 0;
        $scope.statusMenuId = $cookieStore.get('statusMenuId');

        $scope.navMenuClicked = function (id) {
            $scope.navMenuId = id;
            $cookieStore.put('navMenuId', id);
        };

        $scope.statusMenuClicked = function (id) {
            if (id != $scope.statusMenuId) {
                $scope.userAdsParams.startPage = 1;
                $cookieStore.put('userAdsParams', $scope.userAdsParams);
                $scope.statusMenuId = id;
                $cookieStore.put('statusMenuId', id);
                $location.path('/user/ads/page=1');
            }
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

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('previewImg').setAttribute('src', e.target.result);
                    $scope.newAd.imageDataUrl = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
                var filePath = document.getElementById('imgInp').value;
                document.getElementById('showPath').setAttribute('value', filePath);
            }
        }
        var imgLink = document.getElementById("imgInp");
        if (imgLink) {
            document.getElementById("imgInp").onchange = function () {
                readURL(this);
            };
        }

        if ($location.url().indexOf('publish') < 0) {
            reloadAllAds();
        }

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

        $scope.publishNewAd = function (adData) {
            console.log(adData);

            if (!adData || !adData.title || !adData.text) {
                growl.error('Title and text are required!');
                return;
            }

            userAdsService.publishNewAd(adData,
                function () {
                    growl.success('Ad successfully published.');
                    $location.path('/user/ads');
                },
                function() {
                    growl.error('Could not publish your ad');
                    $location.path('/user/ads');
                });
        };

        $scope.deactivateAd = function (id) {
            userAdsService.deactivateAd(id,
                function() {
                    growl.success('Ad successfully deactivated.', {ttl: 3500});
                    $route.reload();
                },
                function() {
                    growl.error('Could not deactivate your ad', {ttl:3500});
                });
        };

        $scope.publishAgainAd = function (id) {
            userAdsService.publishAgainAd(id,
                function() {
                    growl.success('Ad published again successfully.', {ttl: 3500});
                    $route.reload();
                },
                function() {
                    growl.error('Could not republish your ad', {ttl:3500});
                });
        };

        $scope.deleteAd = function (id) {
            if (id && !isNaN(id)) {
                $location.path('/user/ads/delete='+id);
            }


        };
    }
);