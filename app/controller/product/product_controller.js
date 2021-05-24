var express = require('express');
var router = express.Router();
const Product = require('./product_model');

const productCreatePath = '/product/create';
const productAllPath = '/product/all';

router.get(productAllPath, (request, response) => {

    Product.getAllProducts().then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

module.exports = {
    router,
};