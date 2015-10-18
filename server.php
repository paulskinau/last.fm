<?php

#$json_countries = file_get_contents("iso3116-countries.json");
#$countries = json_decode($string, true);

require("config.inc");


if ( ($page = (int)filter_input(INPUT_GET, 'page',FILTER_VALIDATE_INT)) == null)
{
	echo '{"error":A1,"message":"page param invalid","links":[]}';
	return;
}
if ( ($country = (string)filter_input(INPUT_GET,'country')) == null)
{
	echo '{"error":A2,"message":"country param invalid","links":[]}';
	return;
}

if ( !($limit = (int)filter_input(INPUT_GET, 'limit',FILTER_VALIDATE_INT)))
{
	echo '{"error":A3,"message":"limit param invalid","links":[]}';
        return;
}

$url = getTopArtistsURI($page, $limit, $country);
$result = file_get_contents($url);
foreach ($http_response_header as $str)
{
	if (strpos($str, "HTTP/1.1") === 0)
	{
	 	header($str);
	}

	if (strpos($str, "Content-Type:") === 0)
	{
		header($str);
	}
}
echo $result;
