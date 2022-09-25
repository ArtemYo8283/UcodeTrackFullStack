const dbConnection  = require('../db.js');

class Category
{
	async select_all()
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `category`");
            const jsonContent = JSON.stringify(row);
			return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async select_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `category` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async select_posts_by_category(id)
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM post INNER JOIN postcategory ON post.id = postcategory.idPost WHERE idCategory = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}
    
	async create(body)
	{
        try {
            const [row] = await dbConnection.execute("INSERT INTO `category` (`title`, `description`) VALUES ( '" + body.title + "', '" + body.description + "');");
			const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async update(body, category_id)
	{
		try {
			const [row] = await dbConnection.execute("UPDATE `category` SET `title` = '" + body.title + "' , `description` = '" + body.description + "'  WHERE id = " + category_id);
			const jsonContent = JSON.stringify(row);
            return jsonContent;
		} catch (e) {
			console.log(e);
		}
	}

	async delete_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("DELETE FROM `category` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}
}

module.exports = new Category();

