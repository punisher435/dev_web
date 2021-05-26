import React,{useState} from 'react'
import Welcome from './Welcome'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { withStyles,makeStyles} from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import axios from 'axios'

import Grid from '@material-ui/core/Grid';
import Scrollroom from '../components/scrollroom';
import Scrollshop from '../components/scrollshops';
import Scrollapartment from '../components/scrollapartment';
import Scrollcoupons from '../components/scrollcoupons';
import Typography from '@material-ui/core/Typography';
import {Link,Redirect} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import '../components/css/App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ApartmentIcon from '@material-ui/icons/Apartment';
import TextField from '@material-ui/core/TextField';
import DatePick from '../components/datepick'
import Button from '@material-ui/core/Button';
import  {useMediaQuery} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Hidden from '@material-ui/core/Hidden';

import Box from '@material-ui/core/Box';
import "../components/css/App.css"

import CookieConsent from "react-cookie-consent";
import bg from '../bg1.jpg';


import Footer from '../components/footer';
axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const useStyles = makeStyles((theme) => ({
    myclass: {
        marginLeft:'4%'
    },
    myclass1: {
        marginLeft:'2%',
        
    },
    yoyoclass:{
      backgroundImage: `url(${bg})`,
      content: "",
      
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',

      width:'100%',
      maxWidth:'1200px',
      opacity:1,
     
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',

     
  
  
     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',


      [theme.breakpoints.up('md')]: {
        backgroundImage: `url(https://image.freepik.com/free-photo/living-room-arrangement-with-yoga-mat_23-2148741917.jpg)`,
        content: "",
        
          backgroundRepeat:'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
  
        width:'100%',
        maxWidth:'1200px',
        opacity:1,
       
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
  
       
    
    
       
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    navclass:{
        opacity:'1 !important',
        
        
        textAlign: 'center',
        color:'black',
        fontWeight: 'bold'
    },
    navclass1:{
        opacity:'1 !important',
        
        textAlign: 'center',
        width:'90vw',
    },
    navclass122:{
        opacity:'1 !important',
        
        textAlign: 'center',
        color:'black',
        fontWeight: 'bold',

       
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
        backgroundImage: `url("https://image.freepik.com/free-photo/living-room-arrangement-with-yoga-mat_23-2148741917.jpg")` ,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width:'90vw',
        maxWidth:'1200px',
        
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


  const StyledTextField = withStyles((theme) => ({
    root: {
      margin: theme.spacing(2),
     
      "& .MuiInputBase-root": {
        color: 'black',
        width:'37vw',
        maxWidth:200,
        
        height: 60,
        "& input": {
          textAlign: "center",
         
        }
      },

      '& input:valid + fieldset': {
        borderColor: 'black',
        borderWidth: 2,
        
      },
      '& input:invalid + fieldset': {
        borderColor: 'black',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        borderColor: 'black',
        padding: '4px !important', // override inline-style
      },
      "& .MuiFormLabel-root": {
        color: 'black',
        fontWeight: 'bold',
       
      }
    }
  }))(TextField);


function Home(props) {
    const classes = useStyles();
    const [luxrooms,setluxrooms] = React.useState([])
    const [classroom,setclassroom] = React.useState([])
    const [singleroom,setsingleroom] = React.useState([])
    const [shop,setshop] = React.useState([])
    const [apartment,setapartment] = React.useState([])
    const [coupons,setcoupons] = React.useState([])
    const isSmall = useMediaQuery("(max-width: 600px)");

    const [display,setdisplay] = useState(false);
    var warning=false;
    if(props.location.state)
    {warning = props.location.state.property_id;}

    const [totalbookings,settotalbookings] = React.useState('')
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setdisplay(false);
      };

    React.useEffect(() => {
        if(warning==true)
        {
          setdisplay(true);
        }
        else{
          setdisplay(false);
        }
      },[warning])
  
      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }


    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/`,{
            params:{
             page:1,
             category: 'Deluxe room',
             ordering:'-trust_points',
    
            },
            config:config
          });
          
          setluxrooms(res.data.results);
          
          
          }
          catch{
            
          }
    },[])

    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/`,{
            params:{
             page:1,
             category: 'Classic room',
             ordering:'-trust_points',
    
            },
            config:config
          });
          
          setclassroom(res1.data.results);
          
          }
          catch{
            
          }
    },[])

    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/`,{
            params:{
             page:1,
             category: 'Single',
             ordering:'-trust_points',
    
            },
            config:config
          });
          
          setsingleroom(res.data.results);
          
          }
          catch{
            
          }
    },[])


  

    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceadadk2647kfs/shops/`,{
            params:{
             page:1,
             
             ordering:'-trust_points',
    
            },
            config:config
          });
          
          setshop(res.data.results);
          
          
          }
          catch{
            
          }
    },[])

    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcebvdfesl2746/apartments/`,{
            params:{
             page:1,
             
             ordering:'-trust_points',
    
            },
            config:config
          });
          
          setapartment(res.data.results);
          
          
          }
          catch{
            
          }
    },[])

    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceadbwub2812gbwga981/coupon/list/`,{
            params:{
             page:1,
             
             ordering:'-off',
    
            },
            config:config
          });
        
          setcoupons(res.data.results);
          
          
          }
          catch{
            
          }
    },[])

    const [value, setValue] = React.useState('Rooms');
    const [roomsearch,setroomsearch] = React.useState(false)
    const [shopsearch,setshopsearch] = React.useState(false)
    const [apartmentsearch,setapartmentsearch] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [input,setinput] = React.useState({
      city:'',
      state:'',
      country:'',
      date:'',
  })

  const handleinput = e => {
      
    
      setinput({...input,[e.target.name]: e.target.value})
  }

  const handleclick = e => {
      e.preventDefault();
      if(value ==='Rooms')
      {
        setroomsearch(true);
      }

      if(value ==='Shops')
      {
        setshopsearch(true);
      }

      if(value ==='Housing')
      {
        setapartmentsearch(true);
      }
  }

  if(roomsearch===true)
  {
      return <Redirect to={`/rooms/?city=${input.city.toUpperCase()}&state=${input.state.toUpperCase()}&country=${input.country.toUpperCase()}&booking_date=${input.date}`} style={{textDecoration:'none',color:'black'}} />
  }
  if(shopsearch===true)
  {
      return <Redirect to={`/shops/?city=${input.city.toUpperCase()}&state=${input.state.toUpperCase()}&country=${input.country.toUpperCase()}&booking_date=${input.date}`} style={{textDecoration:'none',color:'black'}} />
  }
  if(apartmentsearch===true)
  {
      return <Redirect to={`/housing/?city=${input.city.toUpperCase()}&state=${input.state.toUpperCase()}&country=${input.country.toUpperCase()}&booking_date=${input.date}`} style={{textDecoration:'none',color:'black'}} />
  }

    

    
    return (
        <div>
           
            
            <div className={classes.containerclass}>
                <div className={classes.headerclass}>
                    <Welcome />
                </div>
            </div>
            
            <CookieConsent
                location="bottom"
                buttonText="Got it"
                cookieName="myAwesomeCookieName2"
                style={{ background: "#b6c9f0" ,color:'#FFFFFF'}}
                buttonStyle={{ backgroundColor: "Transparent", fontSize: "14px", border:"2px solid #FFFFFF",color:'#FFFFFF' }}
                expires={150}
                debug={true}
            >
                This website uses cookies to enhance the user experience.{" "}
                <span style={{ fontSize: "13px" }}></span>
            </CookieConsent>
            

            <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              A seller can't place a booking
            </Alert>
          </Snackbar>
            
            

            {
                luxrooms.length>=1 ? <><Paper elevation={5} className={classes.paperclass}>
                <div className="navbarclass1">
                <div   className={classes.myclass}>
                <Typography variant='h6' className={classes.textclass}>
                <Box fontSize={20}>
                            <Link to='/rooms/?category=Deluxe+room' style={{textDecoration:'none',color:'white'}}>Our Deluxe Rooms...</Link>
                        </Box>
                </Typography>
                </div>
                </div>
                </Paper>
                <br />
                <div className={classes.myclass1}>
                <Scrollroom rooms={luxrooms}/>
                </div>
                
    
                <br /></> : null
            }


            
            
            {
                classroom.length>=1 ? <><Paper elevation={5} className={classes.paperclass}>
                <div className="navbarclass1">
                <div   className={classes.myclass}>
                <Typography variant='h6' className={classes.textclass}>
                <Box fontSize={20}>

                    <Link to='/rooms/?category=Classic+room' style={{textDecoration:'none',color:'white'}}>Our Classic Rooms...</Link>
                    </Box>
                </Typography>
                </div>
                </div>
                </Paper>
                <br />
                <div className={classes.myclass1}>
                <Scrollroom rooms={classroom}/>
                </div>
    
                <br /></> : null
            }
            

            {
                singleroom.length>=1 ? <><Paper elevation={5} className={classes.paperclass}>
                <div className="navbarclass1">
                <div   className={classes.myclass}>
                <Typography variant='h6' className={classes.textclass}>
                <Box fontSize={20}>
                    <Link to='/rooms/?category=Single' style={{textDecoration:'none',color:'white'}}>Our Single Rooms...</Link>
                    </Box>
                </Typography>
                </div>
                </div>
                </Paper>
                <br />
                <div className={classes.myclass1}>
                <Scrollroom rooms={singleroom}/></div> <br /></> : null
            }



            {
                shop.length>=1 ? <><Paper elevation={5} className={classes.paperclass}>
                <div className="navbarclass1">
                <div   className={classes.myclass}>
                <Typography variant='h6' className={classes.textclass}>
                <Box fontSize={20}>

                    <Link to='/shops/' style={{textDecoration:'none',color:'white'}}>Our Shops...</Link>
                    </Box>
                </Typography>
                </div>
                </div>
                </Paper>
                <br />
                <div className={classes.myclass1}>
                <Scrollshop rooms={shop}/></div> <br /></> : null
            }




            {
                apartment.length>=1 ? <><Paper elevation={5} className={classes.paperclass}>
                <div className="navbarclass1">
                <div   className={classes.myclass}>
                <Typography variant='h6' className={classes.textclass}>
                <Box fontSize={20}>

<Link to='/apartments/' style={{textDecoration:'none',color:'white'}}>Our Housing...</Link>
</Box>
                </Typography>
                </div>
                </div>
                </Paper>
                <br />
                <div className={classes.myclass1}>
                <Scrollapartment rooms={apartment}/></div> <br /></> : null
            }
            
            <Paper elevation={5} className={classes.paperclass}>
            <div className="navbarclass1">
            <div   className={classes.myclass}>
            <Typography variant='h6' className={classes.textclass}>
                <Box fontSize={20}>

                %Offers and discount
                </Box>
            </Typography>
            </div>
            </div>
            </Paper>
            <br />
            {
                coupons.length>=1 ? <>
                
                <div className={classes.myclass1}>
                <Scrollcoupons rooms={coupons}/></div> <br /></> : null
            }
            <div>
            </div>



            <br />
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            
            >

            <div className={`searchcardme`}>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >
                {/* <div className={demowrap}></div> */}
            <Paper elevation={5} className={`backgroundclass1 ${classes.yoyoclass}`}>
                <br />

                <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.gridclassnew}
            
            >
            
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >
           
            <Tabs
                value={value}
                indicatorColor="primary"
                
                onChange={handleChange}
                aria-label="disabled tabs example"
                className={classes.navclass}
            >
                <Tab label="Rooms" icon={<MeetingRoomIcon />} className={classes.navclass122} value='Rooms'/>
                <Tab label="Shops" icon={<StorefrontIcon />} className={classes.navclass122} value='Shops'/>
                <Tab label="Housing" icon={<ApartmentIcon />} className={classes.navclass122} value='Housing'/>
            </Tabs>
          
            </Grid>
            <br />
            
            
          <Hidden smDown>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.navclass}
            
           
            
            >
                {/* <div className={classes.white}> */}

                    <div className={classes.root12}>
                    <StyledTextField id="city" label="City" variant="outlined" name="city" value={input.city} onInput={handleinput}/>
                     </div>
                {/* </div> */}
                {/* <div className={classes.white}> */}

                    <div className={classes.root12}>
                    <StyledTextField id="state" label="State" variant="outlined" name="state" value={input.state} onInput={handleinput}/>
                    </div>
                {/* </div> */}
                {/* <div className={classes.white}> */}

                    <div className={classes.root12}>
                    <StyledTextField id="country" label="Country" variant="outlined" name="country" value={input.country} onInput={handleinput}/>
                    </div>
            

            </Grid>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.navclass}
            
            >

            <DatePick value={input} setvalue={setinput} name={'date'} />

            </Grid>
            </Hidden>


            <Hidden mdUp>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           
            
           
            
            >
              

                  
              <Grid item xs={6}>
              <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           
            
           
            
            >
                    <StyledTextField id="city" label="City" variant="outlined" name="city" value={input.city} onInput={handleinput}/>
                    </Grid>
                    </Grid>
                    <Grid item xs={6}>
                    <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           
            
           
            
            >
                    <StyledTextField id="state" label="State" variant="outlined" name="state" value={input.state} onInput={handleinput}/>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           
            
           
            
            >
                   <Grid item xs={6}>
                   <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           
            
           
            
            >
                    <StyledTextField id="country" label="Country" variant="outlined" name="country" value={input.country} onInput={handleinput}/>
                    </Grid>
                    </Grid>
                    <Grid item xs={6}>
                    <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
           
            
           
            
            >
                    <DatePick value={input} setvalue={setinput} name={'date'} />
                    </Grid></Grid>
                    </Grid>

          
            </Hidden>
           

           

            <br />

            

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.navclass}
            
            >

            <Button variant="contained" color="primary" onClick={handleclick}>Search</Button>

            </Grid>
            <br />

            </Grid>
                
            </Paper>
            </Grid>
            </div>

            </Grid>

            <br />
            <br />


            

                {/* <br></br> */}
    <Footer />
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
    )
}

export default Home
