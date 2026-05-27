import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authroutes from './routes/AuthRoutes.js'
import { errorHandler } from './middleware/error.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGODBURI || ''

if (!MONGO_DB_URI) {
  throw new Error('Mongo DB URI not set up')
}

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`Auction MarketPlace Server Running on port ${PORT}`)
}) 

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Success'
  })
})

app.use('/v1/auth', authroutes)
app.use(errorHandler)
mongoose.connect(MONGO_DB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Auction MarketPlace Server Running on port ${PORT}`)
  })
})