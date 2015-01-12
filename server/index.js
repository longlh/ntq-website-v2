'use strict';

var express = require('express'),
	path = require('path');

var conf = rek('env/profiles/all');

var app = module.exports = express();

rek('env/view-engines').init(app);

rek('env/assets').init(app);

app.use(express.static(path.resolve(conf.root, 'build/public')));

app.use(function(req, res, next) {
	res.render('index');
});