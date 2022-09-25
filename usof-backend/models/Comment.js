const dbConnection  = require('../db.js');
const toSQLDate = require('js-date-to-sql-datetime');

class Comment
{
	async select_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `comment` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async delete_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("DELETE FROM `comment` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

    async create(post_id, author_id, body)
    {
        try {
            const [row] = await dbConnection.execute("INSERT INTO `comment` (`author_id`, `publish_date`, `content`, `postid`) VALUES (" + author_id + ", '" + toSQLDate(Date.now()) + "', '" + body.content + "', " + post_id + ")");
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
    }
}

module.exports = new Comment();
