var express = require('express');
var bodyParser = require('body-parser');
//var cors = require('cors');
var app = express();

const UserController = require('./controller/user/user_controller');
const ProductController = require('./controller/product/product_controller');
const CompanyController = require('./controller/company/company_controller');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());

app.use(UserController.router);
app.use(ProductController.router);
app.use(CompanyController.router);

const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`Server Started at Port ${port} => http://localhost:${port}`);
    console.log(Date());
});