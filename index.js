//Módulos
const express = require("express");
const app = express();
const {engine}  = require('express-handlebars');

//Módulo comunicador de form
const bodyParcer = require('body-parser');


//Back-end
const bodyParser = require("body-parser");
const Post = require("./models/Post");

//Config
    //Template engine
        app.engine('handlebars', engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    //Body Parser
        app.use(bodyParcer.urlencoded({extended: false}))
        app.use(bodyParser.json())

//Rotas

//Home com todas a postagens.
app.get('/', function(req, res){
    Post.findAll().then(function(postagens){
        res.render('home', {postagens: postagens})
    })
});

//visual do cadastro
app.get('/cad', function(req,res){
    res.render('form')
})

//Cadastrando no banco
app.post('/addForm', function(req,res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteúdo
    }).then(function(){
        res.redirect('/')
        //res.send("<center>Formulário recebido. <br> Título: "+req.body.titulo+".</center>")
    }).catch(function(erro){
        res.send("<center>Ocorreu um erro. <br> Erro: "+erro+".</center>")
    })
})


//deletar post
app.get('/deletar/:id', function(req,res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send('Postagem deletada. <br><a href="/" alt=""><button>Voltar</button></a>')
    }).catch(function(erro){
        res.send('Postagem não deletada.')
    })
})

//Mais detalhes da postagem
app.get('/mais-detalhes/:id', function(req,res) {
    Post.findAll({where: {'id': req.params.id}}).then(function(postagens){
        res.render('mais-detalhes', {postagens: postagens});
    }).catch(function(erro){
        res.send('Ocorreu um erro.');
    })
})

//Criação do servidor
    app.listen(8181, function(){
        console.log("Servidor rodando com sucesso.");
    });