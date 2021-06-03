const express = require('express');
const User = require('../models/User');
const CartService = require('../services/CartService');
const UserController = require('../controllers/UserController');

const router = express.Router();
const cartService = new CartService(User);
const userController = new UserController(cartService);

module.exports = (app) => {
    app.use('/user', router);

    router.post('/cart/add', async (req, res, next) => await userController.addToCart(req, res, next));

    router.delete('/cart/remove', async (req, res, next) => await userController.removeFromCart(req, res, next));
}