const express = require("express");
const router = express.Router();
const Inq = require("../models/inquirySchema")

//Here the new inquiry route is created and saved for the backend

router.post("/inquiry", async(req,res) => {

    const newInquiry = new Inq(req.body)

    /**
     * Here new the data entered by user is saved
     */
    try{
        await newInquiry.save()
        res.send('Inquiry submitted successfully')

    }catch(error){
        return res.status(400).json({error});

    }
});

//It makes routes to get all inquiries for the admin panel

router.get("/getallinquiry", async(req,res) =>{
    try{
        const inquiry = await Inq.find()
        res.send(inquiry)

    }catch(error){
        return res.status(400).json({error});

    }
})



module.exports= router