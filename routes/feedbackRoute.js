const express = require("express");
const router = express.Router();
const Feed = require("../models/feedbackSchema")
//Here the new feedback route si created and it sends feedbacks to the backend

router.post("/feedback", async(req,res) => {

    const newfeed = new Feed(req.body)
    try{
        await newfeed.save()
        res.send('Feedback submitted successfully')

    }catch(error){
        return res.status(400).json({error});

    }
});

//This route is used to get feedbacks for the admin panel


router.get("/getallfeedback", async(req,res) =>{
    try{
        const feedback = await Feed.find()
        res.send(feedback)

    }catch(error){
        return res.status(400).json({error});

    }
})

module.exports= router