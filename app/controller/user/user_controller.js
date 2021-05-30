var express = require('express');
var router = express.Router();
const User = require('./user_model');

const loginUserPath = '/user/login';
const createUserPath = '/user/create';
const listUserPath = '/user/list';

router.post(createUserPath, (request, response) => {
    let user = { ...request.body };
    User.createUser(user).then(result => {
        response.status(200).json({ 'data': result[0][0], 'success': true });
    });
});

router.post(loginUserPath, (request, response) => {
    let body = { ...request.body };
    console.log('BODY: ' + body);
    User.loginUser(body.email, body.password).then(result => {
        if (result != null) {
            response.status(200).json({ 'data':  result[0][0], 'success': true });
        }
        else {
            response.status(200).json({ 'data': null, 'success': false });
        }
    });
});

router.get(listUserPath, (request, response) => {

    User.getUsers(request.query).then(result => {
        response.json({ 'data': result[0], 'success': true });
    });
});



module.exports = {
    router,
};