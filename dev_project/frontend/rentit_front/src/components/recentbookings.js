import React,{useState} from 'react'
import Dashboarddrawer from '../hocs/layout2'
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CustomizedTables from './RecentBookingTable'
import CustomizedTables1 from './RecentBookingsTable_shop'
import CustomizedTables2 from './RecentBookingsTable_apartment'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom';

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
}));







function RecentBooking1(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [bookings,setbookings]  = useState([])
    const [shopbookings,setshopbookings] = useState([])
    const [apartmentbookings,setapartmentbookings] = useState([])

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };

              
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/room/book/`,config,config);
          
             setbookings(res.data)
              
              }
                catch{
      
                }

                try{const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehdawnajk289uadhq/shop/book/`,config,config);
              
                setshopbookings(res1.data)
                 
                 }
                   catch{
         
                   }

                   try{const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcensinejfcdajewcn29210/apartment/book/`,config,config);
                 
                   setapartmentbookings(res2.data)
                    
                    }
                      catch{
            
                      }
        }
    
    ,[])

    if(props.isAuthenticated===false)
    {
      return <Redirect to="/login" />;
    }

    return (
        <div>
        <Dashboarddrawer/>

        <main className={classes.content}>
        <div className={classes.toolbar} />

        <Typography variant='h5'>Recent bookings</Typography>
        <br />
        <CustomizedTables bookings={bookings} title={'Rooms'} setbookings={setbookings}/>

        <br />

        <CustomizedTables1 bookings={shopbookings} title={'Shops'} setbookings={setshopbookings}/>

        <br />

        <CustomizedTables2 bookings={apartmentbookings} title={'Apartments'} setbookings={setapartmentbookings}/>

        

        </main>

            
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    profile : state.authreducers.user
  });
  
export default connect(mapStateToProps)(RecentBooking1);
