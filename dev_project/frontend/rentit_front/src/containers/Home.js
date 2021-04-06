import React from 'react'
import Welcome from './Welcome'
import CardList from './CardList'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import axios from 'axios'
import RecipeReviewCard from '../components/newcardroom';
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
import { Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import "../components/css/App.css"
import bgd from "../components/css/abc.png"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
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


function Home() {
    const classes = useStyles();
    const [luxrooms,setluxrooms] = React.useState([])
    const [classroom,setclassroom] = React.useState([])
    const [singleroom,setsingleroom] = React.useState([])
    const [shop,setshop] = React.useState([])
    const [apartment,setapartment] = React.useState([])
    const [coupons,setcoupons] = React.useState([])
    const isSmall = useMediaQuery("(max-width: 600px)");


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
          console.log(res.data.results);
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
      return <Redirect to={`/apartments/?city=${input.city.toUpperCase()}&state=${input.state.toUpperCase()}&country=${input.country.toUpperCase()}&booking_date=${input.date}`} style={{textDecoration:'none',color:'black'}} />
  }

    

    
    return (
        <div>
           
            
            <div className={classes.containerclass}>
                <div className={classes.headerclass}>
                    <Welcome />
                </div>
            </div>
            <br />

            <div className="searchcardme">
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >
                {/* <div className={demowrap}></div> */}
            <Paper elevation={5} className={classes.bgclass2}>
                <br />
            
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >
            <Paper square elevation={0} className={classes.navclass}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
                className={classes.navclass}
            >
                <Tab label="Rooms" icon={<MeetingRoomIcon />} value='Rooms'/>
                <Tab label="Shops" icon={<StorefrontIcon />} value='Shops'/>
                <Tab label="Housing" icon={<ApartmentIcon />} value='Housing'/>
            </Tabs>
            </Paper>
            </Grid>
            <br />
            
            

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
           
            
            >
                {/* <div className={classes.white}> */}

                    {/* <div className={classes.root12}> */}
                    <TextField id="city" label="City" variant="outlined" name="city" value={input.city} onInput={handleinput}/>
                    {/* </div> */}
                {/* </div> */}
                {/* <div className={classes.white}> */}

                    {/* <div className={classes.root12}> */}
                    <TextField id="state" label="State" variant="outlined" name="state" value={input.state} onInput={handleinput}/>
                    {/* </div> */}
                {/* </div> */}
                {/* <div className={classes.white}> */}

                    {/* <div className={classes.root12}> */}
                    <TextField id="country" label="Country" variant="outlined" name="country" value={input.country} onInput={handleinput}/>
                    {/* </div> */}
            

            </Grid>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >

            <DatePick value={input} setvalue={setinput} name={'date'} />

            </Grid>

            <br />

            

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >

            <Button variant="contained" color="primary" onClick={handleclick}>Search</Button>

            </Grid>
            <br />

            
                
            </Paper>
            </Grid>
            </div>

            <br />
            <br />
            

            {
                luxrooms.length>=1 ? <><div
                className={classes.myclass}
                >
                <Typography variant='h6'>
                    <Box fontSize={25}>
                        <Link to='/rooms/?category=Deluxe+room' style={{textDecoration:'none',color:'black'}}>Our Deluxe Rooms...</Link>
                    </Box>
                </Typography>
                </div>
                <br />
                <div className={classes.myclass1}>
                <Scrollroom rooms={luxrooms}/>
                </div>
                
    
                <br /></> : null
            }
            
            
            {
                classroom.length>=1 ? <><div
                className={classes.myclass}
                >
                <Typography variant='h6'>
                    <Box fontSize={25}>

                    <Link to='/rooms/?category=Classic+room' style={{textDecoration:'none',color:'black'}}>Our Classic Rooms...</Link>
                    </Box>
                </Typography>
                </div>
                <br />
                <div className={classes.myclass1}>
                <Scrollroom rooms={classroom}/>
                </div>
    
                <br /></> : null
            }
            

            {
                singleroom.length>=1 ? <><div
                className={classes.myclass}
                >
                <Typography variant='h6'>
                    <Box fontSize={25}>
                    <Link to='/rooms/?category=Single' style={{textDecoration:'none',color:'black'}}>Our Single Rooms...</Link>
                    </Box>
                </Typography>
                </div>
                <br />
                <div className={classes.myclass1}>
                <Scrollroom rooms={singleroom}/></div> <br /></> : null
            }

            {
                shop.length>=1 ? <><div
                className={classes.myclass}
                >
                <Typography variant='h6'>
                    <Box fontSize={25}>

                    <Link to='/shops/' style={{textDecoration:'none',color:'black'}}>Our Shops...</Link>
                    </Box>

                </Typography>
                </div>
                <br />
                <div className={classes.myclass1}>
                <Scrollshop rooms={shop}/></div> <br /></> : null
            }


            {
                apartment.length>=1 ? <><div
                className={classes.myclass}
                >
                <Typography variant='h6'>
                    <Box fontSize={25}>

                    <Link to='/apartments/' style={{textDecoration:'none',color:'black'}}>Our Housing...</Link>
                    </Box>
                </Typography>
                </div>
                <br />
                <div className={classes.myclass1}>
                <Scrollapartment rooms={apartment}/></div> <br /></> : null
            }
            
            <Paper elevation={5} className={classes.paperclass}>
            <div className={classes.bgclass}>
            <div   className={classes.myclass}>
            <Typography variant='h6' className={classes.textclass}>
                <Box fontSize={25}>

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


            <div className={classes.myclass2}>
            <Typography variant='h6'className={classes.textclass} >
                <Box lineHeight={2} fontSize={28}>
                La Kavatos Production
                </Box>
            </Typography>
            </div>

                {/* <br></br> */}
    <div className={classes.footer1}>

        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
            spacing={4}
            >

                
            <Grid item xs={12} sm={3}>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                >
                <Grid item xs={12}>
                    <Typography variant='h6' className={classes.textclass}>
                        <Box lineHeight={1} fontSize={25}>
                        Rentit
                        </Box>
                    </Typography>
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
                        (No. of rooms booked from our website)
                </Box>
                    </Typography>
                </Grid>
            </Grid>
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
            </Grid>
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
                        Terms and conditions
                    </Typography>
                </Grid>
                
            </Grid>
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
    )
}

export default Home
