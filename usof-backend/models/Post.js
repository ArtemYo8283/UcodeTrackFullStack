const dbConnection  = require('../db.js');
const toSQLDate = require('js-date-to-sql-datetime');

class Post
{

	async select_all()
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `post`");
            const jsonContent = JSON.stringify(row);
			return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async select_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `post` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async create(body, author_id)
	{
        try {
            const categoriesIds = body.categoriesIds.split(", ");
            const date = toSQLDate(Date.now());
            const [row] = await dbConnection.execute("INSERT INTO `post` (`author_id`, `title`, `publish_date`, `content`) VALUES (" + author_id + ", '" + body.title + "', '" + date + "', '" + body.content + "')");
            const [row1] = await dbConnection.execute("SELECT `id` FROM `post` WHERE `author_id` = " + author_id + " AND `title` = '" + body.title + "'AND `publish_date` = '" + date + "'AND `content` = '" + body.content + "' ");
            const id = row1[0].id;
            categoriesIds.forEach(async (element) => {
                const [row2] = await dbConnection.execute("INSERT INTO `postcategory` (`idPost`, `idCategory`) VALUES (" + id + ", " + element + ")");
            });
			const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async select_category_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("SELECT title FROM category INNER JOIN postcategory ON category.id = postcategory.idCategory WHERE idPost = " + id);
			const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async delete_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("DELETE FROM `post` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}
}

module.exports = new Post();

