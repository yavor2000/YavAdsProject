/**
 * Created by Yavor on 11.01.2015 г..
 */
adsApp.controller('EditAdController',
    function ($scope, $cookieStore, $location, $route, $rootScope, $routeParams, authService, userAdsService, filterService, growl){
        $rootScope.pageTitle = 'Edit Ad';

        $scope.nullValue = null;

        if (!($routeParams.id) || isNaN($routeParams.id)) {
            growl.error('Invalid id');
            $location.path('/user/ads');
        }

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

        userAdsService.getAdById(
            $routeParams.id,
            function(ad) {
                $scope.original = ad;
            }
        );

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('previewEditImg').setAttribute('src', e.target.result);
                    $scope.original.imageDataUrl = e.target.result;
                    $scope.original.changeimage = true;
                };
                reader.readAsDataURL(input.files[0]);
                var filePath = document.getElementById('imgEditInp').value;
                document.getElementById('showEditPath').setAttribute('value', filePath);
            }
        }

        var imgLink = document.getElementById("imgEditInp");
        if (imgLink) {
            document.getElementById("imgEditInp").onchange = function () {
                readURL(this);
            };
        }

        $scope.submitEditAd = function () {
            if ($scope.original) {
                $scope.editAd.changeimage = $scope.original.changeimage || false;
                $scope.editAd.imageDataUrl = $scope.original.imageDataUrl;

                if ($scope.original.categoryId && $scope.editAd.categoryId == null) {
                    $scope.editAd.categoryId = $scope.original.categoryId;
                }

                if ($scope.original.townId && $scope.editAd.townId == null) {
                    $scope.editAd.townId = $scope.original.townId;
                }

                userAdsService.editAd($routeParams.id, $scope.editAd,
                    function() {
                        growl.success('Ad edited successfully.', {ttl: 3500});
                        $location.path('/user/ads');
                    },
                    function() {
                        growl.error('Could not edit your ad', {ttl:3500});
                        $location.path('/user/ads');
                    });
            } else {
                growl.error('Could not load ad for editing!', {ttl:3500});
            }

        };
    });