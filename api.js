const DataProcessor = require('./DataProcessor')
const kuna = require('./kuna_api');

/**
 * get BTC-UAH rate if user is logged in
 *
 * @param req
 * @param res
 */
exports.getBtcRate = function (req, res) {
    const token = req.body.token;
    if (validToken(token)) {
        kuna.btc_uah(function (rate) {
            res.send(rate.toString())
        });
    } else {
        res.send('please, login')
    }
}


/**
 * create account if user isn't in database
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    const user = req.body;
    var login = user.login;
    var password = sha1(user.password);
    DataProcessor.addUser(login, password);

    res.send('Account created :)');
}


/**
 * login function
 *
 * @param req
 * @param res
 */
exports.login = function (req, res) {

    // TODO login function

    res.send('todo');
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