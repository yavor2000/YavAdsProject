/**
 * Created by Yavor on 03.01.2015 г..
 */
adsApp.controller('LoginController', function($scope, $rootScope, $cookieStore, mainData) {
    $rootScope.$broadcast('changeNavTitle', 'Ads - Login');

    $scope.login = function() {
        console.log($scope.user);
        mainData.login($scope.user,
            function (data, status, headers, config) {
                console.log(status);
                console.log(data);
                $scope.userData = data;
                $cookieStore.put('access_token', $scope.userData.access_token);
                $cookieStore.put('username', $scope.userData.username);
                $scope.username = $cookieStore.get('username');

            },
            function (error) {

            });
    };
});