const dbConnection  = require('../db.js');

module.exports = async function (access_token) {
    try {
        const [row] = await dbConnection.execute("SELECT title FROM role INNER JOIN user ON role.id = user.role_id WHERE token = '" + access_token + "'");
        const jsonContent = JSON.stringify(row);
        return jsonContent;
    } catch (e) {
        console.log(e.sqlMessage);
    }
}
