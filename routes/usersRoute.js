const express = require("express");
const router = express.Router();

const User = require("../models/userSchema")

/**
 * This API is used to register a user using the user Schema 
 */


router.post("/register", async(req, res) =>{

    const newuser = new User({name : req.body.name , email : req.body.email , password : req.body.password})

    try{
        const user = await newuser.save()
        res.send("User Registration Successful")

    }catch(error){
        return res.status(400).json({ error });

    }
});

/**
 * This API is used for looging in the system
 */

router.post("/login", async(req,res) =>{
    const {email , password} = req.body

    try{
        const user = await User.findOne({email : email , password : password})

        if(user) {
            const temp ={
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id
            }
            res.send(temp)
        }
        else{
            return res.status(400).json({ message : 'Login Failed'});
        }



    }catch(error){
        return res.status(400).json({ error });

    }



});

/**
 * This API is used to recieve list of all users of appplication for the admin panel
 */


router.get("/getallusers", async(req,res) => {
    try{
        const users = await User.find()
        res.send(users)
    }catch(error){
        return res.status(400).json({error})
    }
})


module.exports= router