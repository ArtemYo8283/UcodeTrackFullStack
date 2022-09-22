const dbConnection  = require('../db.js');

class Like
{
	// constructor(author, date, postid, commentid, type)
	// {
	// 	this.id = 0;
	// 	this.author = author;
    //     this.date = date;
    //     this.postid = postid;
    //     this.commentid = commentid;
    //     this.type = type;
	// }
	async delete_post_like_id(id, author_id)
	{
        try {
            const [row] = await dbConnection.execute("DELETE FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = false AND `author_id` = " + author_id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async delete_comment_like_id(id, author_id)
	{
        try {
            const [row] = await dbConnection.execute("DELETE FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = true AND `author_id` = " + author_id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}
}

module.exports = new Like();

