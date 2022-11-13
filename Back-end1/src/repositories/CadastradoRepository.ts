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
}

export default new CadastradoRepository();