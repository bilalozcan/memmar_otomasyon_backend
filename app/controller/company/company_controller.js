var express = require('express');
var router = express.Router();
const Company = require('./company_model');

const companyCreatePath = '/company/create';
const companyListPath = '/company/list';
const companyUpdatePath = '/company/update';

router.post(companyCreatePath, (request, response) => {
    let company = { ...request.body };
    Company.createCompany(company).then(result => {
        console.log(result);
        response.status(200).json({ 'data': { 'company': result[0][0], 'user': result[1][0] }, 'success': true });
    });
});

router.get(companyListPath, (request, response) => {
    Company.getCompany(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});

router.put(companyUpdatePath, (request, response) => {
    let company = { ...request.body };
    Company.updateCompany(company).then(result => {
        response.status(200).json({ 'data': result[0][0], 'success': true });
    })
})

module.exports = {
    router,
};