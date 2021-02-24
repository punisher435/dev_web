import React,{ useState, useEffect} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

import ProfileCard from './profilecard'
import BankCard from './bank_card'
import AddressCard from './address_card'
import RoomCard from './room_card'
import AddRoomCard from './addroomcard';






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
  myclass: {
      
      width:'60vw'
  },
}));
  

function Analytics(props) {

    const [error,seterror] = useState(false)
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
             console.log(res.data)
             setbookings(res.data)
              
              }
                catch{
      
                }

                try{const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehdawnajk289uadhq/shop/book/`,config,config);
                console.log(res1.data)
                setshopbookings(res1.data)
                 
                 }
                   catch{
         
                   }

                   try{const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcensinejfcdajewcn29210/apartment/book/`,config,config);
                   console.log(res2.data)
                   setapartmentbookings(res2.data)
                    
                    }
                      catch{
            
                      }
        }
    
    ,[])


    const classes = useStyles();

    

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }

    if(props.isAuthenticated && bookings && shopbookings && apartmentbookings){
    
    
    return (
        <div>
             <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <Typography variant='h6'>
                Analytics
            </Typography>

            
            </main>
        </div>
    )
}
else{
  return <div></div>
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(Analytics)
