// To parse this data:
//
//   const Convert = require("./file");
//
//   const product = Convert.toProduct(json);

// Converts JSON strings to/from your types
function toProduct(json) {
    return JSON.parse(json);
}

function productToJson(value) {
    return JSON.stringify(value);
}

module.exports = {
    "productToJson": productToJson,
    "toProduct": toProduct,
};
