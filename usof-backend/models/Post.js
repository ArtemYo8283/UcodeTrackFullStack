const dbConnection  = require('../db.js');

class Post
{
	// constructor(author, title, date, status, content, categories)
	// {
	// 	this.id = 0;
	// 	this.author = author;
    //     this.title = title;
	// 	this.date = date;
	// 	this.status = status;
	// 	this.content = content;
	// 	this.categories = categories;
	// }

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
            const [row] = await dbConnection.execute("DELETE FROM `post` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}
}

module.exports = new Post();