const express = require('express');
const router = express.Router();
const db = require('../db.js');

const postcontroller = require('../controllers/posts_controller.js');
const usercontroller = require('../controllers/user_controller.js');
const likecontroller = require('../controllers/like_controller.js');
const commentcontroller = require('../controllers/comment_controller.js');
const categorycontroller = require('../controllers/category_controller.js');
const authcontroller = require('../controllers/auth_controller.js');

//authorization
router.post('/auth/register', authcontroller.register);
router.post('/auth/login', authcontroller.login);
router.post('/auth/logout/:access_token', authcontroller.logout);
router.post('/auth/password-reset', authcontroller.password_reset);
router.post('/auth/password-reset/:confirm_token', authcontroller.password_reset_second);

//user
router.get('/users/:access_token', usercontroller.select_all);
router.get('/users/:user_id/:access_token', usercontroller.select_by_id);
router.post('/users/:access_token', usercontroller.create);
router.patch('/users/avatar/:access_token', usercontroller.update_avatar);
router.patch('/users/:user_id/:access_token', usercontroller.update);
router.delete('/users/:user_id/:access_token', usercontroller.delete_by_id);

//post
router.get('/posts/:access_token', postcontroller.select_all);

router.get('/posts/:post_id/:access_token', postcontroller.select_by_id);

router.post('/posts/:post_id/comments/:access_token');

router.get('/posts/:post_id/categories/:access_token');

router.get('/posts/:post_id/like/:access_token');

router.post('/posts/:access_token', postcontroller.create);

router.post('/posts/:post_id/like/:access_token');

router.patch('/posts/:access_token');


router.delete('/posts/:post_id/:access_token', postcontroller.delete_by_id);

router.delete('/posts/:post_id/like/:access_token', likecontroller.delete_post_like_id);

//category
router.get('/categories/:access_token', categorycontroller.select_all);

router.get('/categories/:category_id/:access_token', categorycontroller.select_by_id);

router.get('/categories/:category_id/posts/:access_token');

router.post('/categories/:access_token', categorycontroller.create);

router.patch('/categories/:category_id/:access_token');

router.delete('/categories/:category_id/:access_token', categorycontroller.delete_by_id);

//comments
router.get('/comments/:comment_id/:access_token', commentcontroller.select_by_id);

router.get('/comments/:comment_id/like/:access_token');

router.post('/comments/:comment_id/like/:access_token');

router.patch('/comments/:comment_id/:access_token');

router.delete('/comments/:comment_id/:access_token', commentcontroller.delete_by_id);

router.delete('/comments/:comment_id/like/:access_token', likecontroller.delete_comment_like_id);

module.exports = router;

