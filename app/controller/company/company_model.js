const config = require('../../db_config');
const sql = require('mssql');

async function createCompany(company) {

    try {
        let pool = await sql.connect(config);
        let insertCompany = await pool.request()
            .input('companyName', sql.NVarChar, company.companyName)
            .input('createdDate', sql.DateTime, company.createdDate)
            .input('fullName', sql.NVarChar, company.fullName)
            .input('email', sql.NVarChar, company.email)
            .input('password', sql.NVarChar, company.password)
            .execute('createCompanyAndUser');
        return insertCompany.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }

}

module.exports = {
    createCompany: createCompany,
}