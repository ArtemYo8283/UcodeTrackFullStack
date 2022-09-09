const db = require('../db.js');

class Like
{
	constructor(author, date, postid, commentid, type)
	{
		this.id = 0;
		this.author = author;
        this.date = date;
        this.postid = postid;
        this.commentid = commentid;
        this.type = type;
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