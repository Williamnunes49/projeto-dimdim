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
    }   
    
}

module.exports = cadastradoController