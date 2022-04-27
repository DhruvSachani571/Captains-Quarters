import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from 'antd'

const { TabPane } = Tabs;

function Adminscreen() {
//Here it checks wether the user is an administrator or not and if not it directily browses the user to home screen
    useEffect(() =>{

        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href='/home'
        }
    })
    return (
        <div className="mt-3 ml-3 mr-3 bs">
            <h1>Adminscreen</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms/>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom/>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users/>
                </TabPane>
                <TabPane tab="Feedback" key="5">
                    <Feedback/>
                </TabPane>
                <TabPane tab="Inquiry" key="6">
                    <Inquiry/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;

//	If the user is the administrator this function provides all bookings by fetching them from the backend.
//It also provides the duration of the booking


export function Bookings() {
    const [bookings, setbookings] = useState([])

    useEffect(async () => {
        try {

            const data = await (await axios.get("/api/bookingschema/getallbookings")).data
            setbookings(data)

        }
        catch (error) {
            console.log(error)

        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Bookings</h1>

                <table className="table table-border table-dark">
                    <thead>
                        <tr>
                            <th>
                                Room
                            </th>
                            <th>From</th>
                            <th>To</th>

                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>
                                    {booking.room}
                                </td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                            </tr>
                        }))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}



//It also provides the number of rooms available on the application by using the function which gets all rooms from the backend with their details.

export function Rooms() {
    const [rooms, setrooms] = useState([])

    useEffect(async () => {
        try {

            const data = await (await axios.get("/api/roomschema/getallrooms")).data
            setrooms(data)

        }
        catch (error) {
            console.log(error)

        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Rooms</h1>

                <table className="table table-border table-dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per day</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {rooms.length && (rooms.map(room =>{
                        return <tr>
                            <td>
                                {room.name}
                            </td>
                            <td>{room.type}</td>
                            <td>{room.rentperday}</td>
                        </tr>
                    }))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}



//Provides users list with their details from the backend along with that users admin status

export function Users(){
    const[users, setusers] = useState([])

    useEffect(async () => {
        try {

            const data = await (await axios.get("/api/userschema/getallusers")).data
            
            setusers(data)

        }
        catch (error) {
            console.log(error)

        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Users</h1>

                <table className="table table-border table-dark">
                    <thead>
                        <tr>
                            
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                    {users && (users.map(user =>{
                        return <tr>
                            <td>
                                {user.name}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'yes' : 'no'}</td>
                        </tr>
                    }))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}



export function Feedback(){

    const[feeds, setfeedback] = useState([])

    useEffect(async () => {
        try {

            const data = await (await axios.get("/api/feedbackschema/getallfeedback")).data
            setfeedback(data)

        }
        catch (error) {
            console.log(error)

        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Feedback</h1>

                <table className="table table-border table-dark">
                    <thead>
                        <tr>
                            
                            <th>Name</th>
                            <th>Email</th>
                            <th>Feedback</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {feeds && (feeds.map(feed =>{
                        return <tr>
                            <td>
                                {feed.name}
                            </td>
                            <td>{feed.email}</td>
                            <td>{feed.feedback}</td>
                        </tr>
                    }))}


                    </tbody>
                </table>
            </div>
        </div>
    );

}


export function Inquiry(){

    const[inqs, setinq] = useState([])

    useEffect(async () => {
        try {

            const data = await (await axios.get("/api/inquiryschema/getallinquiry")).data
            setinq(data)

        }
        catch (error) {
            console.log(error)

        }
    }, [])

    return (
        <div className="row">
            <div className="col-md-10">
                <h1>Inquiry</h1>

                <table className="table table-border table-dark">
                    <thead>
                        <tr>
                            
                            <th>Name</th>
                            <th>Email</th>
                            <th>Inquiry</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {inqs && (inqs.map(inq =>{
                        return <tr>
                            <td>
                                {inq.name}
                            </td>
                            
                            <td>{inq.email}</td>
                            <td>{inq.inquiry}</td>
                        </tr>
                    }))}


                    </tbody>
                </table>
            </div>
        </div>
    );

}



//It allows the administrator to add a room by providing the appropriate details
// This function allows to add the room to backend

export function Addroom(){

    const[name,setname] = useState('')
    const[rentperday , setrentpperday] = useState()
    const[description , setdescription] = useState()
    const[phonenumber , setphonnumber] = useState()
    const[type, settype] = useState()
    const[imageurl1 , setimageurl1] = useState()
    const[imageurl2 , setimageurl2] = useState()
    const[imageurl3 , setimageurl3] = useState()

    async function addRoom(){

        const newroom ={
            name,rentperday,description,phonenumber,type,
            imageurls :[imageurl1,imageurl2,imageurl3]
        }

        try{

           

            const result =  await (await axios.post("/api/roomschema/addroom",newroom)).data
            console.log(result)
        }catch(error){
            console.log(error)
    
        }
        
    }

    return(
        <div className="row">
            <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Room Name" value ={name} onChange={(e) => {setname(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Rent Per Day"value ={rentperday} onChange={(e) => {setrentpperday(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Description"value ={description} onChange={(e) => {setdescription(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Phone Number"value ={phonenumber} onChange={(e) => {setphonnumber(e.target.value)}}/>
                
            </div>
            <div className="col-md-5">
            <input type="text" className="form-control" placeholder="type" value ={type} onChange={(e) => {settype(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Image URL 1" value ={imageurl1} onChange={(e) => {setimageurl1(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Image URL 2" value ={imageurl2} onChange={(e) => {setimageurl2(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Image URL 3" value ={imageurl3} onChange={(e) => {setimageurl3(e.target.value)}}/>

                <div className="text-right">
                    <button className="btn btn-primary" onClick={addRoom}>Add Room</button>
                </div>
                
                
            </div>

        </div>
    );
}