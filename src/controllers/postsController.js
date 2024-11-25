/*
controllers:
Função: Contém a lógica de negócio da aplicação.
O que faz: Recebe as requisições HTTP, processa os dados e chama os modelos para interagir com o banco de dados ou outras fontes de dados.
Exemplo: Um controller pode ser responsável por criar um novo usuário, buscar todos os produtos ou atualizar um pedido.
*/


import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import {getTodosPosts, criarPost, editarPost} 
from "../models/postsModel.js";


export async function listarPosts (req, res) {
    const todosPosts = await getTodosPosts();   // Chama a função para recuperar todos os posts
    res.status(200).json(todosPosts);           // Envia uma resposta com status 200 (OK) e os posts recuperados como dados JSON
};

export async function postarNovoPost (req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisicao"});
    }
};

export async function uploadImagem (req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado); 
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisicao"});
    }
};

export async function atualizarPost (req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postAtualizado = await editarPost(id, post);
        res.status(200).json(postAtualizado);
    }
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"erro": "falha na requisicao"});
    }
};