/**
 * Created by Yavor on 08.01.2015 г..
 */
// The AppController holds the presentation logic for the entire app (common all screens)
adsApp.controller('AppController',
    function ($scope, $location, authService, growl) {
        // Put the authService in the $scope to make it accessible from all screens
        $scope.authService = authService;

        $scope.logout = function() {
            authService.logout();
            growl.success("Logout successful");
            $location.path('/');
        };
    }
);