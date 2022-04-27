import React, { useState, useEffect } from 'react'
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const { RangePicker } = DatePicker;

/**
 * this function provides list of hotels for the front screem
 * Here user can choose option to view more specific details about the room
 * Moreover user can also filter rooms accordingly through this function
 * 
 */
function Homescreen() {

    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const[fromdate , setfromdate] = useState()
    const[todate , settodate] = useState()
    const[ duplicaterooms , setduplicaterooms ] = useState([])
    
    const [type , settype] = useState('All')
    useEffect(async () => {
        try {
            setloading(true)
            const data = (await axios.get('/api/roomschema/getallrooms')).data
            setduplicaterooms(data)
            setrooms(data)
            setloading(false)
        } catch (error) {
            seterror(true)
            console.log(error)
            setloading(false)
        }
    }, []);

    //Here DatePicker and moment has been used to filter rooms

    function filterByDate(dates)
    {
        

        setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
        settodate(moment(dates[1]).format('DD-MM-YYYY'))

        var temprooms = []
        var availability = false
        for(const room of duplicaterooms){

            if(room.currentbookings.length >0){

                for(const booking of room.currentbookings){
                    if((!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate , booking.todate))
                    && (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate , booking.todate))
                    )
                    {
                        if(
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.todate 
                        ){
                            availability = true
                        }

                    }
                }
            }

            if(availability == true || room.currentbookings.length == 0){
                temprooms.push(room);
            }

            setrooms(temprooms)
        }
    }

    function filterByType(e){

        if(e!== 'All'){

            const temprooms = duplicaterooms.filter(room => room.type.toLowerCase()== e.toLowerCase())
            setrooms(temprooms)

        }
        else{
            setrooms(duplicaterooms)
        }
        
        
    }


    return (
        <div className='container'>

            <div className='row mt-5'>
                <div className='.col-md-3'>

                    <RangePicker format="DD-MM-YYYY" onChange={filterByDate}/>

                </div>

                <div className='col-mid-3'>
                <select className='form-control' value={type} onChange={(e) => {filterByType(e.target.value)}}>
                    <option value="All">All</option>
                    <option value="Hotel Unit">Hotel Unit</option>
                    <option value="1BR Studio Room">1BR Studio Room</option>
                    <option value="2BR Studio Room">2BR Studio Room</option>
                </select>
                </div>

                
            </div>

            <div className='row justify-content-center mt-5'>
                {loading ? (<h1><Loader/></h1>) : error ? (<h1>Error</h1>) : (rooms.map(room => {
                    return <div className='col-md-9 mt-2'>
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>;
                }))}
            </div>

        </div>
    );
}

export default Homescreen