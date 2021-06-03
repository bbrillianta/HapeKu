const express = require('express');
const Product = require('../models/Product');
const ProductService = require('../services/ProductService');
const ProductController = require('../controllers/ProductController');

const router = express.Router();
const productService = new ProductService(Product);
const productController = new ProductController(productService);

module.exports = (app) => {
    app.use('/product', router);

    router.get('/', async (req, res, next) => await productController.index(req, res, next));

    router.get('/show/:id', async (req, res, next) => await productController.show(req, res, next));

    router.post('/create', async (req, res, next) => await productController.create(req, res, next));

    router.put('/update', async (req, res, next) => await productController.update(req, res, next));

    router.delete('/delete', async (req, res, next) => await productController.delete(req, res, next));
}