var config = require('./dbconfig');
const sql = require('mssql');

async function getProducts() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from product");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getBook(bookId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, bookId)
            .query("SELECT * from kitap where kitapno = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function addBook(book) {

    try {
        // let pool = await sql.connect(config);
        // let addProduct = await pool.request()
        //     .input('kitapno', sql.Int, book.kitapno)
        //     .input('ad', sql.NVarChar, book.ad)
        //     .input('sayfasayisi', sql.Int, book.sayfasayisi)
        //     .input('puan', sql.Int, book.puan)
        //     .input('yazarno', sql.Int, book.yazarno)
        //     .input('turno', sql.Int, book.turno)
        //     .query('insert into kitap(ad, sayfasayisi, puan, yazarno, turno) values(@ad , @sayfasayisi, @puan , @yazarno , @turno)');
        // return addProduct.recordsets;
        let pool = await sql.connect(config);
        let insertBook = await pool.request()
            .input('ad', sql.NVarChar, book.ad)
            .input('sayfasayisi', sql.Int, book.sayfasayisi)
            .input('puan', sql.Int, book.puan)
            .input('yazarno', sql.Int, book.yazarno)
            .input('turno', sql.Int, book.turno)
            .execute('addBook');
        return insertBook.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {
    getProducts: getProducts,
    getOrder: getBook,
    addOrder: addBook
}