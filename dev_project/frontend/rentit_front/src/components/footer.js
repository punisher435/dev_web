import React from 'react';

import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../redux/auth/actions/auth_actions';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { makeStyles} from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import axios from 'axios'

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

import '../components/css/App.css';

import Box from '@material-ui/core/Box';
import "../components/css/App.css"

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import Logo from '../logo.png';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;


const useStyles = makeStyles((theme) => ({
    myclass: {
        marginLeft:'4%'
    },
    myclass1: {
        marginLeft:'2%',
        
    },
    navclass:{
        opacity:'1 !important',
        
        textAlign: 'center',
    },

    navclass1:{
        opacity:'1 !important',
        position:'relative',
        textAlign: 'center',
        width:'90vw',
    },
    newclass12:{
    paddingLeft:'3%',
    },
    myclass2: {
        // backgroundColor: '#2d3436',
        backgroundColor: '#081C15',
        paddingLeft:'1%',
    },
    textclass: {
        color:'white',
        padding:'10px',
    },
    textclass2:{

    },
    gridclassnew:{
        paddingTop:'3%',
    },
    bgclass:{
        backgroundColor: '#457B9D',
        // backgroundImage: '#457B9D',
        elevation:30,
    },
    bgclass1:{
        backgroundColor: '#575757',
    },
    bgclass2:{
        backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyKdT_YR9I2OOqWE_Am3fAifdWNYW0EN7Lw&usqp=CAU")` ,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width:'90vw',
        maxWidth:'1200px',
        opacity: '0.4'
    },
    white:{
        backgroundColor: '#ffffff'
    },
    headerclass:{
        
      },
      containerclass:{
       
      },
      footer1:{
        backgroundColor: '#081C15',
        // backgroundImage: `url(${bgd})`, 
        // backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnyKdT_YR9I2OOqWE_Am3fAifdWNYW0EN7Lw&usqp=CAU")` ,
        
      },
      footer2:{
        backgroundColor: '#081C15',
    },
      paperclass:{
          width:'100%',
          height:'100%',
      },
      gridclass1:{
         
      },
      paperclass1:{
          width:'90vw',
          maxWidth:'1200px',
          backgroundColor: '#575757',
      },

      root12: {
       marginRight:'8px',
       marginBottom:'8px'
      },
  
  }));

const Layout = (props) => {
   

    const [totalbookings,settotalbookings] = React.useState('')


    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceashe929209has8h2bsgv2a89/booking/`,{
            
            config:config
          });
          
          settotalbookings(res.data);
          
          }
          catch{
            
          }
    },[])

    const classes = useStyles();

    return (
        <div>
           



            <div className="footerclass">

<br />
<br />

<Grid
    container
    direction="row"
    justify="space-evenly"
    alignItems="flex-start"
    className={classes.newclass12}
    
    >

      

        
    <Grid item xs={12} sm={3}>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        >
        <Grid item xs={11}>
        <div className={classes.logoclass}><img src={Logo} /></div>
        </Grid>
        
        
        <Grid item >
                <Box  fontSize={25} mr={2}>
                <Link href="#" onClick='#' >
                    <FacebookIcon color='white'/>
                </Link>
                </Box>
        </Grid>
        <Grid item >
                
                <Box  fontSize={25} mr={2}>
                <Link href="#" onClick='#' >
                    <InstagramIcon/>
                </Link>
                </Box>
        </Grid>
        <Grid item >
                <Box  fontSize={25} mr={2}>
                <Link href="#" onClick='#' >
                    <MailIcon/>
                </Link>
                </Box>
        </Grid>
        <Grid item >
                <Box  fontSize={25} >
                <Link href="#" onClick='#' >
                    <TwitterIcon/>
                </Link>
                </Box>
        </Grid>
        
    </Grid>
    <br/>
</Grid>


<Grid item xs={12} sm={2}>
<Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
    >
        <Grid item xs={12}>
            <Typography variant='h6' className={classes.textclass}>
                <Box lineHeight={0}>

                Hit Counter
                </Box>
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='subtitle1' className={classes.textclass}>
        <Box lineHeight={1} fontSize={15}>
                {totalbookings} (No. of bookings from our website)
        </Box>
            </Typography>
        </Grid>
    </Grid><br/>
        </Grid>
        {/* <Divider orientation="vertical" flexItem={true} light={true}/> */}

        <Grid item xs={12} sm={2}>
        {/* <Paper elevation={5} > */}
        <Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
    >
        <Grid item xs={12}>
            <Typography variant='h6' className={classes.textclass}>
                About Us
            </Typography>
        </Grid>
    </Grid><br/>
    {/* </Paper> */}
        </Grid>
        {/* <Divider orientation="vertical" flexItem  light/> */}
        
        
        <Grid item xs={12} sm={3}>
        {/* <Paper elevation={5}> */}
        <Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
    >
        <Grid item xs={12}>
            <Typography variant='h6' className={classes.textclass}>
                <Link to='/policies' style={{textDecoration:'None',color:'white'}}> {props.profile ? props.profile.is_seller ? 'Owner Policy' : 'Guest Policy' : 'Customer Policy'}</Link>
            </Typography>
        </Grid>
        
    </Grid><br/>
    {/* </Paper> */}
        
        </Grid>
    </Grid>
        {/* <Divider  /> */}
 {/* <div >
 <Box  ml={3}>
     <br></br>
     <Typography variant='h6' className={classes.textclass}>
        <Box >
            Contact Us :-
         </Box>
     </Typography>
     <Typography variant='subtitle1' className={classes.textclass}>
        <Box  >
             Email
         </Box>
     </Typography>
     <Typography variant='subtitle1' className={classes.textclass}>
        <Box  > 
             Phone no.
         </Box>
     </Typography>
     <br></br>
 </Box>
 </div> */}
 </div>
        </div>
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    profile : state.authreducers.user
  });

export default connect(mapStateToProps, { checkAuthenticated, load_user })(Layout);