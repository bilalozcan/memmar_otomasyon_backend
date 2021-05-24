var config = require('./dbconfig');
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

// async function getBook(bookId) {
//     try {
//         let pool = await sql.connect(config);
//         let product = await pool.request()
//             .input('input_parameter', sql.Int, bookId)
//             .query("SELECT * from kitap where kitapno = @input_parameter");
//         return product.recordsets;

//     }
//     catch (error) {
//         console.log(error);
//     }
// }

async function createUser(user) {

    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('fullName', sql.NVarChar, user.fullName)
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, user.password)
            .input('userType', sql.Int, user.userType)
            .input('createdDate', sql.DateTime, user.createdDate)
            .input('companyId', sql.Int, user.companyId)
            .execute('addUser');
        return insertUser.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }

}

module.exports = {
    getAllProducts: getAllProducts,
    // getOrder: getBook,
    createUser: createUser
}