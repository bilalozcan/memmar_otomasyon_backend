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
    console.log('StartDate: '+query.startDate)
    console.log('EndDate: '+query.endDate)
    console.log('createdUser: '+query.createdUser)
    console.log('companyId: '+query.companyId)
    try {
        let pool = await sql.connect(config);
        if(query.companyId && query.startDate == null && query.endDate == null && query.createdUser == null){
            console.log('Şirkete ait tüm fişleri görüntüleme')
            let products = await pool.request()
                .input('companyId', sql.Int, query.companyId)
                .query("SELECT * FROM receipt WHERE companyId = @companyId");
            return products.recordsets;
        }else if(query.companyId && query.startDate && query.endDate && query.createdUser == null){
            console.log('Şirkete ait belirli zamandaki fişleri görüntüleme')
            let products = await pool.request()
                .input('companyId', sql.Int, query.companyId)
                .input('startDate', sql.DateTime, query.startDate)
                .input('endDate', sql.DateTime, query.endDate)
                .query("SELECT * FROM receipt WHERE companyId = @companyId and createdDate BETWEEN @startDate AND @endDate");
            return products.recordsets;
        }else if(query.companyId == null && query.startDate && query.endDate && query.createdUser){
            console.log('Kullanıcıya ait belirli zamandaki fişleri görüntüleme')
            let products = await pool.request()
                .input('startDate', sql.DateTime, query.startDate)
                .input('endDate', sql.DateTime, query.endDate)
                .input('createdUser', sql.Int, query.createdUser)
                .query("SELECT * FROM receipt WHERE createdUser = @createdUser and createdDate BETWEEN @startDate AND @endDate");
            return products.recordsets;
        }else if(query.companyId == null && query.startDate == null && query.endDate == null && query.createdUser){
            console.log('Kullanıcıya ait tüm fişleri görüntüleme')
            let products = await pool.request()
                .input('createdUser', sql.Int, query.createdUser)
                .query("SELECT * FROM receipt WHERE createdUser = @createdUser");
            return products.recordsets;
        }else if(query.companyId == null && query.startDate == null && query.endDate == null && query.createdUser == null){
            console.log('Tüm fişleri görüntüleme')
            let products = await pool.request()
                .query("SELECT * FROM receipt");
                return products.recordsets;
        }else{
            return [null];
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createReceipt: createReceipt,
    getQueryReceipt: getQueryReceipt,
    
}