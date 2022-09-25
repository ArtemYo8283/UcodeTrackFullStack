const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const get_userid = require('../utils/get_userid.js');
const Comment = require('../models/Comment.js');

class CommentController {
    async select_by_id(req, res, next)
    {    
        var access_token = req.params.access_token;
        var comment_id = req.params.comment_id;
        res.end(await Comment.select_by_id(comment_id));
    }

    async delete_by_id(req, res, next)
    {
        var access_token = req.params.access_token;
        var comment_id = req.params.comment_id;
        res.end(await Comment.delete_by_id(comment_id));
    }

    async create(req, res, next)
    {
        var access_token = req.params.access_token;
        var author_id = await get_userid(access_token);
        var post_id = req.params.post_id;
        res.end(await Comment.create(post_id, author_id, req.body));
    }
}

module.exports = new CommentController();