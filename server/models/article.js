'use strict';

var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	heading: {
		type: String,
		required: true
	},
	categories: [String],
	enabled: {
		type: Boolean,
		required: true
	},
	time: {
		type: Date,
		required: true
	},
	languages: [String],
	extracts: [{
		style: {
			type: Number,
			required: true
		},
		identifier: {
			type: Number,
			required: true
		},
		image: String,
		text: String
	}],
	gallery: [String],
	bulletin: String,
	highlighted: Boolean,
	avatar: String
});

mongoose.model('Article', ArticleSchema);