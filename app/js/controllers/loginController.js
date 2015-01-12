/**
 * Created by Yavor on 03.01.2015 г..
 */
adsApp.controller('LoginController', function($scope, $rootScope, $cookieStore, $location, authService, growl) {
    $rootScope.pageTitle = 'Login';

    $scope.login = function(userData) {
        authService.login(userData,
            function success() {
                growl.success("User <strong>" + (userData.username).toUpperCase() + "</strong> logged-in successfully :)");
                $location.path("/");
            },
            function error(err) {
                var errorDescription = err.error_description || '';
                growl.error("Login failed</br>" + err.error_description);
            }
        );
    };
});


