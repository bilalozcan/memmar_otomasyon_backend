var Product = require('./models/product');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
})

router.route('/products').get((request, response) => {

    dboperations.getProducts().then(result => {
        console.log({'data': result[0], 'success' : true });
        // response.json(result[0]);
        response.json({'data': result[0], 'success' : true })
    })

})

// router.route('/orders/:id').get((request, response) => {

//     dboperations.getOrder(request.params.id).then(result => {
//         response.json(result[0]);
//     })

// })

// router.route('/orders').post((request, response) => {
//     // console.log(request);
//     console.log(request.body);

//     let book = { ...request.body }

//     dboperations.addOrder(book).then(result => {
//         response.status(201).json(result);
//     })
//     // response.status(201).json();

// })


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
