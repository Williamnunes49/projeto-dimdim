import { Request, Response } from "express"
import { CadastradoInterface } from "../interfaces/CadastradoInterface"
import CadastradoService from "../services/CadastradoService"
import Logger from "../../config/logger";

class CadastradoController {
    static async allCadastrados(req: Request, res: Response) {

        try{
            
            const cadastrados: Array<CadastradoInterface>  = await CadastradoService.getCadastrados();
        
            if (cadastrados.length <= 0) {
                Logger.error("⚠️ Nenhum cadastrado até o momento.");
                return res
                    .status( 500)
                    .json({success: false, msg: "⚠️ Nenhum cadastrado até o momento."});
            }
            else{
                Logger.info("✔️ Cadastrados encontrados com sucesso!")
                return res 
                    .status(200)
                    .json({success: true, msg: "✔️ Cadastrados encontrados com sucesso!", data: cadastrados})
            }
        } catch (error: any){
            Logger.error(`Pane no sistema: ${error.message}`)
            return res
                .status(500)
                .json({success: false, msg: "✖️ Ops, deu ruim!"})
        }
    }

    static async create(req: Request, res: Response) {
        const payload: any = req.body;
        console.log(payload);

        const cadastradoObj: CadastradoInterface = {
            name: payload.name,
            email: payload.email,
            message: payload.message
        };

        try {
            
            const cadastrado = await CadastradoService.createCadastrado(cadastradoObj);

            Logger.info("✔️ Cadastrado criado com sucesso!")
            return res
                .status(200)
                .json({ success: true, msg: "✔️ Cadastrado criado com sucesso!", data: cadastrado });
        } catch (error) {
            Logger.error(error)
            return res
                .status(500)
                .json({ success: false, msg: "✖️ Ops, deu ruim!"})
        }
    }

    static async getOne(req: Request, res: Response) {
        try {

            if (!req.params.id || isNaN(parseInt(req.params.id))) {
                Logger.error("✖️ Não foi passado um ID válido!")
                return res
                    .status(500)
                    .json({ success: false, msg: "✖️ Eita! Informe um ID válido!" });
            }

            const cadastradoId: number = parseInt(req.params.id);
            const cadastrado = await CadastradoService.getOneCadastrado(cadastradoId);

            if (!cadastrado) {
                Logger.error("✖️ Cadastrado não encontrado!")
                return res
                .status(500)
                .json({ success: false, msg: "✖️ Cadastrado não encontrado!" })
            }
            else{
                Logger.info("Mandando o cadastrado que foi pedido!")
                return res.json({ success: true, data: cadastrado })
            }

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, msg: "✖️ Ops, deu ruim!" });
        }
    }

    static async update(req: Request, res: Response) {

        const payload: any = req.body;
        console.log(payload);

        const cadastradoObj: CadastradoInterface = {
            name: payload.name,
            email: payload.email,
            message: payload.message
        };

        try {

            if (!req.params.id || isNaN(parseInt(req.params.id))) {
                Logger.error("✖️ Não foi passado um ID válido")
                return res
                    .status(500)
                    .json({ success: false, msg: "✖️ Eita! Informe um ID válido!" });
            }

            const cadastradoId: number = parseInt(req.params.id);
            const cadastrado = await CadastradoService.getOneCadastrado(cadastradoId)

            if (!cadastrado) {
                Logger.error("✖️ Não foi encontrado")
                return res
                .status(500)
                .json({ success: false, msg: "✖️ Cadastrado não encontrado!" });
            }
            else{
                const updatedCadastrado = await CadastradoService.updateCadastrado(cadastradoId,cadastradoObj);

                Logger.info("✔️ Cadastrado atualizado com sucesso!")
                return res.status(200).json({ success: true, msg: "✔️ Cadastrado atualizado com sucesso!", data: cadastradoObj });
            }
        } catch (error) {
            Logger.error(error);
            return res
                .status(500)
                .json({ success: false, msg: "✖️ Ops, deu ruim!" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            
            if (!req.params.id || isNaN(parseInt(req.params.id))) {
                Logger.error("✖️ Não foi passado um ID válido")
                return res
                    .status(500)
                    .json({ success: false, msg: "✖️ Eita! Informe um ID válido!" });
            }

            const cadastradoId: number = parseInt(req.params.id);
            const cadastrado = await CadastradoService.getOneCadastrado(cadastradoId);

            if (!cadastrado) {
                Logger.error("✖️ Não foi encontrado")
                return res
                .status(500)
                .json({ success: false, msg: "✖️ Cadastrado não encontrado!" });
            }
            else {
            await CadastradoService.deleteCadastrado(cadastradoId)

            Logger.info("✔️ Cadastrado excluído com sucesso!")
            return res.status(200).json({ success: true, msg: "✔️ Cadastrado excluído com sucesso!" });
            }
        } catch (error) {
            Logger.error(error);
            return res
                .status(500)
                .json({ success: false, msg: `✖️ ${error}` });
        }
    }
}

export default CadastradoController;