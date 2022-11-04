import { table } from "console";
import { INTEGER } from "sequelize";


const db = require("../database")
import { DataTypes } from "sequelize"

const Cadastrados = db.define(
    "Cadastrados",
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
            type: DataTypes.STRING
        }
    },
    {
        tableName: "cadastrados"
    }
);

module.exports = Cadastrados