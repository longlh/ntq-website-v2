'use strict';

var express = require('express'),
	path = require('path');

var conf = rek('env/profiles/all');

var app = module.exports = express();

require('reverse-route')(app);

rek('env/view-engines').init(app);

rek('env/assets').init(app);

if (conf.env === 'development') {
	app.use(express.static(path.resolve(conf.root, 'build/public')));
}

// load routes
// autoload all files in ./server/routes
require('fs').readdirSync(path.resolve(conf.root, 'server/routes')).forEach(function(file) {
	var route = rek('server/routes/' + file);

	if (route instanceof Function) {
		route(app);
	}
});