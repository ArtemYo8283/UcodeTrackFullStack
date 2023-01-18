import express from 'express'

import UserController from '../controller/UserController.js'
import RoleController from '../controller/RoleController.js'
import AuthController from '../controller/AuthController.js'

import upload_Avatar_Image from '../utils/upload_Avatar_Image.js';

const router = express.Router();


//auth
router.post('/auth/register', AuthController.register);                                                         //Register
router.post('/auth/login', AuthController.login);                                                               //Login
router.post('/auth/logout/:token', AuthController.logout);                                                      //Logout
router.get('/auth/active/:token', AuthController.activeEmail);                                                  //Activate email and user add

//users
router.get('/users', UserController.select_all);
router.get('/users/:user_id', UserController.select_by_id);
router.get('/users/check-token/:token', UserController.checkToken);
router.post('/users', UserController.create);
router.patch('/users/avatar/:token', upload_Avatar_Image.single('image'), UserController.update_avatar);        //User avatar add
router.delete('/users/:user_id', UserController.delete_by_id);
router.patch('/users/:user_id/:token', UserController.update);

//roles
router.get('/roles', RoleController.select_all);
router.get('/roles/:role_id', RoleController.select_by_id);
router.post('/roles', RoleController.create);
router.delete('/roles/:role_id', RoleController.delete_by_id);


export default router;