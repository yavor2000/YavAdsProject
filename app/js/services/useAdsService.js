/**
 * Created by Yavor on 11.01.2015 г..
 */
adsApp.factory('userAdsService', function ($resource, $rootScope, $log, $http, authService, baseServiceUrl) {

    function getMyAds(success, error, adStatus, startPage, pageSize ) {

        var statusStr = '',
            startPageStr = '',
            pageSizeStr = '';
        if(adStatus >= 0) {
            statusStr = 'Status=' + adStatus + '&';
        }

        if(startPage > 0) {
            startPageStr = 'StartPage=' + startPage + '&';
        }

        if(pageSize > 0) {
            pageSizeStr = 'PageSize=' + pageSize;
        }

        var request = {
            method: 'GET',
            headers: authService.getAuthHeaders(),
            url: baseServiceUrl + '/api/user/ads?' + statusStr + startPageStr + pageSizeStr
        };
        $rootScope.$broadcast('isLoading', true);
        $http(request).success(function(data) {
            success(data);
        }).error(function (data, status, headers, config) {
            $log.warn(data);
        })
            .finally(function(){
                $rootScope.$broadcast('isLoading', false);
            });
    }

    function postNewAd(ad, success, error) {
        var request = {
            method: 'POST',
            url: baseServiceUrl + '/api/user/ads',
            headers: authService.getAuthHeaders(),
            data: ad
        };
        $http(request)
            .success(function (data, status, headers, config) {
                console.log('Successfully added new ad. After submitted by an administrator it will be published.');
                success();

            })
            .error(function (data, status, headers, config) {
                console.log('Error publishing new ad!');
                error();
            })
    }

    function deactivateAd(id, success, error) {
        var request = {
            method: 'PUT',
            headers: authService.getAuthHeaders(),
            url: baseServiceUrl + '/api/user/ads/deactivate/' + id
        };
        $http(request)
            .success(function (data, status, headers, config) {
                console.log('Ad successfully deactivated.');
                success();
            })
            .error(function (data, status, headers, config) {
                console.log('Could not deactivate your ad');
                error();
            })
    }

    function publishAgainAd(id, success, error) {
        var request = {
            method: 'PUT',
            headers: authService.getAuthHeaders(),
            url: baseServiceUrl + '/api/user/ads/publishagain/' + id
        };
        $http(request)
            .success(function (data, status, headers, config) {
                console.log('Ad successfully deactivated.');
                success();
            })
            .error(function (data, status, headers, config) {
                console.log('Could not deactivate your ad');
                error();
            })
    }

    function getAdById(id, success, error) {
        var request = {
            method: 'GET',
            headers: authService.getAuthHeaders(),
            url: baseServiceUrl + '/api/user/ads/' + id
        };
        $http(request)
            .success(function (data, status, headers, config) {
                success(data);
            })
            .error(function (data, status, headers, config) {
                console.log('Could not get your ad.');
                error();
            })
    }

    function deleteAd(id, success, error) {
        var request = {
            method: 'DELETE',
            headers: authService.getAuthHeaders(),
            url: baseServiceUrl + '/api/user/ads/' + id
        };
        $http(request)
            .success(function (data, status, headers, config) {
                console.log('Ad successfully deleted.');
                success();
            })
            .error(function (data, status, headers, config) {
                console.log('Could not delete your ad.');
                error();
            })
    }

    function editAd(adId, editAd, success, error) {
        var request = {
            method: 'PUT',
            url: baseServiceUrl + '/api/user/ads/' + adId,
            headers: authService.getAuthHeaders(),
            data: editAd
        };
        $http(request)
            .success(function (data, status, headers, config) {
                console.log('Successfully edited your ad.');
                success();

            })
            .error(function (data, status, headers, config) {
                console.log('Error editing your ad!');
                error();
            })
    }

    return {
        getUserAds: getMyAds,
        deactivateAd: deactivateAd,
        publishNewAd: postNewAd,
        publishAgainAd: publishAgainAd,
        deleteAd: deleteAd,
        getAdById: getAdById,
        editAd: editAd
    }

});
