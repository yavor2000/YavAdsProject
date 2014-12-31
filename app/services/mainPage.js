/**
 * Created by Yavor on 31.12.2014 г..
 */
adsApp.factory('mainData', function ($http, $log) {
    return {
        getAllAds: function (success) {
            $http({method:'GET', url: 'http://softuni-ads.azurewebsites.net/api/ads?PageSize=10&StartPage=1'})
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
        }
    }
});