var express = require('express');
var router = express.Router();
const Product = require('./product_model');

const productCreatePath = '/product/create';
const productAllPath = '/product/all';

router.get(productAllPath, (request, response) => {
   
    request.query
    Product.getAllProducts().then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});
router.post(productCreatePath,(request, response) => {
    let product = { ...request.body };
    Product.createProduct(product).then(result => {
        response.status(200).json({ 'data': result[0][0], 'success': true });
    });
})

module.exports = {
    router,
};