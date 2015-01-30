'use strict';

var bird = require('bluebird'),
	mongoose = require('mongoose'),
    Article = mongoose.model('Article');

var MAX_ARTICLES = 5;

module.exports.render = function(req, res, next) {
	var query = Article.find({
		enabled: true,
		languages: 'en'
	}).sort({
		highlighted: -1,
        time: 1
	}).limit(MAX_ARTICLES);

	bird.promisify(query.exec, query)().then(null, function(error) {
		return [];
	}).then(function(articles) {
		// fill empty spaces
		for (var i = articles.length; i < MAX_ARTICLES; i++) {
			articles.push(new Article());
		}

		res.render('home', {
			articles: articles
		});
	}).catch(function(err) {
		console.log(err);
	});
};