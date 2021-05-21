import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
   
  myclass:{
      fontSize: '23px',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
  },
  myclass2:{
    fontSize: '23px',
    [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
},

myclass3:{
    [theme.breakpoints.down('md')]: {
        fontSize: '35px',
      },
},
  myclass1:{
    fontWeight: 'bold',
  },
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
            <Typography variant="h3" className={classes.myclass3}>Customer Policies</Typography>
            </Grid>
            <br/>
            <br/>

            <ol>


            <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>All customers must present valid photo identification proof at the time of check-in. 
            The identification proofs accepted are Aadhar Card, Driving License, Voter ID Card, and Passport. </Typography></li>

        
        </Grid>
        </Grid>
        <br />

        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>If you face any difficulty at check-in and the issue is not resolved by the Hostel/property authorities, you are requested to contact us immediately. We will verify the issue and take the necessary actions.  </Typography></li>

        
        </Grid>
        </Grid>
        <br />

        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>Some hostels/rooms/any
             property are gender-specific. So you are requested to read the description of a particular property.  </Typography></li>

        
        </Grid>
        </Grid>
        <br />


        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>Some hostels/rooms/any property have multiple
             occupancies. So you are requested to read the description. </Typography></li>

        
        </Grid>
        </Grid>
        <br />


        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>  You have the option of paying online, you can use Debit Card/Credit Card/UPI/Net Banking. 
In case of any problem during payment, you can contact us.</Typography></li>

        
        </Grid>
        </Grid>
        <br />


        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}> Early check-in is not possible.
             You are only allowed to check in on the date you mentioned while booking the room/any property.  You may check-in after your booking date as well but before the booking end date.</Typography></li>
            
        
        </Grid>
        </Grid>
        <br />


        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>     You will not be allowed to stay
             after the end of your booking period. You are supposed to leave on the other day of the last day of your booking.
In case you don't want to leave, you may extend your booking. </Typography></li>

        
        </Grid>
        </Grid>
        <br />

       


       


            </ol>

            <Typography variant="h5" className={classes.myclass1}>BOOKING EXTENSION POLICY</Typography>
            <br />
            <ol>


            <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>     You can extend your booking as long as
             that room/property is not booked by someone else on or after the end date of your booking. </Typography></li>

        
        </Grid>
        </Grid>
        <br />



        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>   The maximum booking extension limit is two years. 
            
            
            </Typography></li>

        
        </Grid>
        </Grid>
        <br />


        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>You may again select the facilities that you want to use while extending your booking period. 
            
            </Typography></li>

        
        </Grid>
        </Grid>
        <br />


            </ol>




            <Typography variant="h5" className={classes.myclass1}>CANCELLATION POLICY</Typography>
            <br />
            <ol>


            <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>    You can cancel your booking on our website.  </Typography></li>

        
        </Grid>
        </Grid>
        <br />



        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>  The applicable refund amount will be credited to you within 5-7 working days. 
            
            </Typography></li>

        
        </Grid>
        </Grid>
        <br />


        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        >
            
            <Grid item xs={12}>

      
            <li className={classes.myclass}><Typography variant="h5" className={classes.myclass2}>Following will be the refund amount in case of cancellation:

            <ul>

            <li>
            If you cancel your booking within five
             days of placing your booking, you will be given a full refund, i.e.,  100% of the money you paid.
            </li>

            <li>
            If you cancel your booking after five days but within seven days of placing your booking, you will be given 70% of the total amount you paid. 

            </li>
            <li>If you cancel your booking after seven days of placing your booking, <strong>no refund will be given.</strong></li>
            <li>    • If you cancel your booking after the starting of your booking period and within seven days, you will be given 70% of the total amount you paid. <strong>No refund after seven days.</strong><br />
In case of any emergency, you may contact us. </li>

            </ul>
            </Typography></li>

        
        </Grid>
        </Grid>
        <br />


            </ol>



            
        </div>
    )
}

export default Customerpolicies
