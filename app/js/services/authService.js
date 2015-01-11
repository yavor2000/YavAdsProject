/**
 * Created by Yavor on 08.01.2015 г..
 */
adsApp.factory('authService',
    function ($http, $cookieStore, baseServiceUrl) {
        function clearNavData() {
            $cookieStore.remove('adsParams');
            $cookieStore.remove('navMenuId');
            $cookieStore.remove('statusMenuId');
        }

        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/login',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    console.log(sessionStorage['currentUser']);
                    success(data);
                    clearNavData();
                }).error(error);
            },

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                    clearNavData();
                }).error(error);
            },

            logout: function() {
                delete sessionStorage['currentUser'];
                clearNavData();
            },

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
            }
        }
    }
);
