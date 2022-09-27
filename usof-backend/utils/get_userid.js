const dbConnection  = require('../db.js');

module.exports = async function (access_token) {
    try {
        const [row] = await dbConnection.execute("SELECT `id` FROM `user` WHERE `token` = '" + access_token + "'");
        return row[0].id;
    } catch (e) {

    }
}

