import React,{ useState, useEffect} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Grid from '@material-ui/core/Grid';

import Barcode from 'react-barcode'
import Download from '../components/invoicefile'
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import FacilityIcon from './FacilityIconProvider'




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

    const [mybooking,setmybooking]= useState()
    const [cancelled,setcancelled]= useState(false)

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
        currency:'',

        firstname:'',
        lastname:'',
        mobile:'',
        country_code:'',
        alternate_mobile:'',
      
        paylater:false,

        capacity:'',
    })

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/room/book/${bookingid}/`,config);
             console.log(res.data)
             setmybooking(res.data)

             try{const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/${res.data.room_id}/`,config);
             console.log(res1.data)
             setroom(res1.data)
              
              }
                catch{
                  seterror(true);
                }
             const value = res.data

             setbookdetails(
                {
                  ...bookdetails,
                    price:10000,
                    month_price:10000,
                    monthsavings:1000,
                    date:value.booked_till.slice(8,10),
                    month:value.booked_till.slice(5,7),
                    year:value.booked_till.slice(0,4),
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
                    coupon:'none',
                    discount:value.discount,
                    month_price:value.month_price,
                    savings:value.savings,
                    monthsavings:value.monthsavings,
                    currency:value.currency,

                    roomid:value.room_id,
                    title:value.room_name,
                    firstname:value.first_name,
                    lastname:value.last_name,
                    mobile:value.mobile,
                    country_code:value.country_code,
                    alternate_mobile:value.alternate_mobile,

                    capacity:value.capacity,

                    
                })
              
              }
                catch{
                  seterror(true);
                }
        }
    
    ,[])

    React.useEffect(() => {
      if(bookdetails.coupon=='' || mycoupon=='')
      {
        setbookdetails({...bookdetails,coupon:'none'})
      }
      if(mycoupon!='')
      {
        setbookdetails({...bookdetails,coupon:mycoupon})
      }
      console.log(bookdetails.coupon)

    },[mycoupon])


    const classes = useStyles();

    const handleclick1 = async (e) => {
      e.preventDefault();
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
      console.log(bookdetails)
      
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/book/${bookingid}/`,body,config);
        

        setredirect(true)
        setcancelled(false);
      
      }
        catch{
          setcancelled(false);
          seterror(true);
        }
        

    }
    const handleChange = (event) => {
        setbookdetails({...bookdetails,duration:event.target.value});
      };
      const handleme = e => {
        setcoupon(e.target.value);
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
            <Grid item>
            <FacilityIcon post={myroom} bookvalues={bookdetails} setbookvalues={setbookdetails}/>
            </Grid>
            <br />
            <form className={classes.root} noValidate autoComplete="off">
            <TextField
            id="coupon"
            label="Coupon ( if any )"
            name="coupon"
            multiline
            rows={1}
            value = {mycoupon}
            onInput={(e) =>{handleme(e);}}
            variant="outlined"
        />
            </form>
            <br />

            {
                mybooking.ended || mybooking.extended || props.profile.is_seller===true || mybooking.cancelled ? null : <Button variant="contained" color="secondary" onClick={(e) => {handleclick1(e);}}>
                Extend Booking
              </Button>
            }

            

            

              


            </Grid>
            </div>
            </main>
        </div>
    )
    }
    else{
      return <></>;
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(Bookingextend);
