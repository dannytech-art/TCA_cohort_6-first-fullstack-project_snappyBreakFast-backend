const { log } = require('console')
const express = require('express')
require('./config/database')
const app = express()
const port = process.env.PORT
app.use(express.json())


app.listen(port, ()=>{
    log(`app is running on port: ${port}`)
})