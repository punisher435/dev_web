import React,{useEffect,useState} from 'react'
import Dashboarddrawer from '../hocs/layout2'
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CustomizedTables from './RecentBookingTable'
import {connect} from 'react-redux'
import axios from 'axios'


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

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };

              
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/book/`,config,config);
             console.log(res.data)
             setbookings(res.data)
              
              }
                catch{
      
                }
        }
    
    ,[])

    return (
        <div>
        <Dashboarddrawer/>

        <main className={classes.content}>
        <div className={classes.toolbar} />

        <h3>Recent bookings</h3>
        <CustomizedTables bookings={bookings} setbookings={setbookings}/>

        

        </main>

            
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    profile : state.authreducers.user
  });
  
export default connect(mapStateToProps)(RecentBooking1);
