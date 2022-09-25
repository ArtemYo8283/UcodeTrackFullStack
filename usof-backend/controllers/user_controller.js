const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const User = require('../models/User.js');

class UserController {
    async select_all(req, res, next) {
        var access_token = req.params.access_token;
        res.end(await User.select_all());
    }
    
    async select_by_id(req, res, next) {
        var user_id = req.params.user_id;
        var access_token = req.params.access_token;
        res.end(await User.select_by_id(user_id));
    }

    async update_avatar(req, res, next) {   
        try {
            var access_token = req.query.access_token;
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var user_id = req.params.user_id;
            res.end(await User.add(req.body, user_id));
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            var access_token = req.params.access_token;
            res.end(await User.add(req.body));
        } catch (err) {
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        var access_token = req.params.access_token;
        var user_id = req.params.user_id;
        res.end(await User.delete_by_id(user_id));
    }
}

module.exports = new UserController();



