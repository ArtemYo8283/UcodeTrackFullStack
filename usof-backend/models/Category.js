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

	async add(body)
	{
        try {
            const [row] = await dbConnection.execute("");
			const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async update()
	{

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

