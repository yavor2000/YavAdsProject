/**
 * Created by Yavor on 31.12.2014 г..
 */
adsApp.factory('mainData', function ($http, $log, $rootScope) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/';
    //var baseUrl = 'http://localhost:1337/';
    return {
        getAllAds: function (pageSize, startPage, success) {
            $rootScope.$broadcast('isLoading', true);
            $http({method:'GET', url: baseUrl+'api/ads?PageSize='+pageSize+'&StartPage='+startPage})
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
            $http({method:'GET', url: baseUrl + 'api/towns'})
                .success(function(data) { //data, status, headers, config
                    success(data);
                })
                .error(function(data) {
                    $log.warn(data);
                });
        },
        getAllCategories: function (success) {
            $http({method:'GET', url: baseUrl + 'api/categories'})
                .success(function(data) {
                    success(data);
                })
                .error(function(data) {
                    $log.warn(data);
                });
        },
        getAdsFilter: function (townId, categoryId, success) {
            $rootScope.$broadcast('isLoading', true);
            $http({method:'GET', url: baseUrl + 'api/ads?townid='+townId+'&categoryid='+categoryId})
                .success(function(data) { //data, status, headers, config
                    success(data);
                })
                .error(function(data) {
                    $log.warn(data);
                })
                .finally(function () {
                    $rootScope.$broadcast('isLoading', false);
                });
        },
        login: function (user, success) {
            $http({method:'POST',
                url: baseUrl + 'api/user/login',
                data: JSON.stringify(user)})
                .success(function(data, status, headers, config) {
                    console.log('logged in');
                    success(data, status, headers(), config);
                })
                .error(function(data) {
                    $log.warn(data);
                })
                .finally(function () {
                    $rootScope.$broadcast('isLoading', false);
                });
        }
    }
});