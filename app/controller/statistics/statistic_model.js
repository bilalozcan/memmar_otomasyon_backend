const config = require('../../db_config');
const sql = require('mssql');

//Bir şirkete ait kullanıcı için toplam satılan ürün miktarı ve toplam 
async function statistic1(query) {
    console.log(query.companyId);
    queryString = "SELECT [dbo].[user].id as userId, [dbo].[user].fullName,  " +
        "SUM(receipt.totalSales) as totalSales , SUM(receipt.totalAmount) as totalAmount   " +
        "FROM [dbo].[user]  " +
        "INNER JOIN receipt ON receipt.createdUser = [dbo].[user].id " +
        "WHERE receipt.companyId = @companyId " +
        " GROUP BY [dbo].[user].fullName, [dbo].[user].id ";
    if (query.isSales)
        queryString += " ORDER BY totalSales DESC ";
    else
        queryString += " ORDER BY totalAmount DESC "
    try {
        let pool = await sql.connect(config);
        let table = await pool.request()
            .input('companyId', sql.Int, query.companyId)
            .query(queryString);
        return table.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//Bir şirkete ait ürün kategorilerinden satış miktarları
async function statistic2(query) {
    console.log(query.companyId);
    try {
        let pool = await sql.connect(config);
        let table = await pool.request()
            .input('companyId', sql.Int, query.companyId)
            .query(
                "SELECT SUM(product.sold) as totalSold, productType.name " +
                "from product INNER JOIN productType ON productType.id = product.productType  " +
                "WHERE product.companyId = @companyId " +
                "GROUP BY productType.name ORDER BY totalSold  DESC "
            );
        return table.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//Ürünlerin tedarik edilme miktarları
async function statistic3(query) {
    console.log(query.companyId);
    try {
        let pool = await sql.connect(config);
        let table = await pool.request()
            .input('companyId', sql.Int, query.companyId)
            .query(
                "select product.name, supply.quantity " +
                "from product  " +
                "INNER JOIN supply on supply.productId = product.id " +
                "WHERE product.companyId = @companyId "+
                "ORDER BY supply.quantity DESC "
            );
        return table.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    statistic1: statistic1,
    statistic2: statistic2,
    statistic3: statistic3
}

// "SELECT [dbo].[user].id as userId, [dbo].[user].fullName,  "+
// "SUM(receipt.totalSales) as totalSales , SUM(receipt.totalAmount) as totalAmount   "+
// "FROM [dbo].[user]  "+
// "INNER JOIN receipt ON receipt.createdUser = [dbo].[user].id "+
// "WHERE receipt.companyId = @companyId "+
// " GROUP BY [dbo].[user].fullName, [dbo].[user].id "+
// (query.isSales) ? " ORDER BY totalSales DESC " : " ORDER BY totalAmount DESC " +
// " ORDER BY totalSales DESC "