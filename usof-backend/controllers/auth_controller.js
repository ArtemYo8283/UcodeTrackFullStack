const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Auth = require('../models/Auth.js');
const User = require('../models/User.js');
const { check_confirm_token } = require('../models/Auth.js');

class AuthController {

    async register(req, res, next) {
        try {
            res.end(await Auth.register(req.body));
        } catch (err) {
            next(err);
        }
    }

    async activate(req, res, next) {    
        try {
            var confirm_token = req.params.confirm_token;
            var result = await Auth.activate(confirm_token);
            if(result == "Token") {
                res.status(422).json({ msg: result });
            }
            else if(result == "Already") {
                res.status(422).json({ msg: result });
            }
            else {
                res.json({ msg: 'Success' });
            }
            res.end();
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {   
        try {
            var token = await Auth.login(req.body);
            if(token != "") {
                var result = await User.select_userdata(req.body.login);
                res.json({
                    msg: 'Success!',
                    accessToken: token,
                    currentUser: {
                        user_id: result[0].id,
                        login: result[0].login,
                        role: result[0].title
                    }
                });
            }
            else {
                res.status(401).send('Incorrect data');
            }
            res.end();
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {    
        try {
            var access_token = req.params.access_token;
            var user_id = await get_userid(access_token);
            if(user_id == undefined || access_token == "" || access_token == " ") {
                res.end("Invalid token")
            }
            else
            {
                res.end(await Auth.logout(user_id));
            }
        } catch (err) {
            next(err);
        }
    }

    async password_reset(req, res, next) {
        try {
            res.end(await Auth.password_reset(req.body));
        } catch (err) {
            next(err);
        }
    }

    async password_reset_second(req, res, next) {    
        try {
            var confirm_token = req.params.confirm_token;
            res.end(await Auth.password_reset_second(confirm_token, req.body));
        } catch (err) {
            next(err);
        }
    }

    async check_confirm_token(req, res, next) {    
        try {
            var confirm_token = req.params.confirm_token;
            if(await Auth.check_confirm_token(confirm_token) == true) {
                res.json({ msg: 'Success' });
            }
            else {
                res.status(422).send('Incorrect');
            }
            res.end();
        } catch (err) {
            next(err);
        }
    }
    
}

module.exports = new AuthController();