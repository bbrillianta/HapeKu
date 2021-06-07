const express = require('express');
const User = require('../models/User');
const CartService = require('../services/CartService');
const UserController = require('../controllers/UserController');

const router = express.Router();
const cartService = new CartService(User);
const userController = new UserController(cartService);

module.exports = (app) => {
    app.use('/user', router);

    router.route('/cart')
        .post(async (req, res, next) => await userController.addProductToCart(req, res, next))
        .put(async (req, res, next) => await userController.updateItemInCart(req, res, next))
        .delete(async (req, res, next) => await userController.removeItemFromCart(req, res, next));
}