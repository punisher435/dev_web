import React from 'react'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";



function Spinner({loading}) {

   const override = css`
   display: block;
   margin: 0 auto;
   border-color: red;
    `;

    return (
            <div>
                <HashLoader
                css={override}
                size={150}
                color={"#123abc"}
                loading={loading}
                 />
            </div> 
    );
}

export default Spinner;
