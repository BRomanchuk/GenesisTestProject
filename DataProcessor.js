const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// get info about users from a file
function getUsers() {
    const results = [];
    fs.createReadStream('./data/users.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log('data is read');
        });
    return results;
}

function addUser(login, password) {
    const csvWriter = createCsvWriter({
        path: './data/users.csv',
        header: [
            {id: 'login', title: 'Login'},
            {id: 'password', title: 'Password'}
        ]
    });

    const users = getUsers();
    users.append({login: login, password: password});

    csvWriter.writeRecords(users)
        .then(() => console.log('The CSV file was written successfully'));
}


exports.getUsers = getUsers;
exports.addUser = addUser;