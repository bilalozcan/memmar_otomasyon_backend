const config = require('../../dbconfig');
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

module.exports = {
    getAllProducts: getAllProducts,
}