const config = require('../../db_config');
const sql = require('mssql');


async function createReceipt(receipt) {
    console.log('createReceipt fonksiyonu çalıştı')

    try {
        let pool = await sql.connect(config);
        let insertReceipt = await pool.request()
            .input('createdDate', sql.DateTime, receipt.createdDate)
            .input('createdUser', sql.Int, receipt.createdUser)
            .input('paymentType', sql.Int, receipt.paymentType)
            .input('totalSales', sql.Int, receipt.totalSales)
            .input('totalAmount', sql.Real, receipt.totalAmount)
            .input('companyId', sql.Int,receipt.companyId)
            .execute('addReceipt');
        //let x = await insertReceipt.recordset
        receiptId = insertReceipt.recordsets[0][0]['id'];
        salesList = [];
        for (let i = 0; i < receipt.salesList.length; i++) {
            //console.log(receipt.salesList[i]);
            let insertSales = await pool.request()
            .input('productId', sql.Int, receipt.salesList[i].productId)
            .input('userId', sql.Int, receipt.salesList[i].userId)
            .input('updateDate', sql.DateTime, receipt.salesList[i].createdDate)
            .input('quantity', sql.Int, receipt.salesList[i].quantity)
            .input('receiptId', sql.Real, receiptId)
            .execute('addSales');
            salesList.push(insertSales.recordsets[0][0]);
        }
        insertReceipt.recordsets[0][0]['salesList'] = salesList;
        //console.log(insertReceipt.recordsets[0][0]['id']);
        return insertReceipt.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

async function getQueryReceipt(query) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('createdDate', sql.DateTime, query.createdDate)
            .input('createdUser', sql.Int, query.createdUser)
            .input('companyId', sql.Int, query.companyId)
            .query("SELECT * FROM receipt WHERE companyId = @companyId AND (name LIKE @searchValue OR barcode LIKE @searchValue)");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createReceipt: createReceipt
    
}