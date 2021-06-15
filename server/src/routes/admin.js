const express = require('express');

const AdminController = require('../controllers/AdminController');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const AdminService = require('../services/AdminService');

const router = express.Router();
const adminService = new AdminService(User, Transaction);
const adminController = new AdminController(adminService);

module.exports = (app) => {
    app.use('/admin', router);

    router.put('/transaction/verify', async (req, res, next) => await adminController.editTransactionVerification(req, res, next));

    router.delete('/transaction/delete', async (req, res, next) => await adminController.deleteTransaction(req, res, next));
}