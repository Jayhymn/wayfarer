import dotenv from 'dotenv'
import express from 'express'
import { check } from 'express-validator'
import user from '../controllers/user'

dotenv.config()
const router = express.Router()

router.post('/signup', [check('email').isEmail().withMessage('please enter a valid email address'),
    check('password').isLength({ min: 5 }).withMessage('your password must be minimum of 5 characters'),
    check('first_name').isAlpha().withMessage('the first name entered is invalid'),
    check('last_name').isAlpha().withMessage('the last name entered is invalid')], user.signup)

router.post('/signin', [check('email').isEmail().withMessage('please enter a valid email address'),
    check('password').isLength({ min: 5 }).withMessage('your password must be minimum of 5 characters')], user.signin)

module.exports = router
