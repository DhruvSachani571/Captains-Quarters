import axios from "axios";
import React , {useState,useEffect}from "react";
import { Link } from "react-router-dom";

function Landingscreen(){
    return(
        <div className="row landing justify-content-center">
            <div className="col-md-9 my-auto text-center" style={{borderRight: "5px solid white"}}>

                <h2 style={{color : 'white' , fontSize : '75px'}}>Captains Quarters Hotel</h2>
                <Link to='/home'>
                    <button className="btn btn-primary">Get Started</button>
                </Link>
            </div>
        </div>
    )
}
export default Landingscreen