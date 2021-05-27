import React,{ useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Grid from '@material-ui/core/Grid';


import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import ProfileCard from './profilecard'
import BankCard from './bank_card'
import AddressCard from './address_card'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
    

  },
}));
  

function Myprofile(props) {

    const [error,seterror] = useState(false)
    const [myprofile,setprofile] = useState()
    const [bank,setbank] = useState(false)
    const [address,setaddress] = useState(false)
    const [display,setdisplay] = useState(false);
    var warning=false;
    if(props.location.state)
    {warning = props.location.state.property_id;}
   

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.profile)
              {
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${props.profile.id}/`,config);
              
                setprofile(res.data)
             
              
              }
                catch{
      
                }
                if(props.profile.is_seller===true){
                try{const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourceadbahdvjs218/my_bank_details/${props.profile.id}/`,config);
              
                setbank(res1.data)
              
              
              }
                catch{
      
                }
                try{const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcejkzff8wqhdq92/my_address/${props.profile.id}/`,config);
              
                setaddress(res2.data)
                
              
              }
                catch{
      
                }
              }
              
        }
    }
    
    ,[props.profile])

    React.useEffect(() => {
      if(warning==true && props.profile)
      {
        if(props.profile.is_seller)
        {
          if(!props.profile.profile_completed || !props.profile.bank_completed || !props.profile.address_completed)
          {
            setdisplay(true);
          }
        }
        else{
          if(!props.profile.profile_completed)
          {
            setdisplay(true);
          }
        }
      }
      else{
        setdisplay(false);
      }
    },[warning])

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setdisplay(false);
    };


    const classes = useStyles();

    if(props.isAuthenticated===false)
    {
      return <Redirect to="/login" />;
    }

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }

    if(props.profile){
    
    
    return (
        <div>
             <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              You need to complete your profile first!
            </Alert>
          </Snackbar>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.myclass}
            spacing={3}
            >
            
            <Grid item><ProfileCard myprofile={myprofile} info={props.profile}/></Grid>
            <br />
            {
              props.profile.is_seller===true ? <Grid item><BankCard bank={bank} info={props.profile}/></Grid> : null
            }
            <br />
            
            {
              props.profile.is_seller===true ? <Grid item><AddressCard address={address} info={props.profile}/></Grid> : null
            }

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

export default connect(mapStateToProps)(Myprofile)
