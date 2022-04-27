const mongoose = require("mongoose")

/**
 * Schema for inquiry assignment
 * 
 */

const inqchema = mongoose.Schema({

    name: {
        type:String,
        required:true
    },
    email : {
        type : String , required : true
    },
    inquiry : {
        type : String , required : true
    }
}, {
    timestamps : true,
})
/**
 * Here a model inqs is created in the backend and the inquiries submitted by users is stored
 */
const inquiryModel = mongoose.model('inqs', inqchema)
module.exports = inquiryModel
