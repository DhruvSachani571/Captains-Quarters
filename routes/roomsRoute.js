const express = require("express");
const router = express.Router();


const Room = require('../models/roomSchema')


//Api to fecth details of rooms
router.get("/getallrooms",async(req,res) =>{

    try{
        const rooms = await Room.find({})//Here all rooms are fetched
        res.send(rooms)
    }catch{
        return res.status(400).json({ message: error});
    }
});

/**
 * Api to fecth details of rooms by a given room id
 * */
router.post("/getroombyid",async(req,res) =>{
    const roomid = req.body.roomid//an onbject roomid is created to find the room acoording to roomid


    try{
        const rooms = await Room.findOne({_id : roomid})
        res.send(rooms)
    }catch{
        return res.status(400).json({ message: error});
    }
});


//API to add new rooms


router.post("/addroom", async(req,res) => {

    try{
        const newroom = new Room(req.body) //newroom is created and the and is saved for the backend
        await newroom.save()
        res.send('new rooms Added Successfully')
    }catch(error){
        return res.status(400).json({error});
    }
});

module.exports = router;