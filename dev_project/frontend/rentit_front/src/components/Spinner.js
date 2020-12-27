import React from 'react'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";



function Spinner({loading}) {

   const override = css`
   display: block;
   margin: 0 auto;
   border-color: #f50057;
   color: #f50057;
    `;

    return (
            <div>
                <HashLoader
                css={override}
                size={150}
                color={"#f50057"}
                loading={loading}
                 />
            </div> 
    );
}

export default Spinner;
