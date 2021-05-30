const config = require('../../db_config');
const sql = require('mssql');

async function createSupplier(supplier) {
    try {
        let pool = await sql.connect(config);
        let insertSupplier = await pool.request()
            .input('name', sql.NVarChar, supplier.name)
            .input('phone', sql.NVarChar, supplier.phone)
            .execute('addSupplier');
        return insertSupplier.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
async function getAllSupplier() {
    try {
        let pool = await sql.connect(config);
        let allSupplier = await pool.request()
            .query("SELECT * FROM supplier");
        
        return allSupplier.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
module.exports = {
    createSupplier: createSupplier,
    getAllSupplier: getAllSupplier,
}