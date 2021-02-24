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

import ProfileCard from './profilecard'
import BankCard from './bank_card'
import AddressCard from './address_card'
import RoomCard from './room_card'
import AddRoomCard from './addroomcard';

import SellerReviews from './seller_rating_and_reviews'





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
  

function MyReviews(props) {

    const [error,seterror] = useState(false)
    const [myreviews,setreviews] = useState()

    const [params1,setparams] = useState({
        page:1,
        ordering:'-rating'
      })
    
   

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.isAuthenticated && props.profile)
              
              {
               
                try{
                    const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourceuserjcnssjwhd9329hdw/seller/reviews/`,{
                      params:{
                        seller_id:props.profile.id,
                        page:params1.page,
                        ordering:params1.ordering,
                      },
                      config:config
                    });
                    
                   
                        console.log('review',res1.data.results);
                        setreviews(res1.data.results);
                        
                        
                    }  catch (err) {
                      // Handle Error Here
                      console.error(err);
                  }
                
              
        }
    }
    
    ,[props.isAuthenticated,props.profile,params1])


    const classes = useStyles();

    

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }

    if(props.isAuthenticated && myreviews){
    
    
    return (
        <div>
             <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
            <Grid item>
            <div className={classes.myclass}>
            <SellerReviews reviews={myreviews} params={params1} setparams={setparams}/>
            </div>
            </Grid>

            </Grid>

            
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

export default connect(mapStateToProps)(MyReviews)
