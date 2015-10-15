var app = angular.module('myApp', []);
//app.controller('customersCtrl', function($scope, $http) {
//    $http.get("http://www.w3schools.com/angular/customers.php")
//    .success(function (response) {$scope.names = response.records;});

app.controller('customersCtrl', function($scope, $http, $window) {
    $http.get("http://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&limit=5&page=1&country=Australia&api_key=a0ed2629d3d28606f67d7214c916788d&format=json")

    .success(function (response) {$scope.artists = response.topartists.artist;})
	.error(function(data, status, headers, config) {
            $window.alert('error');
	})

});