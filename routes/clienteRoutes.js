const express = require("express");
const routes = express.Router();


const clienteController = require("../controllers/clienteController");
const auth = require("../middlewares/clienteAuth");

routes.get("/cliente/relatorio", auth, clienteController.relatorio);
routes.get("/cliente/", auth, clienteController.listar);
routes.get("/cliente/cadastrar/:email?", clienteController.cadastrarGet);
routes.post("/cliente", clienteController.cadastrarPost);
routes.get("/cliente/login",clienteController.login);
routes.post("/cliente/login", clienteController.loginpost);
routes.get("/cliente/remover/:email", auth, clienteController.remover);
routes.get("/cliente/logout", auth, clienteController.logout);
routes.get("/cliente/:email", auth, clienteController.detalhar);


module.exports = routes;