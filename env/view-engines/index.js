'use strict';

var engine = require('ect'),
	path = require('path'),
	conf = rek('env/profiles/all');

var ect = engine({
	root: path.resolve(conf.root, 'server/views')
});

module.exports.init = function(app) {
    app.engine('ect', ect.render);
    app.set('view engine', 'ect');
    app.set('views', path.resolve(conf.root, 'server/views'));

    // app.use(function(req, res, next) {
    //     res.locals._ = helpers;
    //     next();
    // });
};