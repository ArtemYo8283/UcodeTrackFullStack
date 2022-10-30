const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Comment = require('../models/Comment.js');

class CommentController {
    async select_by_id(req, res, next) {  
        try {  
            var access_token = req.params.access_token;
            var comment_id = req.params.comment_id;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Comment.select_by_id(comment_id, user_role);
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

    async select_by_postid(req, res, next) {  

        try {  
            var post_id = req.params.post_id;
            const result = await Comment.select_by_postid(post_id);
            res.end(result);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var comment_id = req.params.comment_id;
            var author_id = await get_userid(access_token);
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Comment.update(req.body, comment_id, user_role, author_id);
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
            var post_id = req.params.post_id;
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Comment.create(post_id, author_id, req.body, user_role);
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
            var comment_id = req.params.comment_id;
            var author_id = await get_userid(access_token);
            const verify_code = await check_token(access_token);
            if(verify_code == 200) {
                var user_role = await check_role(access_token);
                const result = await Comment.delete_by_id(comment_id, user_role, author_id);
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

    async count_by_id(req, res, next) {
        try {
            var post_id = req.params.post_id;
            const result = await Comment.count_by_id(post_id);
            res.json({idPost:post_id, countComment: result});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CommentController();