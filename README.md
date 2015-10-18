last.fm API demonstration
==============

A simple interface to get the most popular artists by country

Features
--------------

- A php backend to hide the our last.fm API code

Bugs
--------------
- Not all countries from the "ISO 3166-1 country names standard" seem to work with the last.fm server. For now the code displays a "not supported error". See controller.js for countries that are not supported.
- Last.fm is currently not giving out API keys due to a bug on their site. The link to request a key redirects to their homepage. I used a key I found online. 

Installation
--------------

- Development Server: ubuntu-14.04.3-server-i386 (Virtual Box 5.0.6)
- System: Linux ubuntu 3.19.0-25-generic #26~14.04.1-Ubuntu SMP Fri Jul 24 21:18:00 UTC 2015 i686
- Php Version:	PHP Version 5.5.9-1ubuntu4.13
- Web Server: Apache 2.4.7-1ubuntu4.7
	
Simply checkout the code to an appropriate server folder on the server. Limit external acceess to confic.inc 

Test Environment
--------------

Tested in:

- Chrome (Version 46.0.2490.71 m) on Windows 10
- Ipad Mini (Chrome Emulator)
- Samsung Galaxy S4 (Chrome Emulator)
- Firefox 41.0.1 on Windows 10
- Responsive Design View (Firefox 41.0.1 on Windows 10)


External Modules
--------------

- AngularJS v1.4.7 (License: MIT) -> Used to query our php server module
- angular-ui-bootstrap Version: 0.12.0 (License: MIT) -> Used for th epagination control
- Bootstrap CSS v3.1.1 (License: MIT) -> needed by angular-ui-bootstrap

	
