const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT
const app = express()

app.listen(port,console.log(`App running on ${port}`))
mongoose.connect(process.env.MONGO_URI,() => console.log("Connected") )
app.use(cors())
app.use(express.json())
app.use('/api',require('./routes/routes'))