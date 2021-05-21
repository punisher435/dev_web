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




function Sellerpolicies() {
    const classes = useStyles();
    return (
        <div>
             <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Typography variant="h3">Seller Policies</Typography>
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

      
            <li className={classes.myclass}><Typography variant="h5">It is mandatory to upload valid photo identification proof when filling the form to 
                list your rooms/hostel/shops/apartment. 
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

      
            <li className={classes.myclass}><Typography variant="h5">Our agent will verify your property, and once it is verified, it will be listed on our website for renting.  </Typography></li>

        
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

      
            <li className={classes.myclass}><Typography variant="h5">
                
            Customers will be given the option to pay online or through cash at the time of settling in. 
            <ul>
                <li>If a customer pays through online mode, then the money will be transferred 
                    into our company's account, and it will be credited to your account after seven days. </li>

                <li>   If a customer opts for the cash payment method, then he/she will pay you in cash, and you're requested to transfer our share within seven days by cash or through online mode. 
In case of any problem in transferring money, you can contact us. <br/>
<strong>NOTE:</strong> If you don't transfer our share, then we'll be forced to take legal action against you, and you will be prohibited from using our website to rent your property.</li>
            </ul>
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

      
            <li className={classes.myclass}><Typography variant="h5">
                
            If a customer cancels his booking, then the following will be the refund amount:
            <ul>
                <li>If he/she cancels within five days of placing their booking, then he/she will be given a full refund.  </li>

                <li>   If he/she cancels after five days but before seven days of placing their booking, then he/she will be given 70% of the total amount as a refund. </li>
                <li>If he/she cancels after seven days of placing their booking, then he/she will be given 50% of the total amount as a refund. 
                <br/>
<strong>NOTE:</strong> You have to transfer the refund amount to our company's bank account within the fixed deadline set by us.


                </li>

             






            </ul>
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

      
            <li className={classes.myclass}><Typography variant="h5">In case of any additional rules and guidelines, mail us on our company's official e-mail id. 
<br/><strong>NOTE:</strong> This will be shared with our customers on our website. 
*Rentene does not allow its sellers to cause any harm to its customers in case of any adherence to the seller's rules and guidelines.* </Typography></li>

        
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

      
            <li className={classes.myclass}><Typography variant="h5"> You're not allowed to disclose any private information between us to any customer. In case you are found doing so, legal action will be taken against you. 

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

      
            <li className={classes.myclass}><Typography variant="h5">The price of property entered at the time of filling out the form will be given to you no matter what price we show on the website (Price shown on the website might include our percentage of share).
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

      
            <li className={classes.myclass}><Typography variant="h5">In case of discounts given by us (e.g., discount coupons), the discount amount will be cut from our bank account, and you will get your full money of the property. 
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

      
            <li className={classes.myclass}><Typography variant="h5">   If you want to give a discount on your property, then the discount money will be cut from your share, not our company's account.
So, the amount of money you'll get = Actual price of the property – Discount price.
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

      
            <li className={classes.myclass}><Typography variant="h5">    If someone comes to you asking to rent your property in person, then you're requested to make him book the property from our website.
If they don't rent the property from our website, you have to notify us that this particular property of yours has been booked so that we can remove that property from non-booked ones.
<br/><strong>NOTE:</strong> If you don't notify us and someone else books that same property from our website, you'll be held responsible for this. And then you have to refund the total amount to our customer.  </Typography></li>

        
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

      
            <li className={classes.myclass}><Typography variant="h5"> Any kind of vulgarity and obscenity in language/photo while filling the form will lead us to prohibit you from using our website to rent your property. 
  </Typography></li>

        
        </Grid>
        </Grid>
        <br />





        </ol>
            
        </div>
    )
}

export default Sellerpolicies
