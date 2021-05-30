const config = require('../../db_config');
const sql = require('mssql');

async function getQuerySupply(query) {
    try {
        let pool = await sql.connect(config);
        let supplies = await pool.request()
        .input('companyId', sql.Int, Number(query.companyId))
            .query("SELECT * FROM supply WHERE companyId = @companyId");
        return supplies.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    getQuerySupply: getQuerySupply,
    
}