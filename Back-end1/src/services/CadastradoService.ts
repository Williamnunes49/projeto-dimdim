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

    updateCadastrado(cadastradoId: number, dados: CadastradoInterface): Promise<Array<any>> {
        if (!dados.name || !dados.email || !dados.message) throw new Error("Todos os campos são obrigatórios!");
        return CadastradoRepository.updateCadastrado(cadastradoId,dados)
    }

    async deleteCadastrado(cadastradoId: number): Promise<any> {
        const cadastrado = await CadastradoRepository.getOneCadastrado(cadastradoId);

        if(!cadastrado) throw new Error("Cadastrado não encontrado!");

        return CadastradoRepository.deleteCadastrado(cadastradoId)
    }
}

export default new CadastradoService();