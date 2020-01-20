import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER,
     process.env.DB_PASSWORD, {
         host: process.env.DB_PASSWORD,
         dialect: 'postgres',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
            }
     })


module.exports = sequelize
