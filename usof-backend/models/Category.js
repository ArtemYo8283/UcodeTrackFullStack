const dbConnection  = require('../db.js');

class Category
{
	async select_all(user_role)
	{
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "SELECT * FROM `category`";
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

	async select_by_id(id, user_role)
	{
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "SELECT * FROM `category` WHERE id = " + id;
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

	async select_posts_by_category(id, user_role)
	{
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "SELECT * FROM post INNER JOIN postcategory ON post.id = postcategory.idPost WHERE idCategory = " + id;
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
    
	async create(body, user_role)
	{
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "INSERT INTO `category` (`title`, `description`) VALUES ( '" + body.title + "', '" + body.description + "');";
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

	async update(body, category_id, user_role)
	{
		try {
            var sql = "";
			if(user_role == "admin") {
				sql = "UPDATE `category` SET `title` = '" + body.title + "' , `description` = '" + body.description + "'  WHERE id = " + category_id;
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

	async delete_by_id(id, user_role)
	{
        try {
            var sql = "";
			if(user_role == "admin") {
				sql = "DELETE FROM `category` WHERE id = " + id;
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
}

module.exports = new Category();

