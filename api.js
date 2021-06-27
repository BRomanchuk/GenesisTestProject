const DataProcessor = require('./DataProcessor')
const kuna = require('./kuna_api');
const crypto = require('crypto');
const jwt = require('./jwt');

/**
 * get BTC-UAH rate if user is logged in
 *
 * @param req
 * @param res
 */
exports.getBtcRate = function (req, res) {
    jwt.authenticateToken(req, res, function () {
        kuna.btc_uah(function (rate) {
            res.send(rate.toString());
        });
    })
}


/**
 * create account if user isn't in database
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    let login = req.body.login;
    let password = sha1(req.body.password.toString());
    if (validLogin(login)) {
        DataProcessor.addUser(login, password, res);
    } else {
        res.sendStatus(401);
    }
}


/**
 * login function
 *
 * @param req
 * @param res
 */
exports.login = function (req, res) {
    // TODO login function
    let login = req.body.login;
    let password = sha1(req.body.password.toString());


    DataProcessor.getUsers(function (users) {
        let logged = false;
        users.forEach(user => {
            if (user.login === login && user.password === password) {
                logged = true;
            }
        });
        if (logged) {
            const token = jwt.generateAccessToken({ login: login });
            // set token in cookie
            res.cookie('token', token, {httpOnly: true});
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    })


}


// check if login (email) is valid
function validLogin(login) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(login).toLowerCase());
}


// encrypting function
function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}