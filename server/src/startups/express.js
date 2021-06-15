const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use('/public/images/products', express.static('public/images/products'));
    app.use('/public/images/transactions', express.static('public/images/transactions'));
}