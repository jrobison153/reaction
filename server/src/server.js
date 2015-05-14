/**
 * web Server
 */

'use strict';

var config = require('./server_config.json');
var express = require('express');
var path = require('path');
var Q = require('q');

var server = null;

function start() {

    var serverStartedDfd = Q.defer();

    if (server === null) {
        var app = express();

        app.use('/', express.static('dist'));


        server = app.listen(config.port, function () {
            console.log('Server running on port ' + server.address().port);

            serverStartedDfd.resolve();
        });
    }
    else {
        serverStartedDfd.resolve();
    }

    return serverStartedDfd.promise;
}

module.exports = {
    start: start
};