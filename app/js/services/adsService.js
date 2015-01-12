/**
 * Created by Yavor on 11.01.2015 г..
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
                .$promise
                //.then(success)
                //.catch(error)
                .finally(function() {
                    $rootScope.$broadcast('isLoading', false);
                });
        }
    }
});
