const express = require("express");
const mongoose = require("mongoose");
const app = express();


/**
 * 
 * Here routes are defined which is later used in Api
 */


const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const feedbackRoute = require('./routes/feedbackRoute')
const inquiryRoute = require('./routes/inquiryRoute')
const bookingsRoute = require('./routes/bookingsRoute')

app.use(express.json())

/**
 * API setup takes place 
 */

app.use('/api/roomschema',roomsRoute)
app.use('/api/userschema', usersRoute)
app.use('/api/feedbackschema',feedbackRoute)
app.use('/api/inquiryschema',inquiryRoute)
app.use('/api/bookingschema' , bookingsRoute)

//Here url for connection with mongodb is established
var mongoURL = 'mongodb+srv://dhsachani:Dh05072001@cluster0.fzgti.mongodb.net/CaptainsQuartersHotel'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser : true})

var connection = mongoose.connection //Moongoose Connection established
/**
 * Here the result will appear on basis of success or failure of mongodb connection
 */

connection.on('error' , ()=>{
    console.log('Mongodb Connection Failed')
})

connection.on("connected" , ()=>{
    console.log('Mongodb Connection Succesful')
})



/**
 * Port which hosts the server in localhost
 */
const port = process.env.PORT || 5000;

app.listen(port, () =>console.log(`Node Server Started`));