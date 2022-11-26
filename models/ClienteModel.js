const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = Schema({

    nome: String,
    email: String,
    senha : String
})

module.exports = mongoose.model("Cliente", clienteSchema);