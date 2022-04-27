import React, { useEffect , useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';

const { TabPane } = Tabs;

//This screen fetches the data of the current user from the back-end and displays the details and administartor's status of that user
//It uses tabs from "antd" to provide the details

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])
    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>
                        Name :{user.name}
                    </h1>
                    <h1>Email : {user.email}</h1>
                    <h1>isAdmin :{user.isAdmin ? 'Yes' : "No"}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>

            </Tabs>

        </div>
    )
}

export default Profilescreen
//Moreover this function provides details about the person's current booking and the status of the bookings

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings,setbookings] = useState([])

    useEffect(async () => {
        try {

            const data = await (await (axios.post('/api/bookingschema/getbookingsbyuserid', { userid: user._id }))).data;
            console.log(data)
            setbookings(data)
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {bookings && (bookings.map(booking =>{
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <h1>Check In Date: {booking.fromdate}</h1>
                            <h1>Check Out Date: {booking.todate}</h1>
                            <h1>Amount : {booking.totalamount}</h1>
                            <h1>Status : {booking.status == 'booked' ? 'CONFIRMED':''}</h1>
                        </div>

                    }))}
                </div>
            </div>
        </div>
    )
}