
const express = require('express')
const cors = require('cors')

require('./config/database')

const userRouter = require('./routes/userRouter')

const restaurantRouter = require('./routes/restaurantRouter')

const foodRouter = require('./routes/foodRouter')

const cartRouter = require("./routes/cartRouter")

const transactionRouter = require('./routes/transactionRouter')

const port = process.env.POR

const app = express()

app.use(express.json())

app.use(cors('*'))

app.use(userRouter)

app.use(restaurantRouter)

app.use(foodRouter)

app.use(cartRouter)

app.use(transactionRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get("/", (req, res) => {
  res.send("SnapBreakfast API is running on Vercel!")
})

module.exports = app;
