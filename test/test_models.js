

//import the Data models
const User = require('../models/userSchema');
const Room = require('../models/roomSchema')
const Booking = require("../models/bookingSchema")
const assert = require('assert');
const stripe = require('stripe')('sk_test_51KcNScFV3KbmuF10SrupA3hMdAYnVq3a6TsrATDzy611Jk2UDBrHubDOG394JcsSdoLr7sTE4NCdDpzqxSr5PvqI00ukvlqaH0')
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


/**
 * Here as all the errors for logging in is defined in front-end and as the payment is made using stripe module so the error is developed according to that module.
 * Hence the test cases are made for following cases:
 *1. Registration of a new user
 *2.Creation of room by administrator
 * 
 */


describe('Creating documents in MongoDB', () => {

    it('Creates a New User', (done) => {
        const newUser = new User({ name: 'Galib', email: 'hello@gmail.com', password: '1124', isAdmin: true });

        newUser.save() // returns a promise after some time
            .then(() => {
                //if the newUser is saved in db and it is not new
                assert(!newUser.isNew);
                done();
            });
    });

    it('Fails to create a New User', (done) => {
        const newUser = new User({ name: '', email: 'hello@gmail.com', password: '1124', isAdmin: true });
        try {
            newuser.save()
        } catch (error) {
            //if the newUser is not saved in db and it is new
            assert(newUser.isNew);
            done();
        }
    });


    /////////////////////////////////////////
    it('Creates a New Room', (done) => {
        const newRoom = new Room({
            name: "Captains Quarters Hotel",
            maxcount: 4,
            phonenumber: 1234567,
            rentperday: 49,
            imageurls: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/81/28/4c/our-comfortable-beds.jpg?w=800&h=-1&s=1"],
            currentbookings: [],
            type: "Hotel Unit",
            description: "A damage of $100 which will be returned back if the condition of room is intact"
        });

        newRoom.save() // returns a promise after some time
            .then(() => {
                //if the newRoom is saved in db and it is not new
                assert(!newRoom.isNew);
                done();
            });
    });
    ///////////////////////////////////
    it('Creates a New Booking', (done) => {

        const customer = stripe.customers.create({

            email: 'hello@gmail.com',
            source: 444444444
        })

        const payment = stripe.charges.create(
            {

                amount: 500 * 100,
                customer: customer.id,
                currency: 'cad',
                receipt_email: 'hello@gmail.com'

            },
            {
                idempotencyKey: uuidv4()
            }

        )

        if (payment) {

            const newbooking = new Booking({
                room: "Captains Quarters Hotel",
                roomid: 456456465,
                userid: 5555,
                fromdate: moment("22-02-2022").format('DD-MM-YYYY'),
                todate: moment("22-03-2022").format('DD-MM-YYYY'),
                totalamount:500,
                totaldays:3,
                transactionId: '1234'

            });

            newbooking.save()// returns a promise after some time
                .then(() => {
                    //if the newUser is saved in db and it is not new
                    assert(!newbooking.isNew);
                    done();
                });

        }

    });


});