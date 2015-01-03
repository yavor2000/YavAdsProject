/**
 * Created by Yavor on 31.12.2014 г..
 */
adsApp.factory('mainData', function ($http, $log, $rootScope) {
    return {
        getAllAds: function (pageSize, startPage, success) {
            $rootScope.$broadcast('isLoading', true);
            $http({method:'GET', url: 'http://softuni-ads.azurewebsites.net/api/ads?PageSize='+pageSize+'&StartPage='+startPage})
                .success(function(data) { //data, status, headers, config
                // this callback will be called asynchronously
                // when the response is available
                    success(data);
                })
                .error(function(data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.warn(data);
                })
                .finally(function(){
                    $rootScope.$broadcast('isLoading', false);
                });
        },
        getAllTowns: function (success) {
            $http({method:'GET', url: 'http://softuni-ads.azurewebsites.net/api/towns'})
                .success(function(data) { //data, status, headers, config
                    // this callback will be called asynchronously
                    // when the response is available
                    success(data);
                })
                .error(function(data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.warn(data);
                });
        },
        getAllCategories: function (success) {
            $http({method:'GET', url: 'http://softuni-ads.azurewebsites.net/api/categories'})
                .success(function(data) {
                    // this callback will be called asynchronously
                    // when the response is available
                    success(data);
                })
                .error(function(data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.warn(data);
                });
        },
        getAdsFilter: function (townId, categoryId, success) {
            $rootScope.$broadcast('isLoading', true);
            $http({method:'GET', url: 'http://softuni-ads.azurewebsites.net/api/ads?townid='+townId+'&categoryid='+categoryId})
                .success(function(data) { //data, status, headers, config
                    // this callback will be called asynchronously
                    // when the response is available
                    success(data);
                })
                .error(function(data) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.warn(data);
                })
                .finally(function () {
                    $rootScope.$broadcast('isLoading', false);
                });
        }
    }
});