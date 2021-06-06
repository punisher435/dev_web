import React,{ useState} from 'react'
import {  makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Grid from '@material-ui/core/Grid';



import Button from '@material-ui/core/Button';

import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './myStyles.css'
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Details from '../components/detailstable';
import FacilityDetails from '../components/facilitiestable'
import Invoice from '../components/invoice'
import { PDFDownloadLink} from '@react-pdf/renderer';
import Load1 from '../components/Spinner';


axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;


const ref = React.createRef();





const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    
  
 
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  myclass: {
    
   
},
bgclass: {
 
 


},
myclass1: {
  padding:'10px',
  [theme.breakpoints.up('sm')]: {
    padding:'30px',
  },
  
},
  content: {
    flexGrow: 1,
    padding: theme.spacing(1.3),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft:drawerWidth,
    },
  },
  erorclass:{
    width:'50%',
    marginLeft:'25%',
  },
  
  
 
  barclass: {
    width:'0%',
    display: 'block',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  topclass: {
    marginTop:'10px',
    [theme.breakpoints.up('sm')]: {
      
    },
  },
}));
  

function Bookingdetails(props) {
 
    const bookingid = props.match.params.bookingid;
    const [error,seterror] = useState(false);
    const [extend,setextend] = useState(false);


    const [mybooking,setmybooking]= useState()
    const [cancelled,setcancelled]= useState(false)

    const [invoiceData,setdata] = useState(false)

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/room/book/${bookingid}/`,config);
           
             setmybooking(res.data)

             setdata({
              id: `${res.data.booking_id}`,
              invoice_no: `${res.data.booking_id}`,
              
              company: `${res.data.first_name} ${res.data.last_name}`,
              
              phone: `${res.data.country_code} ${res.data.mobile}`,
              phone2: `${res.data.country_code} ${res.data.alternate_mobile}`,
              name:`${res.data.room_name}`,
              booked_from: `${res.data.booked_from}`,
              booked_till:`${res.data.booked_till}`,
              trans_date: `${res.data.created_at}`,
              due_date: `${res.data.created_at}`,
              cancelled:`${res.data.cancelled ? `Yes ${res.data.cancelled_date}` : 'No'}`,
              extended:`${res.data.extended ? `Yes` : 'No'}`,
              pay:`${res.data.currency.slice(2,)} ${res.data.price_to_be_paid}`,
              capacity:`${res.data.capacity}`,
              duration:`${res.data.duration}`,
              paid:`${res.data.paid ? `Yes` : 'No'}`,
              coupon:`${res.data.coupon}`,
              refunded:`${res.data.refunded}`,
              items: [
                {
                  sno: 1,
                  desc: "WIFI",
                  qty: `${res.data.wifi ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 2,
                  desc: "House Refridgerator",
                  qty: `${res.data.house_refridgerator ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 3,
                  desc: "Room Refridgerator",
                  qty: `${res.data.room_refridgerator ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 4,
                  desc: "House TV",
                  qty: `${res.data.house_TV ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 5,
                  desc: "Room TV",
                  qty: `${res.data.room_TV ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 6,
                  desc: "AC",
                  qty: `${res.data.AC ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 7,
                  desc: "Cooler",
                  qty: `${res.data.cooler ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 8,
                  desc: "Geyser",
                  qty: `${res.data.geyser ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 9,
                  desc: "Breakfast",
                  qty: `${res.data.breakfast ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 10,
                  desc: "Lunch",
                  qty: `${res.data.lunch ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 11,
                  desc: "Dinner",
                  qty: `${res.data.dinner ? `Yes` : 'No'}`,
                 
                },
                {
                  sno: 12,
                  desc: "Purified Water",
                  qty: `${res.data.purified_water ? `Yes` : 'No'}`,
                 
                },
              ],
            })
              
              }
                catch{
                  seterror(true);
                }

        }
    
    ,[])


    const classes = useStyles();

    const handleclick1 = async (e) => {
      setcancelled(true);
      

    }
    const handleclick2 = async (e) => {
      setextend(true);
      

    }




    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }
  
    if(cancelled===true){
      return <Redirect to={`/dashboard/recentbookings/room-bookings/cancel/${bookingid}`}/>
    }
    if(extend===true){
      return <Redirect to={`/dashboard/recentbookings/room-bookings/extend/${bookingid}`}/>
    }
    if(mybooking && props.profile){
    
    
    return (
        <div>
          
            <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <div className={classes.bgclass}>
    
            <div className={classes.myclass}>

            <div>

            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
           >
             <Paper elevation={5} className={classes.myclass1}>

            <div className={classes.topclass}>
            <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            
            >
            
            <Grid item >
              
            <Typography variant="h5" >BOOKING NO </Typography>
            </Grid>
            <Grid item >
              
              <Typography variant="body1">
                ({mybooking.booking_id})
              </Typography>
            </Grid>

            

            </Grid>
         
         {
           mybooking.ended || mybooking.extended || props.profile.is_seller || mybooking.cancelled ? null : <Grid
           container
           direction="row"
           justify="center"
           alignItems="center"
           spacing={2}
           >
           <Grid item >
           {
               mybooking.ended || mybooking.extended || props.profile.is_seller || mybooking.cancelled ? null : <Button variant="contained"  padding="auto"color="secondary" onClick={(e) => {handleclick1(e);}}>
               Cancel booking
             </Button>
   }</Grid>
  
  <Grid item >
           {
               mybooking.ended || mybooking.extended || props.profile.is_seller || mybooking.cancelled ? null : <Button variant="contained" padding="auto"color="secondary" onClick={(e) => {handleclick2(e);}}>
               Extend booking
             </Button>
   }</Grid>
   </Grid>
         }

         
            
            

    <br />

    {
      props.profile.is_seller || mybooking.room_review || mybooking.cancelled ? null :  <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      >
      

<Grid item >
      {
          mybooking.room_review || mybooking.cancelled ? null :  <Link to={{
            pathname: `/dashboard/recentbookings/room-bookings/${mybooking.booking_id}/feedback`,
            state: { property_id:'room' }
          }} style={{textDecoration:'none'}}><Button variant="contained" padding="auto"color="secondary" >
          Give Feedback
        </Button></Link>
}</Grid>
</Grid>
    }

   

    
           
            
            

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            
            

            </Grid>
            
            <br />
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            >
            
            <Grid item >
              <Typography variant="h6">Booked on </Typography> 
              <Typography variant="body1">  {mybooking.created_at.slice(0,10)}</Typography>
            </Grid>
            <Grid item >

            <Grid item >
            <Typography variant="h6">Booked at </Typography> 
              <Typography variant="body1">  {mybooking.created_at.slice(11,19)}</Typography>
            </Grid>
           
              
            </Grid>

            </Grid>

            <br />

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            
            >
              <Grid item>
                <Details booking={mybooking}  profile={props.profile} name={mybooking.room_name}/>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            
            >
              <Grid item>
                <Typography variant="h6">
                  Facilites Selected :-
                </Typography>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            
            >
              <Grid item>
                <FacilityDetails mybooking={mybooking} profile={props.profile} type={'room'}/>
              </Grid>
            </Grid>
            <br />

            
              
             
{
  invoiceData ? <Grid item>
  <br />
             
              <PDFDownloadLink document={<Invoice invoice={invoiceData}/>} fileName={`Booking(${mybooking.booking_id})`}> 
  
        <Button variant="contained" color="primary"> Download </Button> 
  
         </PDFDownloadLink>
              </Grid> : null
}
             




            </div>

            </Paper>

            </Grid>
            </div>
            </div>
            </div>
            </main>
        </div>
    )
    }
    else{
      return <><Load1 loading={true} /></>;
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(Bookingdetails);

