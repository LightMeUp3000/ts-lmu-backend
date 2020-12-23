import { config } from 'dotenv'
config()
import * as express from 'express'
import { apiV1Controllers } from './api/v1/controllers'

export const app = express()

const APP_PORT = process.env.PORT || 8080;

app.use('/v1/', apiV1Controllers)

app.listen(APP_PORT, () => console.log(`Server running on ${process.env.PORT}!`))
