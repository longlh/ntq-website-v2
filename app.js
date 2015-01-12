'use strict';
global.rek = require('rekuire');

var conf = rek('env/profiles/all');
conf.root = __dirname;

rek('server').listen(conf.port, function() {
    console.log('Application started at port ' + conf.port + ' [PID: ' + process.pid + ' - ' + conf.env + ']');
});