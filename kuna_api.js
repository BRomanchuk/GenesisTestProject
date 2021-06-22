const request = require('request');

const kuna_url = 'https://api.kuna.io/v3/tickers?symbols=btcuah';

const btc_uah = (callback) => {
    request(kuna_url, { json: true }, (err, res, body) => {
        if (err) {
            return callback(err);
        }
        return callback(body[0][1]);
    });
}

exports.btc_uah = btc_uah;