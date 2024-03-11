const express = require('express');
const routes = express.Router();

const userController = require('../controller/user')

routes.post('/signup',userController.registeredUser);
routes.post('/login',userController.loginUser);


module.exports=routes;