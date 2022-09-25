const dbConnection  = require('../db.js');

module.exports = async function (access_token) {
    if(access_token == "" || access_token === undefined) {
        return 401;
    }
    try {
        const [row] = await dbConnection.execute("SELECT token FROM user");
        row.forEach((element) => {
            if(element.token == access_token) {
               return 200;
            }
        })
        
    } catch (e) {
        console.log("check_token_db_error");
    }
    return 403;
}

