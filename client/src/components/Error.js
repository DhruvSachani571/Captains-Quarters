import React from "react";
/*
*The error component displays error 
 */

function Error({message}){

    return (
        <div>
            <div class="alert alert-danger" role="alert">
                {message}
            </div>
        </div>
    );
}

;export default Error;