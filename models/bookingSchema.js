const mongoose = require("mongoose")

/**
 * This is schema for bookingroom
 */

const bookingSchema = mongoose.Schema({

    room:{
        type :String , required: true
    },
    roomid : {
        type :String , required :true
    },
    userid:{
        type:String, required : true
    },
    fromdate:{
        type : String, required :true
    },
    todate :{
        type : String , required :true
    },
    totalamount:{
        type :String , required : true
    },
    totaldays:{
        type: Number, required : true
    },
    transactionId:{
        type: String , required : true
    },
    status :{ //Here the default status of the room is stated as booked which is changed according to the user's choice for booking
        type : String , required : true, default:'booked'
    }

},{
    timestamps : true,
})

/**
 * Here the model bookings is created in backend which stores all the bookings made by the user
 */

const bookingmodel = mongoose.model('bookings', bookingSchema);

module.exports = bookingmodel