import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
   
  myclass:{
      fontSize: '23px',
  }
  }));

function Customerpolicies() {

    const classes = useStyles();
    return (
        <div>

<Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Typography variant="h3">Customer Policies</Typography>
            </Grid>
            <br/>
            <br/>

            
        </div>
    )
}

export default Customerpolicies
