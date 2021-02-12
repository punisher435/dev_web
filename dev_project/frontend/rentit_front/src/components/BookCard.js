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
import MonthSelect from './MonthSelect'
import FacilityIcon from './FacilityIconProvider'
import Capacityselect from './capacityselect'

import { connect } from 'react-redux'

import {Redirect,Link} from 'react-router-dom';
import Capacityfilter from './capacityselect';
const useStyles = makeStyles((theme) => ({
  root1: {
    
  },
}));

function BoolCard({details,isAuthenticated,loginpage,setloginpage,profile}) {
  const classes = useStyles();
  const [bookvalues,setbookvalues] = React.useState({
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
    capacity:1,
})
  const [values, setValues] = React.useState({
    couponCode: '',
  });

  const handleChange = (prop) => (event) => {
    setbookvalues({ ...bookvalues, coupoun: event.target.value });
  };

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

    var x = details.cost_electricity +details.cost_water + details.final_price + details.cost_wifi + details.cost_TV + details.cost_roomTV + details.cost_refridgerator + details.cost_roomrefridgerator + details.cost_purified_water + details.cost_geyser + details.cost_AC + details.cost_cooler + details.cost_breakfast + details.cost_lunch + details.cost_dinner


    setbookvalues({...bookvalues,    date:selectedDate.getDate(),
        month:selectedDate.getMonth()+1,
        year:selectedDate.getFullYear(),wifi:details.wifi,house_TV:details.house_TV,room_TV:details.room_TV,
    house_refridgerator:details.house_refridgerator,room_refridgerator:details.room_refridgerator,
purified_water:details.purified_water,geyser:details.geyser,AC:details.AC,cooler:details.cooler,
breakfast:details.breakfast,lunch:details.lunch,dinner:details.dinner,price:x,month_price:x,discount:details.owner_discount+details.company_discount,
savings:details.price - details.final_price,monthsavings:details.price - details.final_price,roomid:details.room_id,title:details.title,address:details.location,currency:details.currency,
});

var x = details.capacity-details.booked_by
if(x<0){x=0;}

if(details.book1!=null || details.book1!=undefined)
{

    if(  (parseInt(details.book1.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book1.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book1.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book1.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book1.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book1.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book2!=null || details.book2!=undefined)
{
    if(  (parseInt(details.book2.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book2.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book2.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book2.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book2.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book2.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book3!=null || details.book3!=undefined)
{
    if(  (parseInt(details.book3.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book3.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book3.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book3.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book3.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book3.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book4!=null || details.book4!=undefined)
{
    if(  (parseInt(details.book4.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book4.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book4.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book4.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book4.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book4.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book5!=null || details.book5!=undefined)
{
    if(  (parseInt(details.book5.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book5.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book5.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book5.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book5.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book5.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book6!=null || details.book6!=undefined)
{
    if(  (parseInt(details.book6.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book6.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book6.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book6.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book6.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book6.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book7!=null || details.book7!=undefined)
{
    if(  (parseInt(details.book7.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book7.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book7.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book7.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book7.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book7.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book8!=null || details.book8!=undefined)
{
    if(  (parseInt(details.book8.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book8.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book8.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book8.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book8.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book8.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book9!=null || details.book9!=undefined)
{
    if(  (parseInt(details.book9.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book9.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book9.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book9.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book9.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book9.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}

if(details.book10!=null || details.book10!=undefined)
{
    if(  (parseInt(details.book10.slice(0,4))<selectedDate.getFullYear()) || ( parseInt(details.book10.slice(0,4))==selectedDate.getFullYear() && parseInt(details.book10.slice(5,7))<selectedDate.getMonth()+1 ) ||  
    ( parseInt(details.book10.slice(0,4))===selectedDate.getFullYear() && parseInt(details.book10.slice(5,7))===selectedDate.getMonth()+1 && parseInt(details.book10.slice(8,))<selectedDate.getDate()-1 )  ) 
    {
        x=x+1;
    }
}



setcapacity(x);
    
  
  },[date,details,selectedDate])




  return (
    <Card elevation={4}>
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
                    {details.currency}{details.final_price}
                    </Typography>
                </Grid>
                <Grid item style={{ paddingBottom: '0px'}}>
                    <Typography variant="subtitle1" color="textSecondary" display = 'inline'>
                        <strike>{details.currency}{details.price}</strike>
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

            <Grid container justify="space-around" alignItems='bottom' >
            <Grid item xs={3}>
            <Typography variant="body1" color="textSecondary" >
                    Capacity
                    </Typography>
            </Grid>
            <Grid item xs={5}>
                <Capacityselect setbookvalues={setbookvalues} bookvalues={bookvalues} details={details} capacity={capacity}/>
            </Grid>

            </Grid>

{/* 
          <Facility type='Breakfast' price='price'/>

          <Facility type='Lunch' price='price'/>

          <Facility type='Dinner' price='price'/>

          <Facility type='wifi' price='price'/> */}

        <FacilityIcon post={details} bookvalues={bookvalues} setbookvalues={setbookvalues}/>

          <Divider/>
        <Box mt={1} mb={2}>
    <Grid container alignItems='center'>
        <Grid item xs={4}>
            <Typography variant='subtitle1'>
                Apply Coupon
            </Typography>
        </Grid>
                    <Grid item xs={7}>
                            <FormControl variant="outlined" noValidate>
                            <InputLabel >Coupon Code</InputLabel>
                            <OutlinedInput
                                value={bookvalues.coupoun}
                                onChange={handleChange('couponCode')}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Button>
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
        Unavaiable untill 1 day after {details.bookedtill}
      </Button> :   <Link style={{textDecoration:'none'}} to={{
    pathname: `/rooms/${details.room_id}/book`,
    state: { property_id: bookvalues }
  }}><Button variant='contained' color="secondary" fullWidth>
          Continue to book
        </Button></Link>

    }
      
        <Cancellation/>
      </CardContent>
    </Card>
  );
}


const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    access: state.authreducers.access,
    profile: state.authreducers.user
  });

export default connect(mapStateToProps)(BoolCard);