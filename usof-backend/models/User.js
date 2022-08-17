import { pool } from './db.js';

export default class User
{
	constructor(login, password, fullName, email, profilepic, rating, role)
	{
		this.id = 0;
		this.login = login;
        this.password = password;
		this.fullName = fullName;
		this.email = email;
		this.profilepic = profilepic;
		this.rating = rating;
		this.role = role;
	}

	async find(value)
	{

	}

	async save()
	{

	}

	async delete()
	{

	}
}