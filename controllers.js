var app = angular.module('lastfmApp', ['ui.bootstrap']);

app.controller('artistsCtl', function($scope, $http, $window, $cacheFactory) {

    $http.get('iso3116-countries.json')
        .success(function(response) {
            $scope.countries = response.countries.country;
            $scope.country = "Australia";
            // load the australia country once we have a list of countries
            getArtists($scope.country);

        })
        .error(function() {
            $window.alert("could not get countries list");
        });

    $scope.currentPage = 1;
    $scope.artists = [];
    $scope.countries = [];

	
    function getArtists() {

        $scope.artists = null;
        $scope.loadStatus = "Loading from last.fm....";
		
		var encCountry = encodeURI($scope.country);
		
	$http( { method: 'GET', url: 'server.php', params: { limit : 5, page: $scope.currentPage, country: encCountry }, cache: true })

        .success(function(response, status, headers, config) {
            // if we flip through the country list quickly there may be a previous requests with a country name different to the current $scope.country
			//  lets not display anything from an old stale query
			if (config.params.country != encodeURI($scope.country) && config.params.page != $scope.currentPage)
				{
                    return;
				}
                		
                if (response.topartists && response.topartists['@attr'] && response.topartists['@attr'].total > 0) {
                    $scope.totalItems = response.topartists['@attr'].total;
                }

                if ($scope.totalItems > 1000000 *5) {
                    $scope.totalItems = 1000000 *5 -5;
					$scope.hasMore = true;
                }
				else
				{
					$scope.hasMore = false;
				}
				
				

                if (response.error) {
                    $scope.errorCode = "LFM123" + response.error;
                    $scope.artists = null;
                    return;

                }

                if (response.topartists && response.topartists.artist && response.topartists.artist.length > 0) {
                    // last.fm api is buggy... it often returns too many results. It seems to handle the page and limit incorrectly. 	
                    $scope.artists = response.topartists.artist.slice(Math.max(response.topartists.artist.length - 5, 0));
                    $scope.loadStatus = null;
                    return;
                }

				if (response.topartists && response.topartists.artist.length == 0 && response.topartists['@attr'].totalPages > $scope.currentPage) 
					{
						$scope.artists = null;
						$scope.loadStatus = "Last.fm could not load this page " + $scope.currentPage + ". Try browsing to a lower page number.";
						return;
					}
                
				
				if (response.topartists && response.topartists.artist && response.topartists.artist.length == 0) {
                    // last.fm api is buggy... it often returns too many results. It seems to handle the page and limit incorrectly. 	
                    $scope.artists = null;
                    $scope.loadStatus = "No results were found for " + $scope.country;
                    return;
                }

                $scope.artists = null;
                $scope.errorCode = "LFM121";

            })
            .error(function(data, status, headers, config) {
                $scope.loadStatus = "Error communicating with server. If this error persists, please contact support@support.com and quote error LFM122";
                $scope.artists = null;

            })
    }

    $scope.pageChanged = function() {
        //alert('pageChanged');
        getArtists();
    }

    $scope.countryChanged = function() {
        //alert('country changed to ' + $country );
        switch ($scope.country) {
            case "Bonaire, Sint Eustatius and Saba":
            case "Bosnia and Herzegovina":
            case "Cabo Verde":
            case "C\xF4te d\'Ivoire":
            case "Bosnia and Herzegovina":
            case "Holy See":
            case "Libya":
            case "Palestine, State of":
            case "R\xE9union":
                {
                    $scope.artists = null;
					$scope.totalItems = 0;
                    $scope.loadStatus = $scope.country + " is not supported at this time.";
					$scope.hasMore = false;
                    return;
                }
        }

		$scope.currentPage = 1;
		$scope.totalItems = 0;
        getArtists();
    }

    $scope.countrySelected = function(country) {
        $window.alert('Country selected is ' + country);

    }

});
