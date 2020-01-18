// import { Client } from 'pg'
// import dotenv from 'dotenv'

const { Client } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
})
client.connect()
