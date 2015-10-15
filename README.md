# last.fm

A simple interface to get the most popular artists by country

Todo:
	Implement a PHP backend so that the API key is not exposed to the end user
	Correctly select Australia on startup
	Display a notification while loading
	Handle erors in the response. The API might return 200 buy contain an error in the xml
	Fix the layout issue of the pagination being in the wrong place. 
	Test layout on a mobile
	Some country names return 'invalid country param'. Check the country list json is correct.
