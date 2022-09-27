const dbConnection  = require('../db.js');
const toSQLDate = require('js-date-to-sql-datetime');

class Comment
{
	async select_by_id(id, user_role)
	{
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "SELECT * FROM `comment` WHERE id = " + id;
			}
			else if(user_role == "user") {
				return 403;
			}
            const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async select_by_postid(post_id)
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `comment` WHERE postid = " + post_id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async update(body, comment_id, user_role, author_id)
	{
		try {
            var sql = "";
			if(user_role == "admin") {
				sql = "UPDATE `comment` SET `content` = '" + body.content + "' WHERE id = " + comment_id;
			}
			else if(user_role == "user") {
				sql = "UPDATE `comment` SET `content` = '" + body.content + "' WHERE id = " + comment_id + " author_id = " + author_id;
			}
            const [row] = await dbConnection.execute(sql);
			const jsonContent = JSON.stringify(row);
            return jsonContent;
		} catch (e) {
			console.log(e);
		}
	}

    async create(post_id, author_id, body, user_role)
    {
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "INSERT INTO `comment` (`author_id`, `publish_date`, `content`, `postid`) VALUES (" + author_id + ", '" + toSQLDate(Date.now()) + "', '" + body.content + "', " + post_id + ")";
			}
			else if(user_role == "user") {
				sql = "INSERT INTO `comment` (`author_id`, `publish_date`, `content`, `postid`) VALUES (" + author_id + ", '" + toSQLDate(Date.now()) + "', '" + body.content + "', " + post_id + ")";//
			}
            const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
    }

    async delete_by_id(id, user_role, author_id)
	{
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "DELETE FROM `comment` WHERE id = " + id;
			}
			else if(user_role == "user") {
				sql = "DELETE FROM `comment` WHERE id = " + id + " author_id = " + author_id;
			}
            const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}
}

module.exports = new Comment();
