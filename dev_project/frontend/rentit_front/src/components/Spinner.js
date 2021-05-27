import React from 'react'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import Load from '../loading.avi'



function Spinner({loading}) {

   const override = css`
   display: block;
   margin: 0 auto;
   border-color: #f50057;
   color: #f50057;
    `;

    

    return (
            <div>

<video width="320" height="240" controls>
                    <source src={Load} type="video/avi" />
                   
                  
                  </video>
                {
                    loading ?  <video width="320" height="240" controls>
                    <source src={Load} type="video/avi" />
                    <source src={Load}  type="video/avi" />
                  
                  </video> : null
                }
              
            </div> 
    );
}

export default Spinner;
