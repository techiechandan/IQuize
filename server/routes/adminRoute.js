const express = require('express');
const adminRoutes = express.Router();

const adminController = require('../controllers/adminController')
const Authentication = require('../middleware/adminAuth');
adminRoutes.post('/',adminController.Login);
adminRoutes.get('/dashboard',Authentication.Auth,adminController.Dashboard);
adminRoutes.get('/schedule-quiz',Authentication.Auth,adminController.ScheduleQuiz)


module.exports = adminRoutes;