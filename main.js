const express = require('express');
const bodyParser = require('body-parser');

function startServer(port) {
    // create application
    const app = express();

    // processing of POST
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    // configure endpoints
    configureEndpoints(app);

    // listen port
    app.listen(port, function () {
        console.log('My application is running on http://localhost:' + port + '/')
    });
}

function configureEndpoints(app) {
    const api = require('./api');

    // get BTC rate
    app.get('/btcRate', api.getBtcRate);

    // app.post('/btcRate', api.getBtcRate);
    // app.post('/user/create');
    // app.post('/user/login');
}

exports.startServer = startServer;
exports.configureEndpoints = configureEndpoints;