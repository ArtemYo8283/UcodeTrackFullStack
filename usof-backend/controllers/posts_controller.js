const dbConnection  = require('../db.js');
const Post_class = require('../models/Post.js');

class PostController {
    async post_select_all(req, res, next)
    {
        var access_token = req.query.access_token;
        var role = "None"
        if(access_token == "" || access_token === undefined)
        {
            res.status(401).end('Unauthorized: Required token');
        }
        try {
            const [row] = await dbConnection.execute("SELECT title, token FROM user INNER JOIN role ON user.role_id = role.id");
            row.forEach((element) => {
                if(element.token == access_token)
                {
                    role = element.role;
                }
            })
        } catch (e) {
            next(e);
        }

        if(role == "None")
        {
            res.status(401).end('Unauthorized: Invalid token');
        }

        try {
            console.log(access_token);
            const [row] = await dbConnection.execute("SELECT * FROM `role`");
            console.log(row);
            const jsonContent = JSON.stringify(row);
            res.end(jsonContent);
        } catch (e) {
            next(e);
        }
    }

    async post_delete(req, res)
    {
        res.status(404).send('123');
    }
}

module.exports = PostController;
