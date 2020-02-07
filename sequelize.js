import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// const { Sequelize } = require('sequelize').Sequelize
// const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER,
     process.env.DB_PASSWORD, {
         host: process.env.DB_HOST,
         dialect: 'postgres',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
            }
     })
    //  const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
    sequelize.authenticate()
    .then(()=> console.log('sequelize connected successfully'))
    .catch(e => console.error('unable to connect'))

module.exports = sequelize
