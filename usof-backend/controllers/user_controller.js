const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const token_service = require('../utils/token_service.js');
const get_userid = require('../utils/get_userid.js');
const User = require('../models/User.js');

class UserController {
    async select_all(req, res, next) {
        try {
            var access_token = req.params.access_token;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await User.select_all(user_role);
                res.end(result);
            }
            else if(verify_code == 401) {
                var user_role = " ";
                const result = await User.select_all(user_role);
                res.end(result);
            }
        } catch (err) {
            next(err);
        }
    }
    
    async select_by_id(req, res, next) {
        try {  
            var user_id = req.params.user_id;
            var access_token = req.params.access_token;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await User.select_by_id(user_id, user_role);
                if(result == 403) {
                    res.status(403).send('Forbidden: Access denied');
                }
                else {
                    res.end(result);
                }
                res.end();
            }
            else if(verify_code == 401) {
                res.status(401).send('Unauthorized');
                res.end();
            }
        } catch (err) {
            next(err);
        }
    }

    async update_avatar(req, res, next) {   
        try {
            var access_token = req.params.access_token;
            const verify_code = await check_token(access_token);
            var user_id = await get_userid(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await User.update_avatar(req.params.filename, user_role, user_id);
                if(result == 403) {
                    res.status(403).send('Forbidden: Access denied');
                }
                else {
                    res.end(result);
                }
                res.end();
            }
            else if(verify_code == 401) {
                res.status(401).send('Unauthorized');
                res.end();
            }
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            var user_id = req.params.user_id;
            var access_token = req.params.access_token;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await User.add(req.body, user_id, user_role);
                if(result == 403) {
                    res.status(403).send('Forbidden: Access denied');
                }
                else {
                    res.end(result);
                }
                res.end();
            }
            else if(verify_code == 401) {
                res.status(401).send('Unauthorized');
                res.end();
            }
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            var access_token = req.params.access_token;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await User.add(req.body, user_role);
                if(result == 403) {
                    res.status(403).send('Forbidden: Access denied');
                }
                else {
                    res.end(result);
                }
                res.end();
            }
            else if(verify_code == 401) {
                res.status(401).send('Unauthorized');
                res.end();
            }
        } catch (err) {
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        try {
            var user_id = req.params.user_id;
            var access_token = req.params.access_token;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await User.delete_by_id(user_id, user_role);
                if(result == 403) {
                    res.status(403).send('Forbidden: Access denied');
                }
                else {
                    res.end(result);
                }
                res.end();
            }
            else if(verify_code == 401) {
                res.status(401).send('Unauthorized');
                res.end();
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();



