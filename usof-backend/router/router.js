const express = require('express');
const router = express.Router();
const db = require('../db.js');
const { check, validationResult } = require('express-validator');

const postcontroller = require('../controllers/posts_controller.js');
const usercontroller = require('../controllers/user_controller.js');
const likecontroller = require('../controllers/like_controller.js');
const commentcontroller = require('../controllers/comment_controller.js');
const categorycontroller = require('../controllers/category_controller.js');
const authcontroller = require('../controllers/auth_controller.js');

//authorization
router.post('/auth/register', 
    check('password', 'Password length should be more than 8 characters').isLength({ min: 8}),
    check('login', 'Login length should be 6 to 24 characters').isLength({ min: 6, max: 24}),
    check('email', 'Incorrect email format').isEmail(),
    authcontroller.register);
router.post('/auth/login',
    check('login', 'Login length should be 6 to 24 characters').isLength({ min: 6, max: 24}),
    check('password', 'Password length should be more than 8 characters').isLength({ min: 8}),
    authcontroller.login);
router.post('/auth/logout/:access_token', authcontroller.logout);
router.post('/auth/password-reset',
    check('email', 'Incorrect email format').isEmail(),
    authcontroller.password_reset);
router.post('/auth/password-reset/:confirm_token', authcontroller.password_reset_second);
router.get('/auth/activate/:confirm_token', authcontroller.activate);

//user
router.get('/users/:access_token', usercontroller.select_all);
router.get('/users/:user_id/:access_token', usercontroller.select_by_id);
router.post('/users/:access_token',
    check('password', 'Password length should be more than 8 characters').isLength({ min: 8}),
    check('login', 'Login length should be 6 to 24 characters').isLength({ min: 6, max: 24}),
    check('email', 'Incorrect email format').isEmail(),
    usercontroller.create);
router.patch('/users/avatar/:access_token', usercontroller.update_avatar);
router.patch('/users/:user_id/:access_token', usercontroller.update);
router.delete('/users/:user_id/:access_token', usercontroller.delete_by_id);

//post
router.get('/posts/:access_token', postcontroller.select_all);
router.get('/posts/:post_id/:access_token', postcontroller.select_by_id);
router.get('/posts/:post_id/comments', commentcontroller.select_by_postid);
router.post('/posts/:post_id/comments/:access_token', commentcontroller.create);
router.get('/posts/:post_id/categories/:access_token', postcontroller.select_category_by_id);
router.get('/posts/:post_id/like/:access_token', likecontroller.select_post_like_by_id);
router.post('/posts/:access_token', postcontroller.create);
router.post('/posts/:post_id/like/:access_token', likecontroller.create_post_like);
router.patch('/posts/:post_id/:access_token', postcontroller.update);
router.delete('/posts/:post_id/:access_token', postcontroller.delete_by_id);
router.delete('/posts/:post_id/like/:access_token', likecontroller.delete_post_like_by_id);

//category
router.get('/categories/:access_token', categorycontroller.select_all);
router.get('/categories/:category_id/:access_token', categorycontroller.select_by_id);
router.get('/categories/:category_id/posts/:access_token', categorycontroller.select_posts_by_category);
router.post('/categories/:access_token', categorycontroller.create);
router.patch('/categories/:category_id/:access_token', categorycontroller.update);
router.delete('/categories/:category_id/:access_token', categorycontroller.delete_by_id);

//comments
router.get('/comments/:comment_id/:access_token', commentcontroller.select_by_id);
router.get('/comments/:comment_id/like/:access_token', likecontroller.select_comment_like_by_id);
router.post('/comments/:comment_id/like/:access_token', likecontroller.create_comment_like);
router.patch('/comments/:comment_id/:access_token', commentcontroller.update);
router.delete('/comments/:comment_id/:access_token', commentcontroller.delete_by_id);
router.delete('/comments/:comment_id/like/:access_token', likecontroller.delete_comment_like_by_id);

module.exports = router;

