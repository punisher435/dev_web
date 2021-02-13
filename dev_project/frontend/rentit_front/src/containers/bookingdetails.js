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
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const ref = React.createRef();



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
              
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/book/${bookingid}/`,config);
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
      return <Redirect to={`/dashboard/recentbookings/cancel/${bookingid}`}/>
    }
    if(extend===true){
      return <Redirect to={`/dashboard/recentbookings/extend/${bookingid}`}/>
    }
    if(mybooking && props.profile){
    
    
    return (
        <div>
          
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



            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            
            <Grid item >
              <h3>Booking no.</h3>
            </Grid>

            

            </Grid>
            <button onClick={() => {setinvoice(true);}}>Generate pdf</button>
            {
                mybooking.ended || mybooking.extended || props.profile.is_seller || mybooking.cancelled ? null : <Button variant="contained" color="secondary" onClick={(e) => {handleclick1(e);}}>
                Cancel booking
              </Button>
            }

            {
                mybooking.ended || mybooking.extended || props.profile.is_seller || mybooking.cancelled ? null : <Button variant="contained" color="secondary" onClick={(e) => {handleclick2(e);}}>
                Extend booking
              </Button>
            }

            <Grid item >
            <Barcode width={1} height={50} value={mybooking.booking_id} />
            </Grid>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            
            <Grid item >
              <h6>{mybooking.booking_id}</h6>
            </Grid>

            </Grid>
            <br />
            <Grid item >
              <h4>{mybooking.room_name}</h4>
            </Grid>
            <br />
            <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            >
            
            <Grid item >
              <h6 className={classes.textclass}>Booked on :-  </h6>
              <h6 className={classes.textclass}> {mybooking.created_at.slice(0,10)}</h6>
            </Grid>
            <Grid item >

            <Grid item >
              <h6 className={classes.textclass}>Booked at :-  </h6>
              <h6 className={classes.textclass}> {mybooking.created_at.slice(11,19)}</h6>
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
              <Grid item >
              <h6 className={classes.textclass}>Customer name :-  </h6>
              <h6 className={classes.textclass}> {mybooking.first_name + ' ' + mybooking.last_name}</h6>
              </Grid>

            </Grid>

              <Grid item >
              <h6 className={classes.textclass}>Mobile no. :-  </h6>
              <h6 className={classes.textclass}> {mybooking.country_code}  {mybooking.mobile}</h6>
              </Grid>

            <Grid item >
              <h6 className={classes.textclass}>Alternate mobile no. :-  </h6>
              <h6 className={classes.textclass}> {mybooking.country_code}  {mybooking.alternate_mobile}</h6>
              </Grid>

              <br />

              <Grid item >
              <h6 className={classes.textclass}>Booked from :-  </h6>
              <h6 className={classes.textclass}> {mybooking.booked_from} </h6>
              </Grid>

            <Grid item >
              <h6 className={classes.textclass}>Booked till :-  </h6>
              <h6 className={classes.textclass}> {mybooking.booked_till}</h6>
              </Grid>

              <Grid item >
              <h6 className={classes.textclass}>Capacity :-  </h6>
              <h6 className={classes.textclass}> {mybooking.capacity} </h6>
              </Grid>

              <Grid item >
              <h6 className={classes.textclass}>Duration :-  </h6>
              <h6 className={classes.textclass}> {mybooking.duration} Months</h6>
              </Grid>

              <br />
              <Grid item>
                <h5>Facilities selected :-</h5>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>WIFI :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.wifi ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>House TV :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.house_TV ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Room TV :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.room_TV ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>House refridgerator :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.house_refridgerator ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Room refridgerator :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.room_refridgerator ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Purified water :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.purified_water ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Geyser :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.geyser ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>AC :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.AC ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Cooler :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.cooler ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Breakfast :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.breakfast ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Lunch :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.lunch ? 'Selected' : 'Not Selected'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Dinner :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.dinner ? 'Selected' : 'Not Selected'} </h6>
              </Grid>

              <br />

              <Grid item >
              <h6 className={classes.textclass}>Coupon :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.coupon} </h6>
              </Grid>

              <br />

              {
                props.profile.is_seller==false ? <Grid item >
                <h6 className={classes.textclass}>Payment received :-  </h6>
                <h6 className={classes.textclass}>   {mybooking.seller_pay} </h6>
                </Grid> : null
              }
              {
                props.profile.is_seller==false ? <Grid item >
                <h6 className={classes.textclass}>Payment paid :-  </h6>
                <h6 className={classes.textclass}>   {mybooking.price_to_be_paid} </h6>
                </Grid> : null
              }


              <Grid item >
              <h6 className={classes.textclass}>Cancelled :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.cancelled ? 'Yes' : 'No'} </h6>
              </Grid>
              <Grid item >
              <h6 className={classes.textclass}>Extended booking:-  </h6>
              <h6 className={classes.textclass}>   {mybooking.is_extended ? 'Yes' : 'No'} </h6>
              </Grid>

              {
                mybooking.is_extended==true ? <Grid item >
                <h6 className={classes.textclass}>Extended upon:-  </h6>
                <h6 className={classes.textclass}>   {mybooking.extended_on} </h6>
                </Grid> : null
              }

              <Grid item >
              <h6 className={classes.textclass}>Extended :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.extended ? 'Yes' : 'No'} </h6>
              </Grid>

              {
                mybooking.cancelled ? <Grid item >
                <h6 className={classes.textclass}>Cancellation Date:-  </h6>
                <h6 className={classes.textclass}>   {mybooking.cancelled_date.slice(0,10)}</h6>
                </Grid> : null
              }
              {
                props.profile.is_seller==false && mybooking.cancelled ? <Grid item >
                <h6 className={classes.textclass}>Refund amount:-  </h6>
                <h6 className={classes.textclass}>   {mybooking.refund_amount}</h6>
                </Grid> : null
              }
              {
                mybooking.cancelled ? <Grid item >
                <h6 className={classes.textclass}>Cancellation Time:-  </h6>
                <h6 className={classes.textclass}>   {mybooking.cancelled_date.slice(11,19)}</h6>
                </Grid> : null
              }

              {
                mybooking.cancelled ? <Grid item >
                <h6 className={classes.textclass}>Cancellation reason:-  </h6>
                <h6 className={classes.textclass}>   {mybooking.cancellation_reason}</h6>
                </Grid> : null
              }


              <Grid item >
              <h6 className={classes.textclass}>Pay Later :-  </h6>
              <h6 className={classes.textclass}>   {mybooking.paylater ? 'Yes' : 'No'} </h6>
              </Grid>

              {
                mybooking.paylater ? <Grid item >
                <h6 className={classes.textclass}>Pay later Date:-  </h6>
                <h6 className={classes.textclass}>   {mybooking.paylater_date}</h6>
                </Grid> : null
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

export default connect(mapStateToProps)(Bookingdetails);

