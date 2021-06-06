const express = require('express');
const Product = require('../models/Product');
const ProductService = require('../services/ProductService');
const ProductController = require('../controllers/ProductController');
const multer = require('multer');

const router = express.Router();
const productService = new ProductService(Product);
const productController = new ProductController(productService);
const upload = multer({ dest: 'public/images/products' });

module.exports = (app) => {
    app.use('/product', router);

    router.route('/')
        .get(async (req, res, next) => await productController.index(req, res, next))
        .post(
            upload.fields([
                { name: 'images', maxCount: 12 }, 
                { name: 'thumbnail', maxCount: 1 }
            ]), 
            async (req, res, next) => await productController.create(req, res, next)
        )
        .put(
            upload.fields([
                { name: 'images', maxCount: 12 }, 
                { name: 'thumbnail', maxCount: 1 }
            ]), 
            async (req, res, next) => await productController.update(req, res, next)
        )
        .delete(async (req, res, next) => await productController.delete(req, res, next));

    router.get(
        '/show/:id', 
        async (req, res, next) => await productController.show(req, res, next)
    );
}