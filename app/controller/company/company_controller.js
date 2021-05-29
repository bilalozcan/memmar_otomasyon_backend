var express = require('express');
var router = express.Router();
const Company = require('./company_model');

const createCompany = '/company/create';

router.post(createCompany, (request, response) => {
    let company = { ...request.body };
    Company.createCompany(company).then(result => {
        console.log(result);
        response.status(200).json({ 'data': { 'company': result[0][0], 'user': result[1][0] }, 'success': true });
    });
});

module.exports = {
    router,
};