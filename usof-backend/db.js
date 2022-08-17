import fs from 'fs';
import mysql from 'mysql2';
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

export const pool = mysql.createConnection(config);