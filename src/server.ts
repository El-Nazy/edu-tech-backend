import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'
import Users from './payload/collections/Users'
import { PayloadRequest } from 'payload/types'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (_, res) => {
  res.send('Welcome to the Edu Tech App Backend API!')
})

const start = async (): Promise<void> => {
  await payload.init({
    express: app,
    onInit: (payload) => {
      const app = payload.express

      // Redirect API login endpoint
      app.post('/api/v1/users/sign-in', async (req, res, next) => {
        // Manually forward the request to the default login route

        // Call the default Payload login route handler directly
        try {
          const loginResponse = await payload.login({
            collection: Users.slug as 'users',
            req: req as PayloadRequest,
            data: req.body,
            res: res,
          })
          res.json(loginResponse) // Respond with the login result
        } catch (error) {
          res.status(401).json({
            errors: [
              {
                message: error.message,
              },
            ],
          })
          next(error) // If any error occurs during login, pass it to the error handler
        }
      })
    },
    secret: process.env.PAYLOAD_SECRET!,
  })

  app.listen(PORT, () => {
    payload.logger.info(`App URL: ${process.env.SERVER_URL}`)
  })
}

void start()
