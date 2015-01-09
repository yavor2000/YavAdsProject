/**
 * Created by Yavor on 03.01.2015 г..
 */
adsApp.controller('RegisterController', function($scope, $rootScope, $cookieStore, $location,  authService, filterService, growl) {
    $rootScope.pageTitle = 'Register';

    $scope.validatePassword = function (userData) {
        if (userData) {
            return userData.password !== userData.confirmPassword;
        }
        return false;
    };

    $scope.userData = {townId: null};
    $scope.towns = filterService.getTowns();

    $scope.register = function(userData) {

        authService.register(userData,
            function success() {
                growl.success("User registered successfully");
                $location.path("/");
            },
            function error(err) {
                var errorDescription = err.error_description || '';
                growl.error('User registration failed</br>' + err.error_description);
            }
        );
    };
});