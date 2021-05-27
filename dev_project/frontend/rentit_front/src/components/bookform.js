import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './customerdetails';
import Review from './booksummary';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Alert from '@material-ui/lab/Alert';

import { connect } from 'react-redux'
import axios from 'axios';
import Eror from './eror';
import {Redirect } from 'react-router-dom'

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Rentene
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginTop:'100px',

    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop:'100px',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const steps = ['Customer details','Review your booking'];


function getStepContent(step,bookdetails,setbookdetails,setpayment,profile) {
  switch (step) {
    case 0:
      return <AddressForm bookdetails={bookdetails} profile={profile} setbookdetails={setbookdetails} setpayment={setpayment}/>;
    case 1:
      return <Review bookdetails={bookdetails} setbookdetails={setbookdetails}/>;
    default:
      throw new Error('Unknown step');
  }
}

function Checkout(props) {
  const [open,setopen] = React.useState(false)

  const [validationerror,setvalidationerror] = React.useState(false)

    const [bookdetails,setbookdetails] = React.useState({
        price:'',
        date:'',
        month:'',
        year:'',
        duration:1,

        wifi:'',
        house_TV:'',
        room_TV:'',
        house_refridgerator:'',
        room_refridgerator:'',
        purified_water:'',
        geyser:'',
        AC:'',
        cooler:'',
        breakfast:'',
        lunch:'',
        dinner:'',
        
        coupon:'',
        discount:'',
        month_price:'',
        savings:'',
        monthsavings:'',
        roomid:'',
        title:'',
        address:'',
        currency:'',

        firstname:'',
        lastname:'',
        mobile:'',
        country_code:'',
        alternate_mobile:null,
      
        paylater:false,

        capacity:'',
    })

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [myprofile,setmyprofile] = React.useState()

 
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const value = props.location.state.property_id;

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const [payment,setpayment] = React.useState('Pay now');

  React.useEffect(
      async () => {

        const config = {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
          };
          if(props.profile)
          {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${props.profile.id}/`,config);
           setmyprofile(res.data)
            var temp = value.coupon
            if(value.coupon==='')
            {
              temp = 'none';     
            }
            var t=value.price;
            var t1=((t*3.0)/100.0);
            t1=Math.round(t1);
            
            t=t+t1;

            setbookdetails(
                {
                  ...bookdetails,
                    price:t,
                    date:value.date,
                    month:value.month,
                    year:value.year,
                    duration:value.duration,
                    wifi:value.wifi,
                    house_TV:value.house_TV,
                    room_TV:value.room_TV,
                    house_refridgerator:value.house_refridgerator,
                    room_refridgerator:value.room_refridgerator,
                    purified_water:value.purified_water,
                    geyser:value.geyser,
                    AC:value.AC,
                    cooler:value.cooler,
                    breakfast:value.breakfast,
                    lunch:value.lunch,
                    dinner:value.dinner,
                    coupon:temp,
                    discount:value.discount,
                    month_price:value.month_price,
                    savings:value.savings,
                    monthsavings:value.monthsavings,
                    currency:value.currency,

                    roomid:value.roomid,
                    title:value.title,
                    address:value.address,

                    firstname:props.profile.first_name,
                    lastname:props.profile.last_name,
                    mobile:res.data.mobile,
                    country_code:res.data.country_code,
                    alternate_mobile:res.data.alternate_mobile,

                    capacity:value.capacity,

                    
                }
            )
        
          }
          
      }
      
  ,[props.location.state.property_id,props.profile])


  const handlePaymentSuccess = async (response) => {
    try {
    
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: `${process.env.REACT_APP_API_URL}/sourcehdnaj2iu0qejwba9022qjadnba/room/book/payment/1/`,
        method: "PUT",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      })
        .then((res) => {
          setopen(false)
            setActiveStep(activeStep + 1);
            setvalidationerror(false);
          
        })
        .catch((err) => {
          setopen(true)
        
        });
    } catch (error) {
    
    }
  };


  const handleNext = async () => {
    if(bookdetails.firstname==='' || bookdetails.lastname==='' || bookdetails.mobile.length <10 || bookdetails.country_code==='')
    {
     
       setvalidationerror(true);
    }
    else{

      if(activeStep===steps.length-1)
      {
        const res = await loadScript();
       

        var data = '';


        const bookfunc = async () => {

          const config = {
              headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `JWT ${localStorage.getItem('access')}`,
              },
            };
          const body = {
            data:bookdetails,
          }
          setopen(true);
          try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/room/book/`,body,config);
          
          data = res;
          
          
          
          

          var options = {
            key_id: process.env.REACT_APP_RAZORPAY_API_KEY, // in react your environment variable must start with REACT_APP_
            key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
            amount: data.data.price_to_be_paid,
            currency: bookdetails.currency.slice(2,),
            name: "Rentene",
            description: "Booking payment",
            image: "/logo.png", // add image url
            order_id: data.data.payment_id,
            handler: function (response) {
              // we will handle success by calling handlePaymentSuccess method and
              // will pass the response that we've got from razorpay
              handlePaymentSuccess(response);
            },
            prefill: {
              name: props.profile.first_name + " " + props.profile.last_name,
              email:props.profile.email ,
              contact: myprofile.mobile,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#528FF0",
            },
          };
         
      
          var rzp1 = new window.Razorpay(options);
          rzp1.open();

          }
          catch{
            setopen(false)
            setActiveStep(5);
            
          }
          
          }

          bookfunc();
      }
      else{
      
        setActiveStep(activeStep + 1);
        setvalidationerror(false);
      }
      
    }
    
  };



  if(activeStep===5)
  {
    return (<div>
    <CssBaseline /><main className={classes.layout}>
<Eror error={"Couldn't place your booking."}/></main></div>);
  }

  if(props.isAuthenticated===false)
  {
    return <Redirect to='/login'/>;
  }
  if(props.profile)
  {
    if(props.profile.is_seller===true)
    {
      return <Redirect to={{
        pathname: '/',
        state: { property_id: true }
      }}/>;
    }
    if(props.profile.profile_completed===false)
    {
      return <Redirect to={{
        pathname: '/dashboard/profile',
        state: { property_id: true }
      }}/>;
    }

  }


  if(props.profile){
  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>


        {
          validationerror ? <Alert severity="error">All required fields need to be filled!</Alert> : null
        }

      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

        <Paper className={classes.paper} elevation={5}>
          <Typography component="h1" variant="h4" align="center">
            Booking Form
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your booking.
                </Typography>
                <Typography variant="subtitle1">
                  Your booking has been successfully placed. We have emailed your booking confirmation.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,bookdetails,setbookdetails,setpayment,props.profile)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? `${payment}` : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
}




const mapStateToProps = state => ({
    profile: state.authreducers.user,
    isAuthenticated: state.authreducers.isAuthenticated,
  });

export default connect(mapStateToProps)(Checkout);