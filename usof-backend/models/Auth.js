const dbConnection  = require('../db.js');
const hash_password = require('../utils/hash_password.js');
const token_service = require('../utils/token_service.js');

class Auth
{
    async register(body)
    {    
        body.login
        body.password
        body.password_confirm
        body.email
    }

    async login(body)
    {    
        try {
            var hash = await hash_password(body.password);
            const [row] = await dbConnection.execute("SELECT `login`, `password`, `email` FROM `user`");
            var x = false;
            row.forEach(async (element) => {
                if(body.login == element.login && body.email == element.email && hash == element.password)
                {
                    const token = token_service.generateTokens({user: body.login});
                    console.log(token);
                    x = true;
                    const [x1] = await dbConnection.execute("UPDATE `user` SET `token` = '" + token + "' WHERE `login` = '" + body.login + "'");
                }
            });
            return x;
        } catch (e) {
            console.log(e.sqlMessage);
        }
    }

    async logout(id)
    {
        try {
            const [row] = await dbConnection.execute("UPDATE `user` SET `token` = ' ' WHERE `id` = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
    }

    async password_reset()
    {

    }

    async password_reset_second(confirm_token)
    {    

    }
}

module.exports = new Auth();
