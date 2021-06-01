const config = require('../../db_config');
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

async function loginUser(email, password) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('select * from [dbo].[user] where email = @email and password = @password');
        if (user.recordsets[0].length == 1)
            return user.recordsets;
        else return null;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUsers(query) {
    console.log(query.companyId);
    try {
        let pool = await sql.connect(config);
        let users = await pool.request()
        .input('companyId', sql.Int, Number(query.companyId))
        .query("SELECT * from [dbo].[user] where companyId = @companyId");
        return users.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateUserInfo(body) {
    try {
        console.log('update user info' + body);
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('id', sql.Int, body.id)
        .input('fullName', sql.VarChar, body.fullName)
        .execute('updateUserInfo');
        return user.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateUserPassword(body) {
    try {
        console.log('update user password' + body);
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('id', sql.Int, body.id)
        .input('oldPassword', sql.VarChar, body.oldPassword)
        .input('newPassword', sql.VarChar, body.newPassword)
        .execute('updateUserPassword');
        console.log(user.recordsets)
        console.log(user.recordsets.length)
        console.log(user.recordsets.length == 0)
        return user.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateUserEmail(body) {
    try {
        console.log('update user email' + body);
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('id', sql.Int, body.id)
        .input('oldEmail', sql.VarChar, body.oldEmail)
        .input('newEmail', sql.VarChar, body.newEmail)
        .execute('updateUserEmail');
        console.log(user.recordsets)
        console.log(user.recordsets.isNotEmpty)
        return user.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    getUsers: getUsers,
    updateUserInfo : updateUserInfo,
    updateUserPassword:updateUserPassword,
    updateUserEmail:updateUserEmail,
}
