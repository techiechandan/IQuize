const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userControler');
const Authentication = require('../middleware/auth');

userRoute.get("/login",userController.Login);
userRoute.post("/login",userController.LoginUser);
userRoute.get("/register",userController.Register);
userRoute.post("/register",userController.RegisterUser);
userRoute.get("/contact",Authentication.auth, userController.Contact);
userRoute.post("/contact",userController.SaveContact);
userRoute.get("/quiz",Authentication.auth,userController.getQuiz);
userRoute.post("/quiz",userController.RenderQuiz);


module.exports= userRoute;