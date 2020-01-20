/* eslint-disable arrow-parens */
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { validationResult } from 'express-validator'
import dbClient from '../db/connection'

dotenv.config()

const trip = async (req, res) => {
    const no_access = { message: 'Access Denied!' };
    const booked_already = { message: 'already booked' }
    const all_seats_booked = { message: 'all available seats have been booked for this trip' }
    // eslint-disable-next-line object-curly-newline
    const { trip_id, token } = req.body

try {
    if (!token) throw (no_access)
    const { user_id } = await jwt.verify(token, process.env.SECRET_KEY)

    if (!user_id) throw (no_access)

    // dbClient.connect()
    const { rows } = await dbClient.query(`SELECT trip_id, user_id, booking_id, seat_number FROM BOOKINGS WHERE (TRIP_ID = ${trip_id} OR 
        TRIP_ID = ${trip_id} AND USER_ID = ${user_id} )`)

    const seat_number = rows.filter(element => element.trip_id === trip_id).length + 1 || 1
    const is_booked = rows.filter(element => element.trip_id === trip_id && element.user_id === user_id).length > 0

    if (seat_number > 14) throw (all_seats_booked)
    if (is_booked) throw (booked_already)

    const book = await dbClient.query(`INSERT INTO BOOKINGS (user_id, trip_id, bus_id, trip_date, seat_number, trip_status)
                                        
                                        SELECT USERS.id AS user_id, TRIP.trip_id, TRIP.bus_id, TRIP.trip_date, ${seat_number}, 
                                        TRIP.status AS trip_status FROM TRIP JOIN USERS ON (TRIP.TRIP_ID = ${trip_id} AND USERS.ID = ${user_id});
        
                                        SELECT * FROM BOOKINGS WHERE (TRIP_ID = ${trip_id} AND USER_ID = ${user_id})`)

    // dbClient.end()

    res.send({ status: 'success', data: book[1].rows[0] })
} catch (error) {
    res.status(400).send({ status: 'error', error })
    }
}

// get all the bookings for a trip
const get_bookings = async (req, res) => {
    const { token } = req.body
    const e = { message: 'unauthorized access. kindly signup to view trips' }
    try {
      if (!token) throw (e)
      const verified = await jwt.verify(token, process.env.SECRET_KEY)
      let user_bookings

      // dbClient.connect()
      // if not admin, view all personal bookings
      if (!verified.is_admin) {
        user_bookings = await dbClient.query('SELECT * FROM public.bookings WHERE user_id = $1', [verified.user_id])
      } else {
        // give admin privilege to view all bookings from database
        user_bookings = await dbClient.query('SELECT * FROM public.bookings')
      }
      // dbClient.end()

      res.send({ status: 'success', data: user_bookings.rows })
    } catch (error) {
      res.status(400).send({ status: 'error', error })
    }
  }
// delete a booking
const cancel = async (req, res) => {
  const { token } = req.body
  const { id } = req.params

  const invalid = { message: 'unauthorized request' }
  const deleted = { message: "has previously been deleted or you're not allowed to delete this booking" }

  try {
    if (!token) throw (invalid)
    const { user_id } = await jwt.verify(token, process.env.SECRET_KEY)

    if (!user_id) throw (invalid)

    // dbClient.connect()
    const { rowCount } = await dbClient.query(`DELETE FROM BOOKINGS WHERE (trip_id = ${id} AND user_id =${user_id})`)
    // dbClient.end()

    if (rowCount === 0) throw (deleted)
    res.send({ status: 'success', data: { message: `Booking ${id} deleted successfully` } })
  } catch (err) {
    res.status(400).json({ status: 'error', error: err })
  }
}

module.exports = { trip, get_bookings, cancel }
