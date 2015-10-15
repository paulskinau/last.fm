var app = angular.module('myApp', ['ui.bootstrap']);
//app.controller('customersCtrl', function($scope, $http) {
//    $http.get("http://www.w3schools.com/angular/customers.php")
//    .success(function (response) {$scope.names = response.records;});

app.controller('artistsCtl', function($scope, $http, $window) {

  
     $http.get('iso3116-countries.json')
       .success(function(response){
	  $scope.countries = response.countries.country;	 
        })
	.error(function() 
	{
		$window.alert("could not get countries list");
	});

	$scope.currentPage = 1;
	$scope.artists = [];
	$scope.countries = [];
	getArtists('Australia');
	 
	
	function getArtists($country)
	{

	$http.get("http://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&limit=5&page=" + $scope.currentPage + "&country=" + $country + "&api_key=a0ed2629d3d28606f67d7214c916788d&format=json")

	.success(function (response) 
	{ 
		
		if (response.topartists && response.topartists['@attr'])
		{		
			$scope.totalItems = response.topartists['@attr'].total;
		}
		if ($scope.totalItems > 100)
		{
			$scope.totalItems = 50;		
		}
	
		//angular.copy(response.topartists.artist, $scope.artists);
	
		if (response.topartists && response.topartists.artist)
		{	
		// last.fm api is buggy... it often returns too many results. It seems to handle the page and limit incorrectly. 	
			$scope.artists = response.topartists.artist.slice(Math.max(response.topartists.artist.length - 5, 0))		
		}
		//$scope.artists = response.topartists.artist;
	} )
	.error(function(data, status, headers, config) {
            $window.alert('could not communicate with last.fm');

	})
	}

	$scope.pageChanged = function()
	{
		//alert('pageChanged');
		getArtists();
	}
	
	$scope.countryChanged = function($country)
	{
		getArtists($country);
	}
	
	$scope.countrySelected = function(country) {
		$window.alert('Country selected is ' + country);
	}

});
