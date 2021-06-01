const config = require('../../db_config');
const sql = require('mssql');


async function createReceipt(receipt) {
    console.log('createReceipt fonksiyonu çalıştı')
    console.log(receipt)
    try {
        let pool = await sql.connect(config);
        let insertReceipt = await pool.request()
            .input('createdDate', sql.DateTime, receipt.createdDate)
            .input('createdUser', sql.Int, receipt.createdUser)
            .input('paymentType', sql.Int, receipt.paymentType)
            .input('totalSales', sql.Int, receipt.totalSales)
            .input('totalAmount', sql.Real, receipt.totalAmount)
            .input('companyId', sql.Int, receipt.companyId)
            .execute('addReceipt');
        //let x = await insertReceipt.recordset
        console.log('receipt id: ' + insertReceipt.recordsets[0][0]['id']);
        receiptId = insertReceipt.recordsets[0][0]['id'];
        salesList = [];
        for (let i = 0; i < receipt.salesList.length; i++) {
            console.log(receipt.salesList[i]);
            console.log(receipt.salesList[i].quantity);
            let insertSales = await pool.request()
                .input('productId', sql.Int, receipt.salesList[i].productId)
                .input('userId', sql.Int, receipt.salesList[i].userId)
                .input('updateDate', sql.DateTime, receipt.salesList[i].createdDate)
                .input('quantity', sql.Int, receipt.salesList[i].quantity)
                .input('receiptId', sql.Int, receiptId)
                .execute('addSales');
                console.log(insertSales)
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
        if (query.companyId && query.startDate == null && query.endDate == null && query.createdUser == null) {
            console.log('Şirkete ait tüm fişleri görüntüleme')
            let receipts = await pool.request()
                .input('companyId', sql.Int, query.companyId)
                .query(
                    'DECLARE @receiptId int ' +
                    'DECLARE @count int ' +
                    'SELECT @count = count(*) FROM receipt WHERE companyId = @companyId ' +
                    'DECLARE @cnt INT = 1; ' +
                    'WHILE @cnt <= @count ' +
                    'BEGIN ' +
                    'select * from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE companyId = @companyId ) AS [takmaAd] WHERE rn = @cnt ' +
                    'select  @receiptId = id from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE companyId = @companyId ) AS [takmaAd] WHERE rn = @cnt ' +
                    'SELECT * FROM sales WHERE receiptId = @receiptId ' +
                    'SET @cnt += 1 ' +
                    'END; '
                );
            for (let i = 0; i < receipts.recordsets.length; i++) {
                receipts.recordsets[i][0]['salesList'] = receipts.recordsets[i + 1];
                receipts.recordsets.splice(i + 1, 1);
            }
            let listA = [];
            for (let i = 0; i < receipts.recordsets.length; i++) {
                listA.push(receipts.recordsets[i][0])
            }
            return listA;
        } else if (query.companyId && query.startDate && query.endDate && query.createdUser == null) {
            console.log('Şirkete ait belirli zamandaki fişleri görüntüleme')
            let receipts = await pool.request()
                .input('companyId', sql.Int, query.companyId)
                .input('startDate', sql.DateTime, query.startDate)
                .input('endDate', sql.DateTime, query.endDate)
                .query(
                    'DECLARE @receiptId int ' +
                    'DECLARE @count int ' +
                    'SELECT @count = count(*) FROM receipt WHERE companyId = @companyId and createdDate BETWEEN @startDate AND @endDate ' +
                    'DECLARE @cnt INT = 1; ' +
                    'WHILE @cnt <= @count ' +
                    'BEGIN ' +
                    'select * from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE companyId = @companyId and createdDate BETWEEN @startDate AND @endDate ) AS [takmaAd] WHERE rn = @cnt ' +
                    'select  @receiptId = id from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE companyId = @companyId and createdDate BETWEEN @startDate AND @endDate ) AS [takmaAd] WHERE rn = @cnt ' +
                    'SELECT * FROM sales WHERE receiptId = @receiptId ' +
                    'SET @cnt += 1 ' +
                    'END; '
                );
            for (let i = 0; i < receipts.recordsets.length; i++) {
                receipts.recordsets[i][0]['salesList'] = receipts.recordsets[i + 1];
                receipts.recordsets.splice(i + 1, 1);
            }
            let listB = [];
            for (let i = 0; i < receipts.recordsets.length; i++) {
                listB.push(receipts.recordsets[i][0])
            }
            return listB;
        } else if (query.companyId == null && query.startDate && query.endDate && query.createdUser) {
            console.log('Kullanıcıya ait belirli zamandaki fişleri görüntüleme')
            let receipts = await pool.request()
                .input('startDate', sql.DateTime, query.startDate)
                .input('endDate', sql.DateTime, query.endDate)
                .input('createdUser', sql.Int, query.createdUser)
                .query(
                    'DECLARE @receiptId int ' +
                    'DECLARE @count int ' +
                    'SELECT @count = count(*) FROM receipt WHERE createdUser = @createdUser and createdDate BETWEEN @startDate AND @endDate ' +
                    'DECLARE @cnt INT = 1; ' +
                    'WHILE @cnt <= @count ' +
                    'BEGIN ' +
                    'select * from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE createdUser = @createdUser and createdDate BETWEEN @startDate AND @endDate ) AS [takmaAd] WHERE rn = @cnt ' +
                    'select  @receiptId = id from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE createdUser = @createdUser and createdDate BETWEEN @startDate AND @endDate ) AS [takmaAd] WHERE rn = @cnt ' +
                    'SELECT * FROM sales WHERE receiptId = @receiptId ' +
                    'SET @cnt += 1 ' +
                    'END; '
                );
            for (let i = 0; i < receipts.recordsets.length; i++) {
                receipts.recordsets[i][0]['salesList'] = receipts.recordsets[i + 1];
                receipts.recordsets.splice(i + 1, 1);
            }
            let listC = [];
            for (let i = 0; i < receipts.recordsets.length; i++) {
                listC.push(receipts.recordsets[i][0])
            }
            return listC;
                //.query("SELECT * FROM receipt WHERE createdUser = @createdUser and createdDate BETWEEN @startDate AND @endDate");
            //return receipts.recordsets;
        } else if (query.companyId == null && query.startDate == null && query.endDate == null && query.createdUser) {
            console.log('Kullanıcıya ait tüm fişleri görüntüleme')
            let receipts = await pool.request()
                .input('createdUser', sql.Int, query.createdUser)
                .query(
                    'DECLARE @receiptId int ' +
                    'DECLARE @count int ' +
                    'SELECT @count = count(*) FROM receipt WHERE createdUser = @createdUser ' +
                    'DECLARE @cnt INT = 1; ' +
                    'WHILE @cnt <= @count ' +
                    'BEGIN ' +
                    'select * from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE createdUser = @createdUser ) AS [takmaAd] WHERE rn = @cnt ' +
                    'select  @receiptId = id from (select *, ROW_NUMBER() OVER (ORDER BY id ) rn FROM [receipt] WHERE createdUser = @createdUser ) AS [takmaAd] WHERE rn = @cnt ' +
                    'SELECT * FROM sales WHERE receiptId = @receiptId ' +
                    'SET @cnt += 1 ' +
                    'END; '
                );
            for (let i = 0; i < receipts.recordsets.length; i++) {
                receipts.recordsets[i][0]['salesList'] = receipts.recordsets[i + 1];
                receipts.recordsets.splice(i + 1, 1);
            }
            let listD = [];
            for (let i = 0; i < receipts.recordsets.length; i++) {
                listD.push(receipts.recordsets[i][0])
            }
            return listD;
               // .query("SELECT * FROM receipt WHERE createdUser = @createdUser");
            //return receipts.recordsets;
        } else if (query.companyId == null && query.startDate == null && query.endDate == null && query.createdUser == null) {
            console.log('Tüm fişleri görüntüleme')
            let receipts = await pool.request()
                .query("SELECT * FROM receipt");
            return receipts.recordsets;
        } else {
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
/*

                    "DECLARE @receiptId int " +
                    "DECLARE @count int " +
                    "SELECT @receiptId = id FROM receipt WHERE companyId = @companyId " +
                    "SET @count = SELECT count(*) FROM receipt WHERE companyId = @companyId "+
                    "SELECT * FROM receipt WHERE companyId = @companyId"+
                    "SELECT * FROM sales WHERE receiptId = @receiptId "

*/