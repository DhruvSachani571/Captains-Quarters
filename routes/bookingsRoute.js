/**
 * bookingsRoute uses the models booking and room and apply the bookingSchema and roomSchema and provides the routes for getting the hsitory of bookings
 * 
 */

const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingSchema")
const Room = require("../models/roomSchema")
const moment = require("moment");
/**
 * Here uuid module is used to generate unique Id 
 */
const { v4: uuidv4 } = require('uuid');

/**
 * Here the stripe module is used for collecting the payemnet which van supervised by the adin/owner
 * We can also use the razor pay method but as user interface of stripe is much easier to understand it has been implemented
 */

const stripe = require('stripe')('sk_test_51KcNScFV3KbmuF10SrupA3hMdAYnVq3a6TsrATDzy611Jk2UDBrHubDOG394JcsSdoLr7sTE4NCdDpzqxSr5PvqI00ukvlqaH0')

router.post("/bookroom", async (req, res) => {
    const { room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token } = req.body;

    try {

        //A customer object is created for using functionalities of stripe module
        const customer = await stripe.customers.create({

            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create(
            {
                //Here as the stripe module deals in  cents the amount is multiplied by 100 to conver it to original amount
                amount: totalamount * 100,
                customer: customer.id,
                currency: 'cad',
                receipt_email: token.email




            },
            {
                idempotencyKey: uuidv4() //here a unique ID is created 
            }

        )

        if (payment) {

            //Here if the apyment is successful the new boooking will be created at the backend

            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: moment(fromdate).format('DD-MM-YYYY'),
                todate: moment(todate).format('DD-MM-YYYY'),
                totalamount,
                totaldays,
                transactionId: '1234'

            });

            //Here newbooking is saved after te payment is successful

            const booking = await newbooking.save()

            const roomtemp = await Room.findOne({ _id: room._id })

            //New room booking is pushed in server side

            roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fromdate).format('DD-MM-YYYY'), todate: moment(todate).format('DD-MM-YYYY'), userid: userid, status: booking.status });
            await roomtemp.save();






        }

        res.send("Room Booked Successfully")
    } catch (error) {
        return res.status(400).json({ error });

    }


});
/**
 * The below mentioned function is used to get bookings history by user
 */
router.post("/getbookingsbyuserid", async (req, res) => {

    const userid = req.body.userid

    try {
        const bookings = await Booking.find({ userid: userid })
        res.send(bookings)
    } catch (error) {
        return res.send.status(400).json({ error });

    }
});

/**
 * The below mentioned function returns the lsit of bookkings along with the booking details for the administartor
 */

router.get("/getallbookings", async (req, res) => {

    try {
        const bookings = await Booking.find()
        res.send(bookings)

    } catch (error) {
        return res.status(400).json({ error });

    }

});





module.exports = router