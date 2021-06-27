const jwt = require('jsonwebtoken');

/**
 * generate access token to get btcRate
 *
 * @param login
 * @returns {*}
 */
function generateAccessToken(login) {
    return jwt.sign({ login: login }, process.env.TOKEN_SECRET, { expiresIn: '3000s' });
}


/**
 * verify access token to get btcRate
 *
 * @param req
 * @param res
 * @param callback
 * @returns {*}
 */
function authenticateToken(req, res, callback) {
    const token = req.cookies.token;

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        callback();
    })
}

exports.generateAccessToken = generateAccessToken
exports.authenticateToken = authenticateToken