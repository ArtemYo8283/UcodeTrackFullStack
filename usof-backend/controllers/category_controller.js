const dbConnection  = require('../db.js');
const check_token = require('../utils/check_token.js');
const check_role = require('../utils/check_role.js');
const Category = require('../models/Category.js');

class CategoryController {
    async select_all(req, res, next)
    {
        var access_token = req.params.access_token;
        res.end(await Category.select_all());
    }
    
    async select_by_id(req, res, next)
    {
        var category_id = req.params.category_id;
        var access_token = req.params.access_token;
        res.end(await Category.select_by_id(category_id));
    }

    async update(req, res, next)
    {
        var access_token = req.params.access_token;
        var category_id = req.params.category_id;
    }

    async create(req, res, next)
    {
        try {
            var access_token = req.params.access_token;
            res.end(await Category.add(req.body));
        } catch (err) {
            next(err);
        }
    }

    async delete_by_id(req, res, next)
    {
        var access_token = req.params.access_token;
        var category_id = req.params.category_id;
        res.end(await Category.delete_by_id(category_id));
    }
}

module.exports = new CategoryController();