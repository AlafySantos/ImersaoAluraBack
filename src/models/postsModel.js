/*
models:
Função: Representa a estrutura dos dados da aplicação.
O que faz: Define como os dados serão armazenados e como interagir com o banco de dados.
Exemplo: Um modelo pode representar um usuário (com atributos como nome, email, senha) ou um produto (com atributos como nome, preço, descrição).
*/


// Importa a função para conectar ao banco de dados
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados e o armazena no objeto conexão
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// Recuperar todos os posts do banco de dados
export async function getTodosPosts() {
    const db = conexao.db("projetoBeck");    // Acessa a conexão do BD pelo objeto 'conexao'
    const colecao = db.collection("posts");  // Obtém a coleção "posts" do BD
    return colecao.find().toArray();         // Encontra todos os documentos na coleção "posts"
};

export async function criarPost(novoPost) {
    const db = conexao.db("projetoBeck");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
};

export async function editarPost(id, postAtualizado) {
    const db = conexao.db("projetoBeck");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne(
        {_id: new ObjectId(objId)},
        {$set: postAtualizado}
    );
};