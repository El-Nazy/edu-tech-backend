import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import payload from 'payload'
import { mediaManagement } from 'payload-cloudinary-plugin'

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    // origin: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // optionsSuccessStatus: 200,
    credentials: true,
  }),
)

app.get('/', (_, res) => {
  res.send('Welcome to the Edu Tech App Backend API!')
})

app.use(
  mediaManagement({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  }),
)

void payload
  .init({
    express: app,
    secret: process.env.PAYLOAD_SECRET!,
  })
  .then(() => {
    app.listen(PORT, () => {
      payload.logger.info(`App URL: ${process.env.SERVER_URL}`)
    })
  })
