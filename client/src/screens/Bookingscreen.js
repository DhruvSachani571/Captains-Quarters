import React, { useState, useEffect } from 'react'
import axios from "axios";

import Loader from 'react-spinners/ClipLoader';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';


//Here this function provides all the information regarding booking  that a user is trying to make
//This information includes chen-in and check-out dates and total amount based on the number of days the user has selected

function Bookingscreen({ match }) {




    const [room, setroom] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
    const todate = moment(match.params.todate, 'DD-MM-YYYY')

    const totaldays = moment.duration(todate.diff(fromdate)).asDays()
    const [totalamount, settotalamount] = useState()
    useEffect(async () => {
        try {
            setloading(true);

            const data = (await axios.post('/api/roomschema/getroombyid', { roomid: match.params.roomid })).data;

            settotalamount(data.rentperday * totaldays)
            setroom(data);
            setloading(false);
        } catch (error) {
            setloading(false);
            seterror(true);


        }
    }, []);


   async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }

        try {
            setloading(true);
            const result = await axios.post('/api/bookingschema/bookroom', bookingDetails);
            setloading(false);
        } catch (error) {
            setloading(false);


        }
    }

//Here stripe checkout library is used to make the payment gateway and allow the user to bbo the room
    return (
        <div className='m-5'>

            {loading ? (<h1><Loader /></h1>) : error ? (<h1>Error..</h1>) : (<div>
                <div className='row mt-5 bs'>

                    <div className='col-md-6 m-2'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>

                    <div className='col-md-6 m-2'>
                        <div>
                            <h1>Booking Details</h1>
                            <hr />

                            <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                            <p>Check In Date : {match.params.fromdate} </p>
                            <p>Check Out Date : {match.params.todate} </p>
                            <p>Max Count : {room.maxcount}</p>
                        </div>

                        <div>
                            <h1>Amount</h1>
                            <hr />
                            <p>Total Days : {totaldays}</p>
                            <p>Rent Per Day : {room.rentperday} </p>
                            <p>Total Amount : {totalamount} </p>


                            <div style={{ float: 'right' }}>

                                <StripeCheckout
                                    amount={totalamount*100}
                                    token={onToken}
                                    currency='CAD'
                                    stripeKey="pk_test_51KcNScFV3KbmuF10jg7uXIeJ7cv5zkTagVwItaPjp66BUK3AZUHJWieYk0PpgczXcWxHCiw5UNlhznGdyNBW4hg000nkrHC1HA"
                                >
                                    <button className='btn btn-primary'>Pay Now</button>
                                </StripeCheckout>

                            </div>



                        </div>


                    </div>

                </div>



            </div>)}


        </div>
    );
}

export default Bookingscreen;