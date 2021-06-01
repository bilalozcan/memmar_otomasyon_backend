const config = require('../../db_config');
const sql = require('mssql');

async function statistic1(query) {
    console.log(query.companyId);
    try {
        let pool = await sql.connect(config);
        let table = await pool.request()
            .input('companyId', sql.Int, query.companyId)
            .query("SELECT [dbo].[user].id as userId, [dbo].[user].fullName,  "+
            "SUM(receipt.totalSales) as totalSales , SUM(receipt.totalAmount) as totalAmount   "+
            "FROM [dbo].[user]  "+
            "INNER JOIN receipt ON receipt.createdUser = [dbo].[user].id WHERE receipt.companyId = @companyId "+
            "GROUP BY [dbo].[user].fullName, [dbo].[user].id  ORDER BY totalSales DESC ");
        return table.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    statistic1 : statistic1,
}