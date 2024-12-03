import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'
import 'express-async-errors'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (_, res) => {
  res.send('Welcome to the Edu Tech App Backend API!')
})

payload
  .init({
    express: app,
    secret: process.env.PAYLOAD_SECRET!,
  })
  .then(() => {
    app.listen(PORT, () => {
      payload.logger.info(`App URL: ${process.env.SERVER_URL}`)
    })
  })
