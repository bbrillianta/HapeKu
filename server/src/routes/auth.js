const express = require('express');
const AuthService = require('../services/AuthService');
const AuthController = require('../controllers/AuthController');
const User = require('../models/User');

const router = express.Router();

const authService = new AuthService(User);
const authController = new AuthController(authService);

module.exports = (app) => {
    app.use('/auth', router);

    router.post('/register', async (req, res, next) => await authController.register(req, res, next));

    router.post('/login', async (req, res, next) => await authController.login(req, res, next));
}