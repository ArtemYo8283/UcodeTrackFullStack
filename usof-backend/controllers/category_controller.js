const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Category = require('../models/Category.js');

class CategoryController {
    
    async select_all(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var user_role = await check_role(access_token);
            const result = await Category.select_all(user_role);
            if(result == 403) {
                res.status(403).send('Forbidden: Access denied');
            }
            else {
                res.end(result);
            }
            res.end();
        } catch (err) {
            next(err);
        }
    }
    
    async select_by_id(req, res, next) {
        try {
            var category_id = req.params.category_id;
            var access_token = req.params.access_token;
            var user_role = await check_role(access_token);
            const result = await Category.select_by_id(category_id, user_role);
            if(result == 403) {
                res.status(403).send('Forbidden: Access denied');
            }
            else {
                res.end(result);
            }
            res.end();
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var category_id = req.params.category_id;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Category.update(req.body, category_id, user_role);
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
                const result = await Category.create(req.body, user_role);
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
            var access_token = req.params.access_token;
            var category_id = req.params.category_id;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Category.delete_by_id(category_id, user_role);
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
    
    async select_posts_by_category(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var category_id = req.params.category_id;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Category.select_posts_by_category(category_id, user_role);
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

module.exports = new CategoryController();