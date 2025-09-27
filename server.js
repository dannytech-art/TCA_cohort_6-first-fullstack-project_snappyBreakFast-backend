const express = require('express')
require('./config/database')
const userRouter = require('./routes/userRouter')

const app = express()
app.use(express.json())
app.use(userRouter)

app.get('/', (req, res) => {
  res.send('🚀 SnapBreakfast API is running on Vercel!')
})

module.exports = app
