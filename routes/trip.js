import dotenv from 'dotenv'
import express from 'express'
import { check } from 'express-validator'
import trip from '../controllers/trip'

dotenv.config()

const validation = [
    check('is_admin').not().isEmpty().isBoolean(), check('bus_id').isAlphanumeric().withMessage('invalid bus id'),
    check('origin').isAlphanumeric().withMessage('invalid address'), check('destination').isAlphanumeric().withMessage('invalid address'),
    check('trip_date').isISO8601().withMessage('not a valid date'), check('fare').isFloat().withMessage('is not a valid amount'),
  ]
const router = express.Router()

router.post('/trip', validation, trip.create_trip)
router.get('/trip', trip.get_trips)
router.patch('/trip/:trip_id', trip.cancel) // cancel trip

module.exports = router
