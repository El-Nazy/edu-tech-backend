import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (_, res) => {
  res.send('Welcome to the Edu Tech App Backend API!')
})

const start = async (): Promise<void> => {
  await payload.init({
    express: app,
    secret: process.env.PAYLOAD_SECRET!,
  })

  app.listen(PORT, () => {
    payload.logger.info(`App URL: ${process.env.SERVER_URL}`)
  })
}

void start()
