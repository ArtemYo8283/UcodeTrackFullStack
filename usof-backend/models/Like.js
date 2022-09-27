const dbConnection  = require('../db.js');
const toSQLDate = require('js-date-to-sql-datetime');

class Like
{
	async select_post_like_by_id(id) {
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = false");
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
    }

	async select_comment_like_by_id(id) {
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = true");
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
    }

	async delete_post_like_by_id(id, author_id, user_role) {
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "DELETE FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = false";
			}
			else if(user_role == "user") {
				sql = "DELETE FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = false AND `author_id` = " + author_id;
			}
            const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async delete_comment_like_by_id(id, author_id, user_role) {
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "DELETE FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = true";
			}
			else if(user_role == "user") {
				sql = "DELETE FROM `like` WHERE `entityid` = " + id + " AND `post/comment` = true AND `author_id` = " + author_id;
			}
            const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}
    
	async create_post_like(post_id, author_id, body) {
        try {
            const [row1] = await dbConnection.execute("SELECT id, type FROM `like` WHERE `author_id` = " + author_id + " AND `entityid` = " + post_id);
            var type = body.type == 'true' ? true : false;
            if(row1[0] != null) {
                if(row1[0].type == type) {
                    const [row] = await dbConnection.execute("DELETE FROM `like` WHERE id = " + row1[0].id);
                }
                else {
                    const [row] = await dbConnection.execute("UPDATE `like` SET `publish_date` = '" + toSQLDate(Date.now()) + "', `type` = " + body.type + " WHERE `id` = " + row1[0].id);
                }
            }
            else {
                const [row] = await dbConnection.execute("INSERT INTO `like` (`author_id`, `publish_date`, `post/comment`, `entityid`, `type`) VALUES( " + author_id + ", '" + toSQLDate(Date.now()) + "', false, " + post_id + ", " + body.type + ")");
            }
        } catch (e) {
            console.log(e);
        }
	}
        
	async create_comment_like(comment_id, author_id, body) {
        try {
            const [row1] = await dbConnection.execute("SELECT id, type FROM `like` WHERE `author_id` = " + author_id + " AND `entityid` = " + comment_id);
            var type = body.type == 'true' ? true : false;
            if(row1[0] != null) {
                if(row1[0].type == type) {
                    const [row] = await dbConnection.execute("DELETE FROM `like` WHERE id = " + row1[0].id);
                }
                else {
                    const [row] = await dbConnection.execute("UPDATE `like` SET `publish_date` = '" + toSQLDate(Date.now()) + "', `type` = " + body.type + " WHERE `id` = " + row1[0].id);
                }
            }
            else {
                const [row] = await dbConnection.execute("INSERT INTO `like` (`author_id`, `publish_date`, `post/comment`, `entityid`, `type`) VALUES( " + author_id + ", '" + toSQLDate(Date.now()) + "', false, " + comment_id + ", " + body.type + ")");
            }
        } catch (e) {
            console.log(e);
        }
	}
}

module.exports = new Like();

