import dotenv from 'dotenv'
import express from 'express'
import { check } from 'express-validator'
import booking from '../controllers/bookings'

dotenv.config()

const router = express.Router()

router.post('/booking', booking.trip)

router.get('/booking', [
    check('is_admin').isBoolean().equals('true').withMessage('unauthorized access!'),
    check('user_id').isISO8601().withMessage('not a valid date'),
  ], booking.get_bookings)

router.delete('/booking/:id', booking.cancel)

module.exports = router
