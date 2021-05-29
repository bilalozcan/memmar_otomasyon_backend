var express = require('express');
var router = express.Router();
const User = require('./user_model');

const loginPath = '/user/login';
const createPath = '/user/create';

router.post(createPath, (request, response) => {
    let user = { ...request.body };
    User.createUser(user).then(result => {
        response.status(200).json({ 'data': result[0][0], 'success': true });
    });
});

router.post(loginPath, (request, response) => {
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



module.exports = {
    router,
};