import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
/**
 * The Loader components is used to display loader animations while the application is fetching the required details
 * @returns Puffloader
 */

function Loader(){
    let [loading, setLoading] = useState(true);
 

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
//Here the react loader is used 

    return(
        <div style={{marginTop:'150px'}} >
            <div className="sweet-loading text-center">
      

      <PuffLoader color={'#000'} loading={loading} css='' size={80} />
    </div>

        </div>
    )

}

export default Loader