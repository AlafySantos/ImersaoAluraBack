/*
routes:
Função: Define as rotas da aplicação.
O que faz: Mapeia as URLs para as funções dos controllers.
Exemplo: Uma rota pode ser /users para listar todos os usuários, /users/:id para buscar um usuário por ID ou /products para listar todos os produtos.
*/

/*
no front tem que colocar a chave de acesso ao back em ,ENV
a chave é: API_URL = 'http://localhost:3000'

olhar nos scripts do front como é o pra iniciar o projeto
eles devem ter um DEV também
*/


import express from "express";
import multer from "multer";
import cors from "cors";
import {listarPosts, postarNovoPost, uploadImagem, atualizarPost} 
from "../controllers/postsController.js";

// Para conexao com o front end (eles usam porta 8000)
const corsOptions = {
    origin: "http://localhost:8000",
    optionssucessStatus: 200
}


// isso aqui e configuracao do multer pro windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
// Pasta onde vai guardar as imagens do servidor
const upload = multer({ dest: "./uploads" , storage});


const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions)); //avisa o back end que chegara requisicoes da porta 8000

    // rota para o caminho raiz ('/')
    app.get("/", (req, res) => {
        res.status(200).send("boas vindas");
    });

    // rota para obter todos os posts
    app.get("/posts", listarPosts);

    // rota para criar (postar) um post
    app.post("/posts", postarNovoPost);

    // rota para postar imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);
    
    // rota para editar imagem
    app.put("/upload/:id", atualizarPost);
};

export default routes;
