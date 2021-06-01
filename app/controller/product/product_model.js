const config = require('../../db_config');
const sql = require('mssql');


async function getAllProducts() {

    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from product");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getQueryProducts(query) {
    console.log(query);
    console.log(query.companyId);
    console.log(query.searchValue);
    //'%' + query.searchValue + '%'
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('companyId', sql.Int, Number(query.companyId))
            .input('searchValue', sql.NVarChar, '%' + query.searchValue + '%')
            .query("SELECT * FROM product WHERE companyId = @companyId AND isActive = 1 AND (name LIKE @searchValue OR barcode LIKE @searchValue)");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function createProduct(product) {
    try {
        //console.log(product)
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('name', sql.NVarChar, product.name)
            .input('purchasePrice', sql.Real, product.purchasePrice)
            .input('stock', sql.Int, product.stock)
            .input('barcode', sql.NVarChar, product.barcode)
            .input('countryCode', sql.NVarChar, product.countryCode)
            .input('salePrice', sql.Real, product.salePrice)
            .input('productType', sql.Int, product.productType)
            .input('isActive', sql.Bit, product.isActive)
            .input('createdUser', sql.Int, product.createdUser)
            .input('createdDate', sql.DateTime, product.createdDate)
            .input('supplierld', sql.Int, product.supplierld)
            .input('sold', sql.Int, product.sold)
            .input('updateDate', sql.DateTime, product.updateDate)
            .input('companyId', sql.Int, product.companyId)
            .execute('addProduct');
            //console.log(insertProduct.recordsets[0][0]);
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

async function updateProduct(product) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('id', sql.Int, product.id)
            .input('name', sql.NVarChar, product.name)
            .input('purchasePrice', sql.Real, product.purchasePrice)
            .input('stock', sql.Int, product.stock)
            .input('remaining', sql.Int, product.remaining)
            .input('barcode', sql.NVarChar, product.barcode)
            .input('countryCode', sql.NVarChar, product.countryCode)
            .input('salePrice', sql.Real, product.salePrice)
            .input('productType', sql.Int, product.productType)
            .input('isActive', sql.Bit, product.isActive)
            .input('createdUser', sql.Int, product.createdUser)
            .input('createdDate', sql.DateTime, product.createdDate)
            .input('supplierld', sql.Int, product.supplierld)
            .input('sold', sql.Int, product.sold)
            .input('updateDate', sql.DateTime, product.updateDate)
            .input('companyId', sql.Int, product.companyId)
            .execute('updateProduct');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
async function deleteProduct(product) {
    try {
        let pool = await sql.connect(config);
        let deleteProduct = await pool.request()
            .input('id', sql.Int, product.id)
            .query('UPDATE product SET isActive = 0 WHERE id = @id');
        return deleteProduct.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}




module.exports = {
    getAllProducts: getAllProducts,
    createProduct: createProduct,
    updateProduct: updateProduct,
    getQueryProducts: getQueryProducts,
    deleteProduct: deleteProduct,
}