const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Auth = require('../models/Auth.js');

class AuthController {

    async register(req, res, next)
    {    
        res.end(await Auth.register(req.body));
    }

    async login(req, res, next)
    {   
        var x = await Auth.login(req.body);
        if(x == true)
        {
            res.status(200).send('Success');
        }
        else
        {
            res.status(401).send('Incorrect data');
        }
        res.end();
    }

    async logout(req, res, next)
    {    
        var access_token = req.params.access_token;
        var user_id = await get_userid(access_token);
        if(user_id == undefined || access_token == "" || access_token == " ")
        {
            res.status(422).send('Incorrect data');
            res.end();
        }
        res.end(await Auth.logout(user_id));
    }

    async password_reset(req, res, next)
    {
        res.end(await Auth.password_reset());
    }

    async password_reset_second(req, res, next)
    {    
        var confirm_token = req.params.confirm_token;

        res.end(await Auth.password_reset_second(confirm_token));
    }

}

module.exports = new AuthController();