const mongoose = require("mongoose")

/**
 * Schema for feedback assignment
 */

const feedSchema = mongoose.Schema({

    name: {
        type:String,
        required:true
    },
    email : {
        type : String , required : true
    },
    feedback : {
        type : String , required : true
    }
}, {
    timestamps : true,
})
/**
 * Here model feds is created at the back-end which stores the feedback of the users
 */

const feedModel = mongoose.model('feeds', feedSchema)
module.exports = feedModel
