//Importing URL
const express = require('express')
const connectDB = require('./config/db')

//Calling express method
const app = express()

//Connect to Database
connectDB()

//MiddleWare
app.use(express.json({extended:false}))

//Define Routes
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))


//Port
const PORT = 5000
app.listen(PORT, ()=> console.log(`Port is successfully running on ${PORT}`))