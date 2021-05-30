var express = require('express');
var router = express.Router();
const Supplier = require('./supplier_model');

const supplierCreatePath = '/supplier/create';
const supplierListPath = '/supplier/list';

router.post(supplierCreatePath, (request, response) => {
    let supplier = { ...request.body };
    Supplier.createSupplier(supplier).then(result => {
        response.status(200).json({ 'data': result[0][0], 'success': true });
    });
})

router.get(supplierListPath, (request, response) => {
    Supplier.getAllSupplier().then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

module.exports = {
    router,
};