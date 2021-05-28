import React from 'react'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import Load from '../loading.gif'
import Grid from '@material-ui/core/Grid';




function Spinner({loading}) {

   const override = css`
   display: block;
   margin: 0 auto;
   border-color: #f50057;
   color: #f50057;
    `;

    return (
            <div>

                


                {
                    loading ?                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{height:'50vh'}}
                    >
                    <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    >
                    <img src={Load} style={{maxWidth:300,width:'50vw'}}/>
    
                    </Grid></Grid> : null
                }
                
                 
            </div> 
    );
}

export default Spinner;
