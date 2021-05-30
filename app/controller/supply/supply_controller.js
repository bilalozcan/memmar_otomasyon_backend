var express = require('express');
var router = express.Router();
const Supply = require('./supply_model');

const supplyListPath = '/supply/list';

router.get(supplyListPath, (request, response) => {
    Supply.getQuerySupply(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

module.exports = {
    router,
};