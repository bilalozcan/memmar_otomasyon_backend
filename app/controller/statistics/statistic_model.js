const config = require('../../db_config');
const sql = require('mssql');

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

module.exports = {
    statistic1: statistic1,
}

// "SELECT [dbo].[user].id as userId, [dbo].[user].fullName,  "+
// "SUM(receipt.totalSales) as totalSales , SUM(receipt.totalAmount) as totalAmount   "+
// "FROM [dbo].[user]  "+
// "INNER JOIN receipt ON receipt.createdUser = [dbo].[user].id "+
// "WHERE receipt.companyId = @companyId "+
// " GROUP BY [dbo].[user].fullName, [dbo].[user].id "+
// (query.isSales) ? " ORDER BY totalSales DESC " : " ORDER BY totalAmount DESC " +
// " ORDER BY totalSales DESC "