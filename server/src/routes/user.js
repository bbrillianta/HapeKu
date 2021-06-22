const express = require('express');
const upload = require('../startups/multer').transactions;

const User = require('../models/User');
const Transaction = require('../models/Transaction');
const CartService = require('../services/CartService');
const PaymentService = require('../services/PaymentService');
const UserController = require('../controllers/UserController');
const NotificationService = require('../services/NotificationService');

const router = express.Router();
const cartService = new CartService(User);
const paymentService = new PaymentService(User, Transaction);
const notificationService = new NotificationService(User);
const userController = new UserController(cartService, paymentService, notificationService);

module.exports = (app) => {
    app.use('/user', router);

    

    router.route('/cart')
        .get(async (req, res, next) => await userController.indexCartItem(req, res, next))
        .post(async (req, res, next) => await userController.createCartItem(req, res, next))
        .put(async (req, res, next) => await userController.updateCartItem(req, res, next))
        .delete(async (req, res, next) => await userController.deleteCartItem(req, res, next));

    router.route('/checkout')
        .get(async (req, res, next) => await userController.indexCheckoutItems(req, res, next))
    
    router.route('/payment/unpaid')
        .get(async (req, res, next) => await userController.indexUnpaidItems(req, res, next))
        .post(async (req, res, next) => await userController.createUnpaidItem(req, res, next))
        .delete(async (req, res, next) => await userController.deleteUnpaidItem(req, res, next));
    
    router.route('/payment/paid')
        .get(async (req, res, next) => await userController.indexTransactions(req, res, next))
        .post(
            upload.single('verificationImage'),
            async (req, res, next) => await userController.createTransaction(req, res, next)
        )
    
    router.route('/notifications')
        .get(async (req, res, next) => await userController.indexNotifications(req, res, next));

}