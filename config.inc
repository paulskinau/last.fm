<?php

function getTopArtistsURI($page, $limit, $country)
{
	return  "http://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&limit=" . $limit . "&page=" .$page . "&country=" . $country . "&api_key=a0ed2629d3d28606f67d7214c916788d&format=json";

}


