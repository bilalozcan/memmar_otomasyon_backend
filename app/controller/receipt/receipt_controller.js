var express = require('express');
var router = express.Router();
const Receipt = require('./receipt_model');

const receiptCreatePath = '/receipt/create';
const receiptListPath = '/receipt/list';

router.post(receiptCreatePath, (request, response) => {
    console.log('post fonksiyonu çalıştı')
    let receipt = { ...request.body };
    Receipt.createReceipt(receipt).then(result => {

        response.status(200).json({ 'data': result[0][0], 'success': true });
    });
})

router.get(receiptListPath, (request, response) => {
    Receipt.getQueryReceipt(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

module.exports = {
    router,
};