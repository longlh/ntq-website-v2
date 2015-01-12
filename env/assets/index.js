'use strict';

var rev = rek('build/rev.json'),
	origNames = Object.keys(rev),
	prefixes = {
		img: 'client/assets/img/',
		css: 'build/.tmp/cssmin/',
		js: 'build/.tmp/jsmin/'
	},
	assets = {
		img: {},
		css: {},
		js: {}
	};

var i = 0,
	length = origNames.length,
	name;

for (; i < length; i++) {
	name = origNames[i];

	if (name.indexOf(prefixes.img) === 0) {
		assets.img[name.replace(prefixes.img, '')] = rev[name];
	} else if (name.indexOf(prefixes.css) === 0) {
		assets.css[name.replace(prefixes.css, '')] = rev[name];
	} else if (name.indexOf(prefixes.js) === 0) {
		assets.js[name.replace(prefixes.js, '')] = rev[name];
	}
}

module.exports.init = function(app) {
	app.use(function(req, res, next) {
		res.locals.__img = function(path) {
			return assets.img[path];
		};
		res.locals.__css = function(path) {
			return assets.css[path];
		};
		res.locals.__js = function(path) {
			return assets.js[path];
		};
		next();
	});
};