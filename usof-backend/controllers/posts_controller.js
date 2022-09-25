const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Post = require('../models/Post.js');

class PostController {
    async select_all(req, res, next) {
        var access_token = req.params.access_token;
        res.end(await Post.select_all());
    }
    
    async select_by_id(req, res, next) {
        var post_id = req.params.post_id;
        var access_token = req.params.access_token;
        res.end(await Post.select_by_id(post_id));
    }

    async select_category_by_id(req, res, next) {
        var post_id = req.params.post_id;
        var access_token = req.params.access_token;
        res.end(await Post.select_category_by_id(post_id));
    }

    async update(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var post_id = req.params.post_id;
            res.end(await Post.update(req.body, post_id));
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            var access_token = req.params.access_token;
            var author_id = await get_userid(access_token);
            res.end(await Post.create(req.body, author_id));
        } catch (err) {
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        var access_token = req.params.access_token;
        var post_id = req.params.post_id;
        res.end(await Post.delete_by_id(post_id));
    }
}

module.exports = new PostController();


