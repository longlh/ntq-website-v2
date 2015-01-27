'use strict';

module.exports = function(app) {
	app._route('home', '/').get(function(req, res, next) {
		res.render('home');
	});
};