const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * get info about users from a file
 *
 * @returns {[]}
 */
function getUsers(callback) {
    var users = [];
    fs.createReadStream('./data/users.csv')
        .pipe(csv())
        .on('data', (user) => users.push(user))
        .on('end', () => {
            callback(users);
        });
}


/**
 * add new user
 *
 * @param login
 * @param password
 */
function addUser(login, password) {
    const csvWriter = createCsvWriter({
        path: './data/users.csv',
        header: [
            {id: 'login', title: 'login'},
            {id: 'password', title: 'password'}
        ]
    });

    getUsers(function (users) {
        let alreadyHasAccount = false;
        users.forEach(user => {
            if (user.login === login) {
                alreadyHasAccount = true;
                // TODO break;
            }
        });
        if (!alreadyHasAccount) {
            users.push({login: login, password: password});
            csvWriter.writeRecords(users)
                .then(() => console.log('The CSV file was written successfully'));
        }
    });
}


exports.getUsers = getUsers;
exports.addUser = addUser;