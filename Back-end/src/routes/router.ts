import { Router, Request, Response} from "express";
const cadastradoController = require("../controllers/cadastradoControllers")
// Validations
const validateCadastrados = require("../validations/Cadatrados/create")

const router = Router()

export default router.get("/", (req:Request, res:Response) => {
    res.status(200).send("Api Working")
})
.get("/cadastrados", cadastradoController.getAllCadastrados)
.get("/cadastrados/:id", cadastradoController.getOneCadastrado)
.post("/cadastrados", validateCadastrados, cadastradoController.createCadastrado)
.put("/cadastrados/:id", validateCadastrados, cadastradoController.updateCadastrado)
.delete("/cadastrados/:id", cadastradoController.deleteCadastrado)