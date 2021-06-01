











import React,{ useState} from 'react'
import {  makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Grid from '@material-ui/core/Grid';
import Load1 from './Spinner';


import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import FacilityIcon from './FacilityIconProvider_shop'
import Typography from '@material-ui/core/Typography';
import SuccessSnackbars from './success_snackbar'
import ErrorSnackbars from './error_snackbar'
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    
  
 
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft:drawerWidth,
    },
  },
  erorclass:{
    width:'50%',
    marginLeft:'25%',
  },
  textclass:{
    float: 'left',
  },
  table: {
    width:'30%'
  },
  head: {
    fontSize:'20px'
  },
  row: {
    fontSize:'20px'
  },
  barclass: {
    width:'0%',
    display: 'block',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    
  },
}));
  

function Bookingextend(props) {
    const bookingid = props.match.params.bookingid;
    const [error,seterror] = useState(false);
    const [redirect,setredirect] = useState(false);
    
    const [myroom,setroom] = useState();
    const [mycoupon,setcoupon] = useState('')
    const [no,setno] = React.useState(0)
  const [openme,setopenme] = React.useState(false)
  const [openme1,setopenme1] = React.useState(false)

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  
  const [booked,setbooked] = React.useState(true);
  const [date,setdate] = React.useState()

    const [mybooking,setmybooking]= useState()
    
    const [cancelled,setcancelled]= useState(false)

    const [bookdetails,setbookdetails] = React.useState({
        price:'',
        date:'',
        month:'',
        year:'',
        duration:1,

        wifi:'',
        TV:'',
      
        house_refridgerator:'',
        
        purified_water:'',
        geyser:'',
        AC:'',
        cooler:'',
        laundry:'',
        
       
        
        coupon:'',
        discount:0,
        month_price:'',
        savings:0,
        monthsavings:0,
        apartmentid:'',
        title:'',
        currency:'',

        firstname:'',
        lastname:'',
        mobile:'',
        country_code:'',
        alternate_mobile:'',
      
        paylater:false,

       
    })

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              var x = 0;
              var y = '';
              var apartment = ''
              
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcensinejfcdajewcn29210/apartment/book/${bookingid}/`,config);
             
             setmybooking(res.data)

             try{const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcebvdfesl2746/apartments/${res.data.apartment_id}/`,config);
             
              setroom(res1.data)
              x = res1.data.cost_electricity +res1.data.cost_water+res1.data.cost_laundry + res1.data.final_price + res1.data.cost_wifi + res1.data.cost_TV  + res1.data.cost_refridgerator + res1.data.cost_purified_water + res1.data.cost_geyser + res1.data.cost_AC + res1.data.cost_cooler
              y = res1.data.currency
             setdate(res1.data.bookedtill)
             apartment = res1.data

             var mydate = new Date();
            mydate.setYear(parseInt(res.data.booked_till.slice(0,4)))
            mydate.setMonth(parseInt(res.data.booked_till.slice(5,7))-1)
            mydate.setDate(parseInt(res.data.booked_till.slice(8,))+1)
            setSelectedDate(mydate)
              
              }
                catch{
                  seterror(true);
                }
             const value = res.data
             

             setbookdetails(
                {
                  ...bookdetails,
                    currency:y,
                    price:parseInt(x),
                    month_price:parseInt(x),
                    monthsavings:0,
                    date:value.booked_till.slice(8,10),
                    month:value.booked_till.slice(5,7),
                    year:value.booked_till.slice(0,4),
                    
                    wifi:apartment.wifi,
                    TV:apartment.TV,
                  
                    house_refridgerator:apartment.house_refridgerator,

                    laundry:apartment.laundry,
                    
                    purified_water:apartment.purified_water,
                    geyser:apartment.geyser,
                    AC:apartment.AC,
                    cooler:apartment.cooler,
                   
                    coupon:'none',
                    discount:value.discount,
                    
                    
                    

                    apartmentid:value.apartment_id,
                    title:value.apartment_name,
                    firstname:value.first_name,
                    lastname:value.last_name,
                    mobile:value.mobile,
                    country_code:value.country_code,
                    alternate_mobile:value.alternate_mobile,

                    
                    
                })
              
              }
                catch{
                  seterror(true);
                  
                  
                }

                
          
        }
    
    ,[])

    React.useEffect(() => {

      if(date != undefined){
        if( ( (parseInt(date.slice(8,)) < selectedDate.getDate()) && (parseInt(date.slice(5,7))==selectedDate.getMonth()+1) && (parseInt(date.slice(0,4))==selectedDate.getFullYear()) ) || 
        ( (parseInt(date.slice(5,7))<selectedDate.getMonth()+1) && (parseInt(date.slice(0,4))==selectedDate.getFullYear()) ) ||  (parseInt(date.slice(0,4))<selectedDate.getFullYear()) )
    {
        setbooked(false);
    }
    else{
        setbooked(true);
    }


    
    }

    },[date,myroom,bookdetails.capacity,selectedDate])

    React.useEffect(() => {
      if(bookdetails.coupon=='' || mycoupon=='')
      {
        setbookdetails({...bookdetails,coupon:'none'})
      }
      if(mycoupon!='')
      {
        setbookdetails({...bookdetails,coupon:mycoupon})
      }
   

    },[mycoupon])


    const classes = useStyles();

    
  
    const [newload,setnewload] = React.useState(false);
  

    const handlePaymentSuccess = async (res) => {
      try {
      
        let keyArr = Object.keys(res);
        let valArr = Object.values(res);
    
        // when we start the payment verification we will hide our Product form
        document.getElementById("paymentFrm").style.display = "none";
        setnewload(true);
    
        // Lets create a form by DOM manipulation
        // display messages as soon as payment starts
       
    
        //create a form that will send necessary details to the paytm
        let frm = document.createElement("form");
        frm.action = "https://securegw-stage.paytm.in/order/process/";
        frm.method = "post";
        frm.name = "paytmForm";
    
        // we have to pass all the credentials that we've got from param_dict
        keyArr.map((k, i) => {
          // create an input element
          let inp = document.createElement("input");
          inp.key = i;
          inp.type = "hidden";
          // input tag's name should be a key of param_dict
          inp.name = k;
          // input tag's value should be a value associated with the key that we are passing in inp.name
          inp.value = valArr[i];
          // append those all input tags in the form tag
          frm.appendChild(inp);
        });
    
        // append all the above tags into the body tag
      
        document.body.appendChild(frm);
        // finally submit that form
        frm.submit();
      } catch (error) {
      
      }
    };

    const handleclick1 = async (e) => {
      e.preventDefault();

      
      var data = '';

      if(bookdetails.coupon=='')
      {
        setbookdetails({...bookdetails,coupon:'none'})
      }
      

     

      const config = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };
      const body = {
        data:bookdetails,
      }
      setcancelled(true);
      
      
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcensinejfcdajewcn29210/apartment/book/${bookingid}/`,body,config);
        

         data = res;
        
         if (res) {
          handlePaymentSuccess(res.data.param_dict);
        }
      
      
      }
        catch{
          setcancelled(false);
          
        }
        

    }
    const handleChange = (event) => {
      
        setbookdetails({...bookdetails,duration:event.target.value,price:bookdetails.month_price*event.target.value});
      };
     



      const handlecoupon = async (e) => {
        e.preventDefault();
        if(bookdetails.coupon!='none' && no==0)
        {
          try{
              const config = {
                  headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `JWT ${localStorage.getItem('access')}`,
                  },
                  params:{
                      price:bookdetails.price,
                      discount:bookdetails.discount,
                      savings:bookdetails.savings,
                      apartmentid:bookdetails.apartmentid
                     },
                };
      
             
              
              const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceasindwanuia29910/coupon/apartment/apply/${bookdetails.coupon}/`,config,config);
      
            
            setbookdetails({...bookdetails,price:res.data[1],discount:res.data[3],savings:res.data[2]})
            setno(1);
            setopenme(true)
      
            
      
            
            }
            catch{
              setopenme1(true)
            }
        }
      }


      const oncouponChange = e => {
        setcoupon(e.target.value)
        
    }
  

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }
    if(redirect===true)
    {
        return <Redirect to='/dashboard/recentbookings'/>;
    }

    if(mybooking && props.profile && myroom){
    
    
    return (
      <div>
      {
        newload ? <div>
          <Grid
  container
  direction="column"
  justify="center"
  alignItems="center"
  >
          
          <Load1 loading={newload}/>
          <br />
          <Typography variant="h5">
          Redirecting you to the payment gateway....
          </Typography>
  
          <br />
  
          <Typography variant="h5">
          Please do not refresh your page....
          </Typography>
          </Grid>
        
        </div> : null
      }
   
    <div id="paymentFrm" >

<SuccessSnackbars openme={openme} setopenme={setopenme} message={'Coupon applied successfully!'}/>
      <ErrorSnackbars openme={openme1} setopenme={setopenme1} message={'Coupon not applicable!'}/>
          {
            cancelled ? <Backdrop className={classes.backdrop} open={cancelled}>
            <CircularProgress color="inherit" />
          </Backdrop> : null
          }
            <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <div>

            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
           >


            <Grid item >
              <h3>Do you want to extend booking no .</h3>
            </Grid>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            
            
            <Grid item >
              <h4>{mybooking.booking_id}?</h4>
            </Grid>

            

            </Grid>
            <Grid item>
            <FormControl className={classes.formControl}>
                <InputLabel id="months">Months</InputLabel>
                <Select
                labelId="months"
                id="months-select"
                value={bookdetails.duration}
                onChange={handleChange}
                >
                <MenuItem value={1}>1 Months</MenuItem>
                <MenuItem value={2}>2 Months</MenuItem>
                <MenuItem value={3}>3 Months</MenuItem>
                <MenuItem value={4}>4 Months</MenuItem>
                <MenuItem value={5}>5 Months</MenuItem>
                <MenuItem value={6}>6 Months</MenuItem>
                <MenuItem value={7}>7 Months</MenuItem>
                <MenuItem value={8}>8 Months</MenuItem>
                <MenuItem value={9}>9 Months</MenuItem>
                <MenuItem value={10}>10 Months</MenuItem>
                <MenuItem value={11}>11 Months</MenuItem>
                <MenuItem value={12}>12 Months</MenuItem>
                <MenuItem value={13}>13 Months</MenuItem>
                <MenuItem value={14}>14 Months</MenuItem>
                <MenuItem value={15}>15 Months</MenuItem>
                <MenuItem value={16}>16 Months</MenuItem>
                <MenuItem value={17}>17 Months</MenuItem>
                <MenuItem value={18}>18 Months</MenuItem>
                <MenuItem value={19}>19 Months</MenuItem>
                <MenuItem value={20}>20 Months</MenuItem>
                <MenuItem value={21}>21 Months</MenuItem>
                <MenuItem value={22}>22 Months</MenuItem>
                <MenuItem value={23}>23 Months</MenuItem>
                <MenuItem value={24}>24 Months</MenuItem>
                </Select>
                <FormHelperText>Select no. of months</FormHelperText>
            </FormControl>
            </Grid>
            <br />
            <Grid item lg={6} md={7}>
            <FacilityIcon post={myroom} bookvalues={bookdetails} setbookvalues={setbookdetails}/>
            </Grid>
            <br />
           



       
        
           

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
                                value={mycoupon}
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
        <br />
            <Typography variant="body1">Price : {bookdetails.currency} {bookdetails.price}</Typography>
            <br />

            {
                booked || mybooking.ended || mybooking.extended || props.profile.is_seller===true || mybooking.cancelled ? null : <Button variant="contained" color="secondary" onClick={(e) => {handleclick1(e);}}>
                Extend Booking
              </Button>
            }
          

          <br />
          <Typography>
            Please note that the price will be increased due to transaction charges of payment gateway and taxes
            </Typography>

            

              


            </Grid>
            </div>
            </main>
        </div></div>
    )
    }
    else{
      return <><Load1 laoding={true} /></>;
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(Bookingextend);






