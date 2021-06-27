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

    // set secret token to generate JWT
    process.env.TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex')
}


function configureEndpoints(app) {
    const api = require('./api');

    // get BTC rate
    app.get('/btcRate', api.getBtcRate);

    // create an account
    app.post('/user/create', api.create);

    // log in to the account
    app.post('/user/login', api.login);
}


exports.startServer = startServer;
exports.configureEndpoints = configureEndpoints;