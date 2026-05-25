import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h1>Auction MarketPlace Server Running on port ${PORT}<h1>`)
}) 

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Success'
  })
})

app.listen(PORT, () => {
  console.log(`Auction MarketPlace Server Running on port ${PORT}`)
})