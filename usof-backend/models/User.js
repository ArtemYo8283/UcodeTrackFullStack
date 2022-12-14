const dbConnection  = require('../db.js');
const hash_password = require('../utils/hash_password.js');
const token_service = require('../utils/token_service.js');
const upload_Avatar_Image = require('../utils/upload_Avatar_Image.js');

class User {
	async select_all(user_role)
	{
        try {
			var sql = "";
			if(user_role == "admin") {
				sql = "SELECT * FROM `user`";
			}
			else {
				sql = "SELECT `user`.`id`, `user`.`login`, `user`.`full_name`, `user`.`email`, `user`.`profile_pic`, `user`.`rating`, `role`.title FROM `user`, `role` WHERE `role`.id = `user`.role_id";
			}
            const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
			return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async select_userdata(login)
	{
        try {
			var sql = "SELECT `user`.id, `user`.login, `role`.title FROM user, role WHERE `user`.login = '" + login + "' AND `role`.id = `user`.role_id";
            const [row] = await dbConnection.execute(sql);
			return row;
        } catch (e) {
            console.log(e);
        }
	}

	async select_by_id(id, user_role)
	{
        try {
			var sql = "";
			if(user_role == "admin") {
				sql = "SELECT * FROM `user` WHERE id = " + id;
			}
			else {
				sql = "SELECT `user`.`id`, `user`.`login`, `user`.`full_name`, `user`.`email`, `user`.`profile_pic`, `user`.`rating`, `role`.title FROM `user`, `role` WHERE `role`.id = `user`.role_id AND `user`.`id` = " + id;
			}
			const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

	async add(body, user_role)
	{
        try {
			const password = await hash_password(body.password);
			const token = token_service.generateTokens({user: body.login});
			var sql = "";
			if(user_role == "admin") {
				sql = "INSERT INTO `user`(`login`,`password`,`full_name`,`email`,`profile_pic`,`rating`,`token`,`role_id`) VALUES ('" 
				+ body.login + "', '"
				+ password + "', '"
				+ body.full_name + "', '"
				+ body.email + "', '"
				+ body.profilepic + "', '"
				+ body.rating + "', '"
				+ token + "', "
				+ body.role_id + ")";
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

	async update(body, user_id, user_role)
	{
		try {
			var sql = "";
			if(user_role == "admin") {
				sql = "UPDATE `user` SET `full_name` = '" + body.full_name + "' WHERE id = " + user_id;
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

	async update_avatar(path, user_role, user_id)
	{
        try {
			var sql = "UPDATE `user` SET `profile_pic` = '" + path + "' WHERE id = " + user_id;
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
				sql = "DELETE FROM `user` WHERE id = " + id;
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

module.exports = new User();

