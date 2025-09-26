const express = require('express')
require('./config/database')
const userRouter = require('./routes/userRouter')
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(userRouter)

app.listen(port, ()=>{
    console.log(`app is running on port: ${port}`)
})

