const DataProcessor = require('./DataProcessor')

exports.getBtcRate = function (req, res) {
    res.send('test BTC rate');

}

exports.create = function (req, res) {
    const user = req.body;
    var login = user.login;
    var password = sha1(user.password);

    res.send('Account created :)');
    res.body
}

function  sha1(string)  {
    var sha1  =  crypto.createHash('sha1');
    sha1.update(string);
    return  sha1.digest('base64');
}