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
