const express = require('express');
const router = express.Router();
const db = require('../db.js');
const PostController = require('../controllers/posts_controller.js');

const postcontroller = new PostController();
//authorization



//user

//post
router.get('/posts', postcontroller.post_select_all);
router.delete('/posts', postcontroller.post_delete);

//category

//comment

//like


module.exports = router;

