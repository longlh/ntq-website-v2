'use strict';

var profiles = [ 'development', 'test', 'production' ],
	env = process.env.NODE_ENV;

if (profiles.indexOf(env) === -1) {
	env = 'development';
}

module.exports = {
	port: 3002,
	env: env
};