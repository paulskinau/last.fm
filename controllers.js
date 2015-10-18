var app = angular.module('lastfmApp', ['ui.bootstrap']);

app.controller('artistsCtl', function($scope, $http, $window) {

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
        var encCountry = $window.encodeURIComponent($scope.country);
        console.log(encCountry);

        //$http.get("http://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&limit=5&page=" + $scope.currentPage + "&country=" + encCountry + "&api_key=a0ed2629d3d28606f67d7214c916788d&format=json")

        $http.get("server.php?limit=5&page=" + $scope.currentPage + "&country=" + encCountry)

        .success(function(response) {

                if (response.topartists && response.topartists['@attr']) {
                    $scope.totalItems = response.topartists['@attr'].total;
                }

                if ($scope.totalItems > 100) {
                    $scope.totalItems = 50;
                }

                if ($scope.totalItems == 0 && response.topartists['@attr']) {
                    // if we flip through the country list quickly there may be a previous requests with a country name different to the current $scope.country
                    $scope.loadStatus = "No results for " + response.topartists['@attr'].country;
                    $scope.artists = null;
                    return;
                }

                if (response.error) {
                    //$scope.loadStatus = "Error from server. Error : " + response.message + ". If this error persists please contact support@support.com and quote error 123" + response.error;
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
                    $scope.loadStatus = $scope.country + " is not supported at this time.";
                    return;
                }
        }

        getArtists();
    }

    $scope.countrySelected = function(country) {
        $window.alert('Country selected is ' + country);

    }

});