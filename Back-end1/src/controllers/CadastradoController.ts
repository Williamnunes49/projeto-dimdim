import { Request, Response } from "express"
import { CadastradoInterface } from "../interfaces/CadastradoInterface"
import CadastradoService from "../services/CadastradoService"

class CadastradoController {
    static async allCadastrados(req: Request, res: Response) {

        try{
            
            const cadastrados: Array<CadastradoInterface>  = await CadastradoService.getCadastrados();
        
            if (cadastrados.length <= 0) {
                return res
                    .status( 500)
                    .json({success: false, msg: "⚠️ Nenhum cadastrado até o momento."});
            }

            return res 
                .status(200)
                .json({success: true, msg: "✔️ Cadastrados encontrados com sucesso!", data: cadastrados})
        } catch (error){
            console.log(error);
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

            return res
                .status(200)
                .json({ success: true, msg: "✔️ Cadastrado criado com sucesso!", data: cadastrado });
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ success: false, msg: "✖️ Ops, deu ruim!"})
        }
    }

    static async getOne(req: Request, res: Response) {
        try {

            if (!req.params.id || isNaN(parseInt(req.params.id))) {
                return res
                    .status(500)
                    .json({ success: false, msg: "✖️ Eita! Informe um ID válido!" });
            }

            const cadastradoId: number = parseInt(req.params.id);
            const cadastrado = await CadastradoService.getOneCadastrado(cadastradoId);

            if (!cadastrado) return res
                .status(500)
                .json({ success: false, msg: "✖️ Cadastrado não encontrado!" });

            return res.json({ success: true, data: cadastrado });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, msg: "✖️ Ops, deu ruim!" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            
            if (!req.params.id || isNaN(parseInt(req.params.id))) {
                return res
                    .status(500)
                    .json({ success: false, msg: "✖️ Eita! Informe um ID válido!" });
            }

            const cadastradoId: number = parseInt(req.params.id);
            const cadastrado = await CadastradoService.getOneCadastrado(cadastradoId);

            if (!cadastrado) return res
                .status(500)
                .json({ success: false, msg: "✖️ Cadastrado não encontrado!" });
                
            await CadastradoService.deleteCadastrado(cadastradoId)

            return res.status(200).json({ success: true, msg: "✔️ Cadastrado excluído com sucesso!" });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, msg: `✖️ ${error}` });
        }
    }
}

export default CadastradoController;