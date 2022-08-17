import { pool } from './db.js';

export default class Category
{
	constructor(title, description)
	{
		this.id = 0;
		this.title = title;
        this.description = description;
	}

	async find(value)
	{

	}

	async save()
	{

	}

	delete()
	{

	}
}