/**
 * Created by Yavor on 03.01.2015 г..
 */
adsApp.controller('LoginController', function($scope, $rootScope, $location, authService, growl) {
    //$rootScope.$broadcast('changeNavTitle', 'Ads - Login');
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
    /*$scope.login = function() {
        console.log($scope.user);
        mainData.login($scope.user,
            function (data, status, headers, config) {
                $scope.userData = data;
                $cookieStore.put('access_token', $scope.userData.access_token);
                $cookieStore.put('username', $scope.userData.username);
                $scope.username = $cookieStore.get('username');
            },
            function (error) {

            });
    };*/
});