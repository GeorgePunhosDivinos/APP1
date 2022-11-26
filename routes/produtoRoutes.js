const express = require("express");
const routes = express.Router();

const produtoController = require("../controllers/produtoController");
const auth = require("../middlewares/clienteAuth");

routes.get("/produto/",auth, produtoController.listar);
routes.post("/produto",auth, produtoController.cadastrarPost);
routes.get("/produto/cadastrar/:codigo?",auth, produtoController.cadastrarGet);
routes.get("/produto/relatorio",auth, produtoController.relatorio);
routes.get("/produto/:codigo",auth, produtoController.detalhar);
routes.get("/produto/remover/:codigo",auth, produtoController.remover);

module.exports = routes;