const config = require('../../dbconfig');
const sql = require('mssql');

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
    createUser: createUser,
}
