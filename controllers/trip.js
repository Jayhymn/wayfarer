import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { validationResult } from 'express-validator'
import dbClient from '../db/connection'

dotenv.config()

const create_trip = async (req, res) => {
    const no_access = { message: 'Access Denied!' }
    // eslint-disable-next-line object-curly-newline
    const { bus_id, origin, destination, fare, token } = req.body
    const trip_date = new Date(req.body.trip_date).toLocaleDateString()
try {
    // validationResult(req.body).throw()
    const { is_admin } = await jwt.verify(token, process.env.SECRET_KEY)

    if (!is_admin) throw (no_access)

    dbClient.connect()

    const createTrip = await dbClient.query(`INSERT INTO trip (bus_id, origin, destination, trip_date, fare)
                                        VALUES ('${bus_id}', '${origin}', '${destination}', '${trip_date}', '${fare}');
                                
                                    SELECT * FROM trip WHERE (bus_id = '${bus_id}') ORDER BY trip_id DESC LIMIT 1`)
    dbClient.end()

    const data = createTrip[1].rows[0]
    res.json({ status: 'success', data })
} catch (e) {
    res.status(400).send({ status: 'error', e })
    }
}

const get_trips = async (req, res) => {
    const register = { message: 'kindly sign up to use our services :-)' }

    const { token } = req.body
    try {
        dbClient.connect()
      if (!token) throw (register)

      const { user_id } = jwt.verify(token, process.env.SECRET_KEY)
      if (!user_id) throw (register)

      const trips = await dbClient.query('SELECT * FROM public.trips')
      dbClient.end()
      res.send({ status: 'success', data: trips.rows })
    } catch (error) {
      res.status(400).send({ status: 'error', error })
    }
  }

module.exports = { create_trip, get_trips }
