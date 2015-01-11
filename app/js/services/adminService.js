/**
 * Created by Yavor on 11.01.2015 г..
 */
adsApp.factory('adminService', function ($rootScope, $http, $resource, baseServiceUrl) {
    return {
        getCurrentUser : function() {
            var userObject = sessionStorage['currentUser'];
            if (userObject) {
                return JSON.parse(sessionStorage['currentUser']);
            }
        },

        isAnonymous : function() {
            return sessionStorage['currentUser'] == undefined;
        },

        isLoggedIn : function() {
            return sessionStorage['currentUser'] != undefined;
        },

        isNormalUser : function() {
            var currentUser = this.getCurrentUser();
            return (currentUser != undefined) && (!currentUser.isAdmin);
        },

        isAdmin : function() {
            var currentUser = this.getCurrentUser();
            return (currentUser != undefined) && (currentUser.isAdmin);
        },

        getAuthHeaders : function() {
            var headers = {};
            var currentUser = this.getCurrentUser();
            if (currentUser) {
                headers['Authorization'] = 'Bearer ' + currentUser.access_token;
            }
            return headers;
        },
        getAccessToken : function() {
            var currentUser = this.getCurrentUser();
            if (currentUser) {
                return currentUser.access_token;
            }
        },

        getAllAds: function (params, success, error) {
            $rootScope.$broadcast('isLoading', true);
            var request = {
                method: 'GET',
                headers: this.getAuthHeaders(),
                url: baseServiceUrl + '/api/admin/ads'
            };
            $http(request).success(function(data) {
                success(data);
            }).error(function (er) {
                error(er);
            }).finally(function () {
                $rootScope.$broadcast('isLoading', false);
            });
        }
    }
});