var express = require('express');
var bodyParser = require('body-parser');
//var cors = require('cors');
var app = express();

const UserController = require('./controller/user/user_controller');
const ProductController = require('./controller/product/product_controller');
const CompanyController = require('./controller/company/company_controller');
const ReceiptController = require('./controller/receipt/receipt_controller');
const SupplierController = require('./controller/supplier/supplier_controller');
const SupplyController = require('./controller/supply/supply_controller');
const StatisticController = require('./controller/statistics/statistic_controller');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());

app.use(UserController.router);
app.use(ProductController.router);
app.use(CompanyController.router);
app.use(ReceiptController.router);
app.use(SupplierController.router);
app.use(SupplyController.router);
app.use(StatisticController.router);


const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`Server Started at Port ${port} => http://localhost:${port}`);
    console.log(Date());
});