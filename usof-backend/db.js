const fs = require('fs');
const mysql = require('mysql2');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));


const dbConnection = mysql.createPool(JSON.parse(fs.readFileSync('./config.json', 'utf8')));

module.exports = dbConnection.promise();
