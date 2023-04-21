const express = require('express');
const appRoute = express.Router();
const appController = require('../controllers/appControler');
const Authentication = require('../middleware/auth')


appRoute.get("/",Authentication.auth,appController.home);
appRoute.get("/about",Authentication.auth,appController.about);



module.exports = appRoute;