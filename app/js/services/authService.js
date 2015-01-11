/**
 * Created by Yavor on 08.01.2015 г..
 */
adsApp.factory('authService',
    function ($http, $cookieStore, $rootScope, baseServiceUrl) {
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
                }).error(function (er) {
                    console.log('error logging-in');
                    error(er);
                });
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

            getUserData : function(success, error) {
                $rootScope.$broadcast('isLoading', true);
                var request = {
                    method: 'GET',
                    headers: this.getAuthHeaders(),
                    url: baseServiceUrl + '/api/user/profile'
                };
                $http(request).success(function(data) {
                    //sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(function (er) {
                    error(er);
                }).finally(function () {
                    $rootScope.$broadcast('isLoading', false);
                });
            },

            updateUserData : function(userData, success, error) {
                $rootScope.$broadcast('isLoading', true);
                var request = {
                    method: 'PUT',
                    headers: this.getAuthHeaders(),
                    url: baseServiceUrl + '/api/user/profile',
                    data: userData
                };
                $http(request).success(function(data) {
                    success(data);
                }).error(function (er) {
                    error(er);
                }).finally(function () {
                    $rootScope.$broadcast('isLoading', false);
                });
            },

            changePassword : function(passData, success, error) {
                $rootScope.$broadcast('isLoading', true);
                var request = {
                    method: 'PUT',
                    headers: this.getAuthHeaders(),
                    url: baseServiceUrl + '/api/user/changepassword',
                    data: passData
                };
                $http(request).success(function(data) {
                    success(data);
                }).error(function (er) {
                    error(er);
                }).finally(function () {
                    $rootScope.$broadcast('isLoading', false);
                });
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
