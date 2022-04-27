const mongoose = require("mongoose");


/**
 * The schema for room assignment
 */
const roomSchema = mongoose.Schema({

    name : {
        type : String,
        required: true
    },
    phonenumber :{
        type :Number,
        required : true
    },

    rentperday :{
        type:Number ,
        required : true
    },
    imageurls :[],
    currentbookings :[],//This arrays stores the bookings of the particular room in backend
    type :{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    }
} , {
    timestamps: true,
})

/**
 * Here the "rooms" model is created for backend and each room is stored there 
 */

const roomModel = mongoose.model('rooms',roomSchema)
module.exports = roomModel