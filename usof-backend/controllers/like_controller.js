const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Like = require('../models/Like.js');

class LikeController {

	async select_post_like_by_id(req, res, next) {
        var access_token = req.params.access_token;
        var post_id = req.params.post_id;
        res.end(await Like.select_post_like_by_id(post_id));
	}

	async select_comment_like_by_id(req, res, next) {
        var access_token = req.params.access_token;
        var comment_id = req.params.comment_id;
        res.end(await Like.select_comment_like_by_id(comment_id));
	}

	async delete_post_like_by_id(req, res, next) {
        var access_token = req.params.access_token;
        var post_id = req.params.post_id;
        var author_id = await get_userid(access_token);
        res.end(await Like.delete_post_like_by_id(post_id, author_id));
	}

    async delete_comment_like_by_id(req, res, next) {
        var access_token = req.params.access_token;
        var comment_id = req.params.comment_id;
        var author_id = await get_userid(access_token);
        res.end(await Like.delete_comment_like_by_id(comment_id, author_id));
	}
        
    async create_post_like(req, res, next) {
        var access_token = req.params.access_token;
        var author_id = await get_userid(access_token);
        var post_id = req.params.post_id;
        res.end(await Like.create_post_like(post_id, author_id, req.body));
    }

	async create_comment_like(req, res, next) {
        var access_token = req.params.access_token;
        var author_id = await get_userid(access_token);
        var comment_id = req.params.comment_id;
        res.end(await Like.create_comment_like(comment_id, author_id, req.body));
    }
}

module.exports = new LikeController();


