import { pool } from './db.js';

export default class Comment
{
	constructor(author, date, content)
	{
		this.id = 0;
		this.author = author;
        this.date = date;
        this.content = content;
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