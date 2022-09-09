const db = require('../db.js');

class Category
{
	constructor(title, description)
	{
		this.id = 0;
		this.title = title;
        this.description = description;
	}

	async save()
	{

	}

	delete()
	{

	}
}