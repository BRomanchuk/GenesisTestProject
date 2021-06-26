const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

function startServer(port) {
    // create application
    const app = express();

    // processing of POST
    app.use(cookieParser())
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

    app.post('/user/create', api.create);
    app.post('/user/login', api.login);
}

exports.startServer = startServer;
exports.configureEndpoints = configureEndpoints;