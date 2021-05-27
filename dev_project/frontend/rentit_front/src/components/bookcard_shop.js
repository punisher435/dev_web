import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../components/bookcarddatepicker'
import Cancellation from '../components/CancellationPolicyPopover'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MonthSelect from './monthselect_shop'
import FacilityIcon from './FacilityIconProvider_shop'

import axios from 'axios'

import SuccessSnackbars from './success_snackbar'
import ErrorSnackbars from './error_snackbar'

import { connect } from 'react-redux'

import {Link} from 'react-router-dom';

import ScrollArea from 'react-scrollbar'; 

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;
const useStyles = makeStyles((theme) => ({
  root1: {
    
  },
  scrollclass:{
    overflowX: 'hidden',
    overflowY: 'auto',
    height:'150px',
  },
}));

function BoolCard({details,isAuthenticated,loginpage,setloginpage,profile}) {
  const classes = useStyles();
  const [no,setno] = React.useState(0)
  const [openme,setopenme] = React.useState(false)
  const [openme1,setopenme1] = React.useState(false)
 
  const [bookvalues,setbookvalues] = React.useState({
    price:'',
    date:'',
    month:'',
    year:'',
    duration:1,
    wifi:'',
    TV:'',
   
    purified_water:'',
   
    AC:'',
    cooler:'',
    
    coupon:'',
    discount:'',
    month_price:'',
    savings:'',
    monthsavings:'',
    shopid:'',
    title:'',
    address:'',
    currency:'',

})
  const [values, setValues] = React.useState({
    couponCode: '',
  });



  const y=details.owner_discount+details.company_discount+details.fake_discount+details.commission;
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [capacity,setcapacity] = React.useState();




  const [booked,setbooked] = React.useState(true);
  const [date,setdate] = React.useState(details.bookedtill)
 /*  date.setDate(date.getDate() + 1); */


  const [price,setprice] = React.useState('')

  const handlelogin = event => {
      event.preventDefault();
      setloginpage(true);
  }

  
  React.useEffect(() => {
    setdate(details.bookedtill);
    if(date != undefined){
        if( ( (parseInt(date.slice(8,)) < selectedDate.getDate()-1) && (parseInt(date.slice(5,7))==selectedDate.getMonth()+1) && (parseInt(date.slice(0,4))==selectedDate.getFullYear()) ) || 
        ( (parseInt(date.slice(5,7))<selectedDate.getMonth()+1) && (parseInt(date.slice(0,4))==selectedDate.getFullYear()) ) ||  (parseInt(date.slice(0,4))<selectedDate.getFullYear()) )
    {
        setbooked(false);
    }
    else{
        setbooked(true);
    }
    }

    var x = details.cost_electricity +details.cost_water + details.final_price + details.cost_wifi + details.cost_TV + details.cost_purified_water + details.cost_AC + details.cost_cooler


    setbookvalues({...bookvalues,    date:selectedDate.getDate(),
        month:selectedDate.getMonth()+1,
        year:selectedDate.getFullYear(),wifi:details.wifi,TV:details.TV,
   
purified_water:details.purified_water,AC:details.AC,cooler:details.cooler,
price:x,month_price:x,discount:details.owner_discount+details.company_discount+details.commission+details.fake_discount,
savings:details.price - details.final_price,monthsavings:details.price - details.final_price,shopid:details.shop_id,title:details.title,address:details.location,currency:details.currency,
});



  
  },[date,details,selectedDate,profile])

  const handlecoupon = async (e) => {
      e.preventDefault();
      if(bookvalues.coupon!='' && no==0)
      {
        try{
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                params:{
                    price:bookvalues.price,
                    discount:bookvalues.discount,
                    savings:bookvalues.savings,
                    shopid:bookvalues.shopid
                   },
              };

           
            
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcefsejfnsjcn9302/coupon/shop/apply/${bookvalues.coupon}/`,config,config);

       
          setbookvalues({...bookvalues,price:res.data[1],discount:res.data[3],savings:res.data[2]})
          setno(1);
          setopenme(true)
    
          
    
          
          }
          catch{
            setopenme1(true)
          }
      }
  }


  const oncouponChange = e => {
      setbookvalues({...bookvalues,coupon:e.target.value})
  }


  const [newdate11,setnewdate11] = React.useState(new Date(Date.now()))

  React.useEffect(() => {
    var tempnew11 = new Date(Date.now());
    tempnew11.setFullYear(parseInt(details.bookedtill.slice(0,4)));
    tempnew11.setMonth(parseInt(details.bookedtill.slice(5,7))-1);
    tempnew11.setDate(parseInt(details.bookedtill.slice(8,))+1);
    setnewdate11(tempnew11);
  },[])



  return (
      <div>
      <SuccessSnackbars openme={openme} setopenme={setopenme} message={'Coupon applied successfully!'}/>
      <ErrorSnackbars openme={openme1} setopenme={setopenme1} message={'Coupon not applicable!'}/>
    <Card elevation={10}>
        {
            isAuthenticated ? null : <Grid container alignItems='center' justify='space-around'  style={{ backgroundColor: '#cfe8fc'}}>
            <Grid item>
                <Typography variant="subtitle1">
                    Login to get exclusive deals
                </Typography>
            </Grid>
            <Grid item>
                <Button color="secondary" onClick={event => {handlelogin(event);}}>
                    login
                </Button>
            </Grid>

        </Grid> 
        }
            


        <CardContent>

        <Box component="fieldset" mb={1} borderColor="transparent">
        <Typography variant="h5" component="legend">
            {details.title}
            </Typography>
        <Grid container alignItems="center">    
            <Grid item>
                <Rating name="read-only" value={parseFloat(details.avg_rating)} readOnly  />
            </Grid>
            <Grid item>
            <Typography variant="subtitle1">({parseFloat(details.reviews)})</Typography>
            </Grid>
        </Grid>
      </Box>

    <Divider/>


        <Box component="fieldset" mt={1} borderColor="transparent">
            <Grid container alignItems="center" spacing={1}>
                <Grid item  style={{ paddingBottom: '0px'}}>
                    <Typography variant="h5" color="textSecondary" display = 'inline' >
                    {details.currency} {details.final_price}
                    </Typography>
                </Grid>
                <Grid item style={{ paddingBottom: '0px'}}>
                    <Typography variant="subtitle1" color="textSecondary" display = 'inline'>
                        <strike>{details.currency} {details.price}</strike>
                    </Typography>
                </Grid>
                <Grid item style={{ paddingBottom: '0px'}}>
                    <Typography variant="subtitle2" color="textSecondary" display = 'inline'>
                        {y}% off
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant='caption'  style={{linlaundryHeightBottom:'0'}}>
            (inclusive of all taxes)
             </Typography>      
        </Box>

        
            <Grid container justify="space-around" alignItems='bottom' >
                <Grid item xs={6}>
                        <DatePicker date={selectedDate} set={setSelectedDate} bookvalues={bookvalues} setbookvalues={setbookvalues}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Box mt={1}>
                            <Grid container justify='center'>
                                <Grid item>
                                    <MonthSelect bookvalues={bookvalues} setbookvalues={setbookvalues}/>
                                    
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    
            </Grid>

            

{/* 
          <Facility type='Breakfast' price='price'/>

          <Facility type='Lunch' price='price'/>

          <Facility type='Dinner' price='price'/>

          <Facility type='wifi' price='price'/> */}
        <ScrollArea
            speed={0.8}
            
            horizontal={false}
            
            
            >
           
           <div className={classes.scrollclass}>   <FacilityIcon post={details} bookvalues={bookvalues} setbookvalues={setbookvalues}/></div>
        
      
        </ScrollArea>

        
          <Divider/>
        <Box mt={1} mb={2}>
    <Grid container alignItems='center'>
        <Grid item xs={4}>
            <Typography variant='subtitle1'>
                Apply Coupon
            </Typography>
            <Typography variant='body2' gutterBottom>
                (Must be applied after you select all the details)
            </Typography>
        </Grid>
                    <Grid item xs={7}>
                            <FormControl variant="outlined" noValidate>
                            <InputLabel >Coupon Code</InputLabel>
                            <OutlinedInput
                                value={bookvalues.coupon}
                                onInput={ e => oncouponChange(e)}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Button onClick={e => {handlecoupon(e);}}>
                                        Check
                                    </Button>
                                </InputAdornment>
                                }
                                labelWidth={100}
                                />
                            </FormControl>
                    </Grid>
            </Grid>






        </Box>

<Divider/>
            <Box mt={1} mb={2}>
            <Grid container alignItems='center'>
                <Grid item xs={8}>
                    <Typography variant='subtitle1'>
                        <Box fontSize="20px">
                        Your savings
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle2'>
                    <Box fontSize="18px">
                    {details.currency}{bookvalues.savings}
                    </Box>
                    </Typography>
                </Grid>
            </Grid>


            <Grid container alignItems='center'>
                <Grid item xs={8} >
                    <Typography variant='subtitle1'>
                    <Box fontSize="20px">
                        Total Price
                     </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle2'>
                    <Box fontSize="18px">
                    {details.currency}{bookvalues.price}
                </Box>
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant='caption'  style={{lineHeightBottom:'0'}}>
                (inclusive of all taxes)
            </Typography>

        </Box>
    {
         details.pausebooking || !details.verified || booked ? <Button variant='contained' color="primary" fullWidth >
         Unavaiable untill {`${newdate11.getDate()}-${parseInt(newdate11.getMonth())+1}-${newdate11.getFullYear()}`}
      </Button> :   <Link style={{textDecoration:'none'}} to={{
    pathname: `/shops/${details.shop_id}/book`,
    state: { property_id: bookvalues }
  }}><Button variant='contained' color="secondary" fullWidth>
          Continue to book
        </Button></Link>

    }
      
        <Cancellation/>
      </CardContent>
    </Card>
    </div>
  );
}


const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    access: state.authreducers.access,
    profile: state.authreducers.user
  });

export default connect(mapStateToProps)(BoolCard);