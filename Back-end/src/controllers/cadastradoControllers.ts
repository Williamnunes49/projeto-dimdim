import { Request, Response } from "express";
import { any } from "joi";



// Model 
const  Cadastrados  = require("../models/Cadastrados")

// Logger
import Logger from "../../config/logger";


const cadastradoController = {
    async getAllCadastrados(req: Request, res: Response) {
        try {
            const allCadastrados = await Cadastrados.findAll()
            if(allCadastrados.values === [].values){
                res.status(200).json('Nenhum cadastrado ainda')
            }else{
            return res.status(200).json(allCadastrados)}
        } catch (error: any) {
            Logger.error(`Pane no sistema: ${error.message}`)
        }
    },
    async getOneCadastrado(req: Request, res: Response) {
        try {
            const {id} = req.params
            const oneCadastrado = await Cadastrados.findOne(
                {
                    where:{
                    id: id,
                    }
                },
            )
            if (oneCadastrado === null) {
                res.status(404).json("ID Não encontrado")
            } 
            else {
            res.status(200).json(oneCadastrado)}
        }
        catch (error: any) {
            Logger.error(`Pane no sistema: ${error.message}`)
        }
    },
    async createCadastrado (req: Request, res: Response) {
        try {
            const { name, email, message } = req.body
            const newCadastrado = await Cadastrados.create({
                name,
                email,
                message,
            });
            res.status(201).json(newCadastrado);
        } catch (error: any) {
            Logger.error(`Pane no sistema: ${error.message}`)
        }
    },
    async updateCadastrado (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, message } = req.body;
            const newUpdatedCadastrado = await Cadastrados.update(
                {
                    name,
                    email,
                    message
                },
                {
                    where: {
                        id: id,
                    }
                }
            );
            const oneNewCadastrado = await Cadastrados.findOne({
                where: {
                    id: id,
                }
            });
            if(oneNewCadastrado === null){
                res.status(404).json("ID não encontrado")
            }
            else{
              res.status(200).json(oneNewCadastrado);}
        } 
        catch (error: any) {
            Logger.error(`Pane no sistema: ${error.message}`)
        }
            
    },
    async deleteCadastrado (req: Request, res: Response) {
        try {
            const { id } = req.params
            const oneCadastrado = await Cadastrados.findOne({
                where: {
                    id: id,
                }
            })
            const deletingCadastrado = await Cadastrados.destroy({
                where: {
                    id: id,
                }
            })
            if(oneCadastrado === null){
                res.status(404).json("ID não encontrado")
            }
            else{
              res.status(200).json("ID deletado")}
        } catch (error: any) {
            Logger.error(`Pane no sistema: ${error.message}`)
        }
    }
}
    

module.exports = cadastradoController