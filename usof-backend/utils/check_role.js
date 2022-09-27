const dbConnection  = require('../db.js');

module.exports = async function (access_token) {
    try {
        const [row] = await dbConnection.execute("SELECT title FROM role INNER JOIN user ON role.id = user.role_id WHERE token = '" + access_token + "'");
        return row[0].title;
    } catch (e) {
        console.log(e);
    }
}
