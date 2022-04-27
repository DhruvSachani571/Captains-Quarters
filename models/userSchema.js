const mongoose = require("mongoose")

/**
 * Here the schema for user is created
 */

const userSchema = mongoose.Schema({

    name : {
        type: String,
        required: true
    },
    email: {
        type :String , required : true
    },
    password : {
        type: String, required: true
    },
    isAdmin:{
        type: Boolean,default: false
    }



}, {
    timeStamps :true,

})

/**
 * here users model is created in backend which contains all the necessary information of the user
 */

const userModel = mongoose.model('users',userSchema)

module.exports = userModel