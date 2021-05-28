const config = require('../../db_config');
const sql = require('mssql');


async function getAllProducts(query) {

    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from product");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function createProduct(product) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('companyId', sql.Int, product.companyId)
            .input('name', sql.NVarChar, product.name)
            .input('purchasePrice', sql.Real, product.purchasePrice)
            .input('stock', sql.Int, product.stock)
            .input('remaining', sql.Int, product.remaining)
            .input('barcode', sql.NVarChar, product.barcode)
            .input('countryCode', sql.NVarChar, product.countryCode)
            .input('salePrice', sql.Real, product.salePrice)
            .input('productType', sql.Int, product.productType)
            .input('isActive', sql.Int, product.isActive)
            .input('createdUser', sql.NVarChar, product.createdUser)
            .input('createdDate', sql.DateTime, product.createdDate)
            .input('supplierld', sql.Int, product.supplierld)
            .input('sold', sql.Int, product.sold)
            .input('updateDate', sql.DateTime, product.updateDate)
            .execute('addProduct');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    createProduct: createProduct,
}