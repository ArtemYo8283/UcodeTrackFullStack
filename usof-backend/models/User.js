const dbConnection  = require('../db.js');
const hash_password = require('../utils/hash_password.js');
const token_service = require('../utils/token_service.js');
class User
{
	// constructor(login, password, fullName, email, profilepic, rating, role)
	// {
	// 	this.id = 0;
	// 	this.login = login;
    //     this.password = password;
	// 	this.fullName = fullName;
	// 	this.email = email;
	// 	this.profilepic = profilepic;
	// 	this.rating = rating;
	// 	this.role = role;
	// }

	async select_all()
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `user`");
            const jsonContent = JSON.stringify(row);
			return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async select_by_id(id)
	{
        try {
            const [row] = await dbConnection.execute("SELECT * FROM `user` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}

	async add(body)
	{
        try {
			const password = await hash_password(body.password);
			const token = token_service.generateTokens({user: body.login});
            const [row] = await dbConnection.execute("INSERT INTO `user`(`login`,`password`,`full_name`,`email`,`profile_pic`,`rating`,`token`,`role_id`) VALUES ('" 
			+ body.login + "', '"
			+ password + "', '"
			+ body.full_name + "', '"
			+ body.email + "', '"
			+ body.profilepic + "', '"
			+ body.rating + "', '"
			+ token + "', "
			+ body.role_id + ")");
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
            const [row] = await dbConnection.execute("DELETE FROM `user` WHERE id = " + id);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e.sqlMessage);
        }
	}
}

module.exports = new User();

