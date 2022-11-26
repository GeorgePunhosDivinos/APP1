// aqui ficam as funções

const ProdutoModel = require("../models/ProdutoModel");

class ProdutoController{
   
    static async relatorio(req,res){
        const listaProduto = await ProdutoModel.find();
        res.render("produto/relatorio", {listaProduto});
    }


    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const listaProduto = await ProdutoModel.find();
        res.render("produto/listar", {listaProduto, salvo, removido});
    };

    static async cadastrarGet(req, res){
        const cod = req.params.codigo;
        let produto={};
        let escondido= ""
        if (cod){
         produto = await ProdutoModel.findOne({codigo: cod});
         escondido = "hidden";
        }
        
        res.render("produto/cadastrar", {produto, escondido});
    };

    static async cadastrarPost(req, res){
        const produto = req.body;
        //atualização
        if(produto.id){
            await ProdutoModel.findOneAndUpdate({codigo: produto.codigo}, 
            {
                nome:produto.nome,
                preco: produto.preco
            
        });
            res.redirect("/produto?s=3")

        } else{//cadastro

            const novoProduto = new ProdutoModel({
            codigo: produto.codigo,
            nome: produto.nome,
            preco: produto.preco
        });
        await novoProduto.save();
        res.redirect("/produto?s=1");
      }
    }

    static async detalhar(req, res){
        const cod = req.params.codigo;
        const resultado = await ProdutoModel.findOne({codigo: cod});
        res.render("produto/detalhar", {resultado});
    };

    static async remover(req,res){
        const cod = req.params.codigo;
        await ProdutoModel.findOneAndDelete({codigo: cod});
        res.redirect("/produto?r=1");
    };

}

module.exports = ProdutoController;