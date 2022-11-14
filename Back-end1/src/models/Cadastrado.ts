import { db } from "../database/database";
import { Model, DataTypes, Sequelize} from "sequelize";

export default class Cadastrado extends Model {}
Cadastrado.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        }
    },
    {
        modelName: 'cadastrados',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: db
    }
);