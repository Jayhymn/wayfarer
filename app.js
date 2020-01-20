import express from 'express'
import dotenv from 'dotenv'
import users from './routes/user'
import trip from './routes/trip'
import booking from './routes/booking'

dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/v1/auth', users)

app.use('/api/v1', trip)

app.use('/api/v1', booking)

const port = process.env.PORT || 3000
app.listen(port)

module.exports = app
