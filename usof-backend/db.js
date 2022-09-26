const fs = require('fs');
const mysql = require('mysql2');

const config = JSON.parse(fs.readFileSync('./db-config.json', 'utf8'));

const dbConnection = mysql.createPool(config);

module.exports = dbConnection.promise();

