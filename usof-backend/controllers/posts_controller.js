const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Post = require('../models/Post.js');

class PostController {
    async select_all(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var author_id = await get_userid(access_token);
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Post.select_all(user_role, author_id);
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
    
    async select_by_id(req, res, next) {
        try {
            var post_id = req.params.post_id;
            var access_token = req.params.access_token;
            var author_id = await get_userid(access_token);
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Post.select_by_id(post_id, user_role, author_id);
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

    async select_category_by_id(req, res, next) {
        try {
            var post_id = req.params.post_id;
            var access_token = req.params.access_token;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                const result = await Post.select_category_by_id(post_id);
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
            var access_token = req.params.access_token;
            var post_id = req.params.post_id;
            var author_id = await get_userid(access_token);
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Post.update(req.body, post_id, user_role, author_id);
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
            var author_id = await get_userid(access_token);
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                const result = await Post.create(req.body, author_id);
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
            var author_id = await get_userid(access_token);
            var post_id = req.params.post_id;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Post.delete_by_id(post_id, user_role, author_id);
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

module.exports = new PostController();


