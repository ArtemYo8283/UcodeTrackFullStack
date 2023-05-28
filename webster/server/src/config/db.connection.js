import mysql from 'mysql2';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('src/config/db-config.json', 'utf8'));

const dbConnection = mysql.createPool(config);

export default dbConnection.promise();