var express = require('express');
var router = express.Router();
const User = require('./user_model');

const loginUserPath = '/user/login';
const createUserPath = '/user/create';
const listUserPath = '/user/list';
const updateInfoUserPath = '/user/update/info';
const updatePasswordUserPath = '/user/update/password';
const updateEmailUserPath = '/user/update/email';

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

router.put(updateInfoUserPath, (request, response) => {
    User.updateUserInfo(request.body).then(result => {
        response.json({ 'data': result[0][0], 'success': true });
    });
});


router.put(updatePasswordUserPath, (request, response) => {
    User.updateUserPassword(request.body).then(result => {
        if(result.length == 1){
            response.json({ 'data': result[0][0], 'success': true });
        }else{
            response.status(200).json({ 'data': null, 'success': false });
        }
    });
});

router.put(updateEmailUserPath, (request, response) => {
    User.updateUserEmail(request.body).then(result => {
        if(result.length == 1){
            response.json({ 'data': result[0][0], 'success': true });
        }else{
            response.status(200).json({ 'data': null, 'success': false });
        }
    });
});


module.exports = {
    router,
};