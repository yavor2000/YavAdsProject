/**
 * Created by Yavor on 11.01.2015 г..
 */
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