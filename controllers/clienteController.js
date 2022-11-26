
const ClienteModel = require("../models/ClienteModel");
const bcryptjs = require ("bcryptjs");

class ClienteController{

    static async relatorio(req,res){
        const listaCliente = await ClienteModel.find();
        res.render("cliente/relatorio", {listaCliente});
    };

    
    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const listaCliente = await ClienteModel.find();
        res.render("cliente/listar", {listaCliente, salvo, removido});
    };

    static async cadastrarGet(req, res){
        const email = req.params.email;
        const erro=req.query.e;
        let cliente={};
        let escondido= ""
        if (email){
         cliente = await ClienteModel.findOne({email: email});
         escondido = "hidden";
        }
        
        res.render("cliente/cadastrar", {cliente, escondido, erro});
    }

    static async cadastrarPost(req, res){
        const cliente = req.body;
        //atualização
        if(cliente.id){
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(cliente.senha, salt);

            await ClienteModel.findOneAndUpdate({email: cliente.email}, 
            {
                nome:cliente.nome,
                senha: hash
            
            });
            res.redirect("/cliente?s=3")
        } else{//cadastro

            const resultado = await ClienteModel.findOne({email: cliente.email});
            if(resultado){
               
                res.redirect("/cliente/cadastrar?e=1");
            }

            else{

                const salt = bcryptjs.genSaltSync();
                const hash = bcryptjs.hashSync(cliente.senha, salt);

                const novoCliente = new ClienteModel({

                nome: cliente.nome,
                email: cliente.email,
                senha: hash
            });
            await novoCliente.save();
            res.redirect("/cliente?s=1");
            }
        }
    }

    static async detalhar(req, res){
        const email = req.params.email;
        const resultado = await ClienteModel.findOne({email: email});
        res.render("cliente/detalhar", {resultado});
    };

    static async remover(req,res){
        const email = req.params.email;
        await ClienteModel.findOneAndDelete({email: email});
        res.redirect("/cliente?r=1");
    };

    static async login(req,res){
        const erro = req.query.e;
        res.render("cliente/login", ({erro}));
    }

    static async loginpost(req,res){
        const cliente= req.body;
        const resultado = await ClienteModel.findOne({email: cliente.email});
        if(resultado){//encontrou email
           if (bcryptjs.compareSync(cliente.senha, resultado.senha)){//senha confere
                req.session.cliente = resultado.email;
                res.redirect("/");
            }else{//senha incorreta
                res.redirect("/cliente/login?e=1");
            }
        
            
        }else{//email nao encontrado
            res.redirect("/cliente/login?e=1");
        }

    }

    static async logout(req, res){
        req.session.cliente = undefined;
        res.redirect("/cliente/login");
    }


}

module.exports = ClienteController;