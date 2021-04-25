import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import './css/App.css';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles({
  root: {
    width:'80vw',
    maxWidth: 300,
    boxShadow: '10px 10px 5px grey',
    
  },
  buttonclassnew:{
    color:'white',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  title1: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
  coupontext:{
    color: 'white',
    padding: '2px 5px 2px 5px',
  },
  imgclass:{
    width: '100%',
  },
  imgclass1:{
    width:'70vw',
    maxWidth: 80,

  }
  
});

export default function CouponCard({mycoupon}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      <div className="blockcoupon">
        <div className="couponborder">
          {
            mycoupon.coupon_type==='off_price' ? <div className={classes.imgclass1}><img src='/discount_off.png' className={classes.imgclass}/></div> : <div className={classes.imgclass1}><img src='/discount.png' className={classes.imgclass}/></div>
          }

          
       
       
      <Grid
  container
  direction="column"
  justify="flex-start"
  alignItems="flex-start"
  
>
 

  <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  
>

        <Typography className={classes.title} color="textSecondary">
            {
              mycoupon.coupon_type==='off_price' ? `${mycoupon.currency.slice(0,1)} ${mycoupon.off} off` : `${mycoupon.off} % Discount`
          }
        </Typography>

</Grid>
        
        <br />
        <Grid
  container
  direction="row"
  justify="flex-start"
  alignItems="flex-start"
  
>
  <Grid item xs={2}>
        <div className="circle2" ></div></Grid>

          <Grid item xs={8}>
          <Typography variant="body2" className={classes.title1} component="p">
        Applicable from - {
              mycoupon.valid_from
          } on some specific products, 
           
        Min. price for coupon to be applicable is {mycoupon.currency} {
              mycoupon.min_price
          }
         ,
          {
            mycoupon.max_off_price ?  `Max discount will be ${mycoupon.currency} ${mycoupon.max_off_price},` 
              : null
          
          }
        
        
        Expiry on 
          
          {
              mycoupon.expiry_date
          }
      
        
          </Typography>
          </Grid>


        <Grid item xs={2}>
        <Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="flex-start"
  
>
        <div className="circle3"></div></Grid></Grid>
        </Grid>
        
        </Grid>
        

       
        


        <br />

        <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  
  
>
  <div className="titlecoupon">
<Typography variant="h5" component="h2" className={classes.coupontext}>
        {mycoupon.coupoun_code}
        </Typography>
        </div>
        

</Grid>

       
      
        
        
        
        
       
          
       
        
      <br />
      
      
      <Link to={{
    pathname: `/dashboard/my_coupons/edit`,
    state: { property_id: mycoupon.coupoun_code}
  }} style={{textDecoration:'none'}}><Button size="small" className={classes.buttonclassnew}>
          Edit
        </Button></Link>
        <Link to={{
    pathname: `/dashboard/my_coupons/delete`,
    state: { property_id:mycoupon.coupoun_code,url:'sourcesfnsjfn231/mycoupons' ,url1:'my_coupons' }
  }} style={{textDecoration:'none'}}><Button size="small" className={classes.buttonclassnew}>
          Delete
        </Button></Link>
        </div>



        </div>
    </div>
  );
}