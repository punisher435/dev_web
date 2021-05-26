import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './css/App.css';
import Grid from '@material-ui/core/Grid';
import Discount from '../discount_off.png'
import Discount1 from '../discount.png'
import im from '../11.jpg'
import logo from '../logo.png'
import Modal from './couponmodal';

const useStyles = makeStyles({
  root: {
   
    width: 250,
    height:200,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    borderRadius:'10%',
   
    },
  root1:{
    width: 250,
    height:200,
    
    backgroundImage: `url(${im})`,
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition: 'center',
    borderRadius:'10%',
     
    padding:10,
     
 
  },
  root2:{
    width: 250,
    height:200,
     
     backgroundImage: `url(https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80)`,
     backgroundSize: 'cover',
     backgroundRepeat:'no-repeat',
     backgroundPosition: 'center',
     borderRadius:'10%',
      
     padding:10,
      
  
   },
   root3:{
    width: 250,
    height:200,
     
     backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXc7SQEr6PMnvjq8l6omWaNmibLDzw46Q60w&usqp=CAU)`,
     backgroundSize: 'cover',
     backgroundRepeat:'no-repeat',
     backgroundPosition: 'center',
     borderRadius:'10%',
      
     padding:10,
      
  
   },
  text:{
    color:'black',
    fontSize:'20px',
    fontWeight:'bold',
    textAlign:'left',
  },
  coupon:{
    color:'white',
    fontSize:'20px',
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'#7eca9c',
    borderRadius:'10%',
    paddingTop:4,
    paddingLeft:4,
    paddingRight:4,
    paddingBottom:4,
    width:'55%',
  },
  couponbg:{
  
  
  },
  button:{
    borderRadius:'10%',
    padding:0,
    margin:0,
    width: 250,
    height:200,
  },

  logo:{
    width:110,

    marginBottom:'30px',
  },
  
});

export default function CouponCard({mycoupon}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  var text= 'We lead your way';
  if(mycoupon.coupon_type==='off_price' && !mycoupon.admin_coupon)
  {
      text='People love you';
  }
  if(mycoupon.coupon_type!=='off_price' && !mycoupon.admin_coupon)
  {
      text='Head to your dream';
  }

  const [modal,setmodal] = React.useState(false);

  const handleOpen = () => {
    setmodal(true);
  };

  const handleClose = () => {
    setmodal(false);
  };

  return (

    <div>

    <Modal open={modal} handleopen={handleOpen} handleclose={handleClose} coupon={mycoupon}/>
    <Paper elevation={6} className={classes.root}>
    <Button className={classes.button} onClick={(e) => {e.preventDefault();handleOpen();}}>
     
   <div className={ mycoupon.admin_coupon ? classes.root1 : mycoupon.coupon_type==='off_price'? classes.root2 : classes.root3}>

    <img src={logo} className={classes.logo}/>

    <Typography  className={classes.text}>
       {text}
    </Typography>

    <div className={classes.couponbg}>
    <Typography variant="body1" className={classes.coupon}>
    {
              mycoupon.coupon_type==='off_price' ? `${mycoupon.currency.slice(0,1)} ${mycoupon.off} off` : `${mycoupon.off} % off`
          }
    </Typography>
    </div>

   </div>
      
   </Button>

    </Paper>
    </div>
  );
}