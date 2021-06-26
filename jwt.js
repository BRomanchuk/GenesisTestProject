const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
// const TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');


// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex')


function generateAccessToken(login) {
    return jwt.sign(login, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


function authenticateToken(req, res, callback) {
    // TODO authentication
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        callback()
    })
}

exports.generateAccessToken = generateAccessToken
exports.authenticateToken = authenticateToken