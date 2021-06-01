var express = require('express');
var router = express.Router();
const Product = require('./product_model');

const productCreatePath = '/product/create';
const productAllPath = '/product/all';
const productListPath = '/product/list';
const productUpdatePath = '/product/update';
const productDeletePath = '/product/delete';

router.get(productAllPath, (request, response) => {
    Product.getAllProducts().then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

router.get(productListPath, (request, response) => {
    Product.getQueryProducts(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

router.post(productCreatePath, (request, response) => {
    let product = { ...request.body };
    Product.createProduct(product).then(result => {
        response.status(200).json({ 'data': result[0][0], 'success': true });
    });
})
router.put(productUpdatePath, (request, response) => {
    let product = { ...request.body };
    Product.updateProduct(product).then(result => {
        response.status(200).json({ 'data': result[0][0], 'success': true });
    })
})

router.delete(productDeletePath, (request, response) => {
    let product = { ...request.body };
    Product.deleteProduct(product).then(result => {
        response.status(200).json({ 'data': 'deleted', 'success': true });
    })
})

module.exports = {
    router,
};