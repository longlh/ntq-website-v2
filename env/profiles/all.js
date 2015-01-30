'use strict';

var _ = require('lodash'),
	path = require('path'),
	profiles = [ 'development', 'test', 'production' ],
	env = process.env.NODE_ENV;

if (profiles.indexOf(env) === -1) {
	env = 'development';
}

var all = {
	port: 3002,
	env: env
};

var profile = require(path.resolve(__dirname, env));

module.exports = _.assign(all, profile);