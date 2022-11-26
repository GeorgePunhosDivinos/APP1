const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const auth = require("./middlewares/clienteAuth")

require('dotenv/config');

const session= require("express-session");
app.use(session({
    secret:'ifpe',
    saveUninitialized:false,
    resave:false
}));


const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const produtoRoutes = require("./routes/produtoRoutes");
app.use(produtoRoutes);
const clienteRoutes = require("./routes/clienteRoutes");
app.use(clienteRoutes);
 
app.get("/", auth,  function(req, res){
    res.render("index");
});

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado");
});

app.use(function(req,res){
    res.status(404).render("404");
});