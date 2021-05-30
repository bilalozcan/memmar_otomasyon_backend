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

async function getCompany(query) {
    try {
        let pool = await sql.connect(config);
        let companies = await pool.request()
            .input('companyId', sql.Int, Number(query.companyId))
            .query("SELECT * FROM company WHERE id = @companyId");
        return companies.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateCompany(company) {
    try {
        let pool = await sql.connect(config);
        let updateCompany = await pool.request()
            .input('id', sql.Int, company.id)
            .input('totalAmount', sql.Real, company.totalAmount)
            .input('totalSupply', sql.Real, company.totalSupply)
            .input('createdAdd', sql.DateTime, company.createdAdd)
            .input('income', sql.Real, company.income)
            .input('name', sql.NVarChar, company.name)
            .execute('updateCompany');
        return updateCompany.recordsets;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


module.exports = {
    createCompany: createCompany,
    getCompany: getCompany,
    updateCompany: updateCompany
}