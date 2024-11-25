// Importa o módulo express para construir o servidor web
import express from "express";
import routes from "./src/routes/PostsRoutes.js";

// Cria uma instância do aplicativo express
const app = express();
routes(app);

// Inicia o servidor e escuta por requisições na porta 3000
app.listen(
    3000, () => {console.log("servidor executando!");}
);

