import axios from "axios";
import React , {useState,useEffect}from "react";

function Feedback(){
    const[name , setname] = useState('')
    const[email,setemail] = useState('')
    const[feedback,setfeedback] = useState('')

    async function feed(){
        const user ={
            name,email,feedback
        }
        try{
            
            const result = await (await axios.post('/api/feedbackschema/feedback', user)).data
            
            setname('')
            setemail('')
            setfeedback('')
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
                            Feedback Form
                        </h1>
                        <input type="text" className="form-control" placeholder="name" value={name} onChange={(e) =>{setname(e.target.value)}} ></input>
                        <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) =>{setemail(e.target.value)}}></input>
                        <input type="text" className="form-control" placeholder="feedback"  value={feedback} onChange={(e) =>{setfeedback(e.target.value)}}></input>
                        <button className="btn btn-primary" onClick={feed}>Submit Feedback</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback