/**
 * Created by Yavor on 31.12.2014 г..
 */
adsApp.factory('adsService', function ($rootScope, $resource, baseServiceUrl) {
    return {
        getAllAds: function (params, success, error) {
            $rootScope.$broadcast('isLoading', true);
            var adsResource = $resource(
                baseServiceUrl + '/api/ads',
                null,
                {
                    'getAll': {method: 'GET'}
                }
            );
            return adsResource.getAll(params, success, error)
                .$promise.finally(function() {
                    $rootScope.$broadcast('isLoading', false);
                });
        }
    }
});

adsApp.factory('filterService', function ($resource, baseServiceUrl) {
    var categoriesResource = $resource(
        baseServiceUrl + '/api/categories'
    );
    var townsResource = $resource(
        baseServiceUrl + '/api/towns'
    );

    return {
        getCategories: function (success, error) {
            return categoriesResource.query(success, error);
        },
        getTowns: function(success, error) {
            return townsResource.query(success, error);
        }
    }
});

adsApp.factory('userAdsService', function ($resource, $rootScope, $log, $http, authService, baseServiceUrl) {

    function getMyAds(success, error, adStatus, startPage, pageSize ) {

        var statusStr = '',
            startPageStr = '',
            pageSizeStr = '';
        if(adStatus >= 0) {
            statusStr = 'Status=' + adStatus + '&';
        }

        if(startPage > 0) {
            startPageStr = 'StartPage=' + startPage + '&';
        }

        if(pageSize > 0) {
            pageSizeStr = 'PageSize=' + pageSize;
        }

        var request = {
            method: 'GET',
            headers: authService.getAuthHeaders(),
            url: baseServiceUrl + '/api/user/ads?' + statusStr + startPageStr + pageSizeStr
        };
        $rootScope.$broadcast('isLoading', true);
        $http(request).success(function(data) {
            success(data);
                }).error(function (data, status, headers, config) {
                    $log.warn(data);
                })
            .finally(function(){
                $rootScope.$broadcast('isLoading', false);
            });
    }

    function postNewAd(ad, success, error) {
        var request = {
            method: 'POST',
            url: baseServiceUrl + '/api/user/ads',
            headers: authService.getAuthHeaders(),
            data: ad
        };
        $http(request)
            .success(function (data, status, headers, config) {
                console.log('Successfully added new ad. After submitted by an administrator it will be published.');
                success();

            })
            .error(function (data, status, headers, config) {
               console.log('Error publishing new ad!');
                error();
            })

    }

    function deactivateAd(id) {
        var request = {
            method: 'PUT',
            headers: authService.getAuthHeaders(),
            url: baseServiceUrl + '/api/user/ads/deactivate/' + id
        };
        $http(request)
            .success(function (data, status, headers, config) {
                $log.success('Ad successfully deactivated.');
                window.location.reload();
            })
            .error(function (data, status, headers, config) {
                $log.error('Could not deactivate your ad');
            })
    }

    return {
        getUserAds: getMyAds,
        deactivateAd: deactivateAd,
        publishNewAd: postNewAd
    }

});
