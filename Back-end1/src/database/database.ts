import { Sequelize } from "sequelize"

export const db: Sequelize = new Sequelize(
    'dindin',
    'root',
    'lindo2849',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: console.log 
    }
)