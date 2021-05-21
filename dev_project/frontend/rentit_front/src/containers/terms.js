import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Sellerpolicies from './sellerpolicies';
import Customer from './customerpolicies';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
   
    paperclass:{
        width:'90vw',
        maxWidth:1300,
        padding:20,

    }
    }));

function Terms({profile,isAuthenticated}) {
const classes=useStyles();

    if(profile){
    return (
        <div>
        <br/>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
        <Paper elevation={5} className={classes.paperclass}>
            <br />
        {
          !profile.is_seller ? <Customer /> : <Sellerpolicies />
        }
         <br />
        </Paper>
       </Grid>
            
        </div>
    )}
    else{
        return (
            <div>
        <br/>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
        <Paper elevation={5} className={classes.paperclass}>
            <br />
            <Customer /> 
         <br />
        </Paper>
       </Grid>
            
        </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    profile : state.authreducers.user
  });
  
  export default connect(mapStateToProps)(Terms);
