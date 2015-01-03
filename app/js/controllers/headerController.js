/**
 * Created by Yavor on 03.01.2015 г..
 */
adsApp.controller('HeaderController', function ($scope) {
    var headerHtml = {
        headerGuest: 'templates/header-guest.html',
        headerUser: 'templates/header-user.html',
        headerAdmin: 'templates/header-admin.html'
    };

    var headerTitles = {
        home: 'Ads - Home',
        login: 'Ads - Login',
        register: 'Ads - Register'
    };

    $scope.template = {
        url: headerHtml.headerGuest
    };

    $scope.title = headerTitles.home;

    $scope.$on('changeNavTitle', function (event, text) {
        $scope.title = text;
    });
});