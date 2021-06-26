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
            res.send({'btcRate': rate.toString()})
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
    DataProcessor.addUser(login, password, res);
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
            res.cookie(`token=${token}`);
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    })


}


// check if token is valid
function validToken(token) {
    // TODO validate token
    return true;
}


// encrypting function
function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}