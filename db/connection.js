import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
    server: process.env.IP || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
})
client.connect()
module.exports = client
