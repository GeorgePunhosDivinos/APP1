const req = require("express/lib/request");

function auth(req,res,next){
    if(req.session.cliente){
        next();
    } else{
        res.redirect("/cliente/login");
    }
}

module.exports = auth;