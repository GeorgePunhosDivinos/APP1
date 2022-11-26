const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdutoSchema = Schema({
    codigo : Number,
    nome: String,
    preco : Number
})

module.exports = mongoose.model("Produto", ProdutoSchema);