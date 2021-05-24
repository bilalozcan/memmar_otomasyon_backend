const dboperations = require('./dboperations');

const UserController = require('./controller/user/user_controller');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('', router);

app.use(UserController.router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
})

router.route('/products').get((request, response) => {
    console.log(request.query);
    // dboperations.getProducts().then(result => {
    //     console.log({ 'data': result[0], 'success': true });
    //     // response.json(result[0]);
    //     response.json({ 'data': result[0], 'success': true })
    // })
    response.json({ 'bilal': true });
})

// Yeni kullanıcı oluşturma
router.post('/user', (request, response) => {
    let user = { ...request.body };

    dboperations.createUser(user).then(result => {
        response.status(201).json({ 'data': result[0][0], 'success': true });
    })
});




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
