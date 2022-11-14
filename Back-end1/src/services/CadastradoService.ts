import { CadastradoInterface } from "../interfaces/CadastradoInterface";
import CadastradoRepository from "../repositories/CadastradoRepository"

class CadastradoService {
    getCadastrados(): Promise<Array<CadastradoInterface>> {
        return CadastradoRepository.getCadastrados()
    }

    createCadastrado(dados: CadastradoInterface){
        if (!dados.name || !dados.email || !dados.message) throw new Error("Todos os campos são obrigatórios!");
        return CadastradoRepository.createCadastrado(dados);
    }
    
    getOneCadastrado(cadastradoId: number): Promise<any> {
        return CadastradoRepository.getOneCadastrado(cadastradoId)
    }
}

export default new CadastradoService();