const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
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
}

module.exports = new CommentController();