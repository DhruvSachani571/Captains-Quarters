import axios from "axios";
import React , {useState,useEffect}from "react";

function Feedback(){
    const[name , setname] = useState('')
    const[email,setemail] = useState('')
    const[inquiry,setinquiry] = useState('')

    async function feed(){
        const user ={
            name,email,inquiry
        }
        try{
            
            const result = await (await axios.post('/api/inquiryschema/inquiry', user)).data
            
            setname('')
            setemail('')
            setinquiry('')
        }catch(error){
            console.log(error)

        }
        console.log(user)
    }
    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                    <div>
                        <h1>
                            Inquiry Form
                        </h1>
                        <input type="text" className="form-control" placeholder="name" value={name} onChange={(e) =>{setname(e.target.value)}} ></input>
                        <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) =>{setemail(e.target.value)}}></input>
                        <input type="text" className="form-control" placeholder="feedback"  value={inquiry} onChange={(e) =>{setinquiry(e.target.value)}}></input>
                        <button className="btn btn-primary" onClick={feed}>Submit Inquiry</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback