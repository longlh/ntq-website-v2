'use strict';

var home = rek('server/middlewares/home');

module.exports = function(app) {
	app._route('home', '/').get(home.render);
};