/**
 * Created by Yavor on 11.01.2015 г..
 */
adsApp.controller('UserEditController',
    function ($scope, $cookieStore, $location, $route, $rootScope, $routeParams, authService, userAdsService, filterService, growl) {
        $rootScope.pageTitle = 'Edit User Profile';

        $scope.dataLoading = false;

        $scope.$on('isLoading', function (event, working) {
            $scope.dataLoading = working;
        });

        filterService.getTowns(
            function(resp) {
                $scope.towns = resp;

                authService.getUserData(
                    function(userData) {
                        $scope.userData = userData;
                        console.log($scope.userData);
                    },
                    function error(err) {
                        var errorDescription = err.error_description || '';
                        growl.error('User registration failed</br>' + err.error_description);
                    });
            },
            function(error){
                growl.error(error.error_description, {ttl: 5000});
            });

        $scope.validatePassword = function (passwordData) {
            if (passwordData) {
                return passwordData.newPassword == passwordData.confirmPassword;
            }
            return false;
        };

        $scope.nullValue = null;

        $scope.updateProfile = function(userData) {
            authService.updateUserData(userData,
                function success() {
                    growl.success("User updated successfully");
                    $location.path("/home");
                },
                function error(err) {
                    var errorDescription = err.error_description || '';
                    growl.error('Update user profile failed</br>' + err.message);
                }
            );
        };


    }
);