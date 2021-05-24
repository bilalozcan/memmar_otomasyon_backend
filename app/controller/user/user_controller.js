var express = require('express');
var router = express.Router();
const User = require('./user_model');

const loginPath = '/user/login';
const createPath = '/user/create';

router.post(createPath, (request, response) => {
    let user = { ...request.body };
    User.createUser(user).then(result => {
        response.status(201).json({ 'data': result[0][0], 'success': true });
    });
});

router.post(loginPath, (request, response) => {
    let body = { ...request.body };
    
});



module.exports = {
    router,
};