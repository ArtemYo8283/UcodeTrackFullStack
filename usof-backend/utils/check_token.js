const dbConnection  = require('../db.js');

module.exports = async function (access_token) {
    try {
        var code = 401;
        if(access_token == "" || access_token === undefined) {
            return 401;
        }
        const [row] = await dbConnection.execute("SELECT token FROM user");
        row.forEach((element) => {
            if(element.token == access_token) {
                code = 200;
            }
        });
        return code;
    } catch (e) {
        console.log(e);
    }
}

