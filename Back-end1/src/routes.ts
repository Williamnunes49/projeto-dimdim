import { Application } from 'express';
import { Router } from './helpers/Router';
import CadastradoController from './controllers/CadastradoController';

export function setupRoutes(app: Application) {
    const router = new Router(app);

    router.get("/", () => {
        return "Buenos, quer ver os cadastrados?"
    });

    router.group( "/cadastrados", (router) => {
        router.get("/", CadastradoController.allCadastrados);
        router.post("/", CadastradoController.create);
        router.get("/:id", CadastradoController.getOne);
        router.delete("/:id", CadastradoController.delete);
        router.put("/:id", CadastradoController.update)
    })
}