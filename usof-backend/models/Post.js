const db = require('../db.js');

class Post
{
	constructor(author, title, date, status, content, categories)
	{
		this.id = 0;
		this.author = author;
        this.title = title;
		this.date = date;
		this.status = status;
		this.content = content;
		this.categories = categories;
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

module.exports = Post;