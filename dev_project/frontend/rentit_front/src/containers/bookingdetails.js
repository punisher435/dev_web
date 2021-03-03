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
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './myStyles.css'
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Details from '../components/detailstable';
import FacilityDetails from '../components/facilitiestable'

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
  
  
 
  barclass: {
    width:'0%',
    display: 'block',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
  

function Bookingdetails(props) {
  const [invoice,setinvoice] = useState(false)
    const bookingid = props.match.params.bookingid;
    const [error,seterror] = useState(false);
    const [extend,setextend] = useState(false);


    const [mybooking,setmybooking]= useState()
    const [cancelled,setcancelled]= useState(false)

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
    if(invoice==true)
    {
      return <Download />;
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
            
            <Grid
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

    <br />

    <Grid
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

    
           
            <Hidden mdDown>
            <Grid item >
            <Barcode width={1} height={40} value={mybooking.booking_id} />
            </Grid>
            </Hidden>

            

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
            
            >
            <Grid item >
              <h4>{mybooking.room_name}</h4>
            </Grid>
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
                <Details booking={mybooking}  profile={props.profile}/>
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

            
              
             

             



<Grid item>
<br />
            <button onClick={() => {setinvoice(true);}}>Generate pdf</button> 
            </Grid>
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
      return <></>;
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(Bookingdetails);

