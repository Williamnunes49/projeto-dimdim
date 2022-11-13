import  express  from 'express';
import cors from "cors"

import { setupRoutes } from './routes';
import { db } from './config/database';

async function main() {
    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(express.json());
    setupRoutes(app);

    app.listen(port, async () => {

        console.log(`🚀 Projeto rodando no endereço: http://127.0.0.1:${port}`);

        db.authenticate()
            .then(() => {
                console.log(`😄 Conectado com sucesso ao banco de dados!`);
            })
            .catch(err => {
                console.log(`😕 Falha ao conectar ao banco de dados.`);
            });        
    });
}

main().catch((error) => {
    console.log("🥵 Erro!");
    console.log(error);
});