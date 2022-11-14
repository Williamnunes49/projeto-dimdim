import { CadastradoInterface } from './../interfaces/CadastradoInterface';
import Cadastrado from "../models/Cadastrado";

class CadastradoRepository {
    getCadastrados(): Promise<Array<any>> {
        return Cadastrado.findAll();
    }

    createCadastrado(dados: CadastradoInterface): Promise<any> {
        return Cadastrado.create( {
            name: dados.name,
            email: dados.email,
            message: dados.message
        })
    }

    getOneCadastrado(cadastradoId: number): Promise<any | null> {
        return Cadastrado.findOne({
            where: {
                id: cadastradoId
            }
        })
    }

    deleteCadastrado(cadastradoId: number): Promise<any> {
        return Cadastrado.destroy({
            where: {
                id: cadastradoId
            }
        })
    }

    updateCadastrado(cadastradoId: number, dados: CadastradoInterface): Promise<Array<any>> {
        return Cadastrado.update( {
            name: dados.name,
            email: dados.email,
            message: dados.message
        },
        {
            where: {
                id: cadastradoId
            }
        })
    }

}

export default new CadastradoRepository();