import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import dbClient from '../db/connection'

const signup = async (req, res) => {
      // eslint-disable-next-line object-curly-newline
      const { email, first_name, last_name, password } = req.body
      const email_not_found = { message: 'the supplied email is already in use' }
      try {
          validationResult(req).throw()

          await dbClient.connect()
          const query = await dbClient.query('SELECT * FROM users WHERE email=$1', [email])

          if (query.rowCount > 0) throw (email_not_found)

          const hash = bcrypt.hash(password, 10)
          const insert = await dbClient.query(`INSERT INTO users (email, first_name, last_name, password) 
              VALUES ('${email}','${first_name}', '${last_name}','${hash}');
  
                  SELECT id as user_id, is_Admin FROM users WHERE email = '${email}' LIMIT 1`)
                  dbClient.end()

          const { user_id, is_admin } = insert.rows[0]
          const token = jwt.sign({ user_id, is_admin }, process.env.SECRET_KEY)
          return res.send({ status: 'success', data: { user_id, is_admin, token }, message: 'successfully registered' })
      } catch (err) {
         return res.send(err)
      }
}

const signin = async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { email, password } = req.body
    const user_not_found = { message: 'user with the supplied mail not found' }
    const wrong_password = { message: 'incorrect password' }

   try {
    validationResult(req).throw()

    await dbClient.connect()

    const query = await dbClient.query('SELECT id as user_id, is_admin, password as hashed_password FROM users WHERE email=$1 LIMIT 1', [email])
    dbClient.end()

    if (query.rowCount < 1) throw (user_not_found)

    const { user_id, is_admin, hashed_password } = query.rows[0]

    if (await bcrypt.compare(password, hashed_password)) {
        const token = jwt.sign({ user_id, is_admin }, process.env.SECRET_KEY)
        res.send({ status: 'success', data: { user_id, is_admin, token }, message: 'successfully loggedin' })
    } throw (wrong_password)
   } catch (err) {
       res.send(err)
   }
}

module.exports = { signup, signin }
