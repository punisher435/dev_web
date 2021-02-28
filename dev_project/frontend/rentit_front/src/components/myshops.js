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
import ShopCard from './shop_card'
import AddShopCard from './addshopcard';

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
  myclass: {
    padding:0,
    margin:0,

  },
}));
  

function Myshops(props) {

    const [error,seterror] = useState(false)
    const [myshops,setshops] = useState()
   

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.isAuthenticated)
              {
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcekfhkt274fs/my_shops/`,config);
              
                setshops(res.data)
                console.log(res.data)
              
              }
                catch{
      
                }
                
              
        }
    }
    
    ,[props.isAuthenticated])


    const classes = useStyles();

    

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }

    if(props.isAuthenticated && myshops){
    
    
    return (
        <div>
             <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

          
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.myclass}
            spacing={3}
            >

            {
                myshops.map(shop =>
                    {
                        return <Grid item><ShopCard myshop={shop} /></Grid>;
                    })
            }
            <Grid item><AddShopCard info={props.profile}/></Grid>
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

export default connect(mapStateToProps)(Myshops)
