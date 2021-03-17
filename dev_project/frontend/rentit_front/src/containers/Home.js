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
axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const useStyles = makeStyles((theme) => ({
    myclass: {
        marginLeft:'4%'
    },
    myclass1: {
        marginLeft:'2%'
    },
    textclass: {
        color:'white',
        padding:'10px',
    },
    bgclass:{
        backgroundColor: '#2d3436',
        backgroundImage: 'linear-gradient(315deg, #2d3436 0%, #000000 74%)',
        elevation:30,
    },

    headerclass:{
        
      },
      containerclass:{
       
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
      return <Redirect to={`/rooms/?city=${input.city}&state=${input.state}&country=${input.country}&booking_date=${input.date}`} style={{textDecoration:'none',color:'black'}} />
  }
  if(shopsearch===true)
  {
      return <Redirect to={`/shops/?city=${input.city}&state=${input.state}&country=${input.country}&booking_date=${input.date}`} style={{textDecoration:'none',color:'black'}} />
  }
  if(apartmentsearch===true)
  {
      return <Redirect to={`/apartments/?city=${input.city}&state=${input.state}&country=${input.country}&booking_date=${input.date}`} style={{textDecoration:'none',color:'black'}} />
  }

    

    
    return (
        <div>
           
            
            <div className={classes.containerclass}>
                <div className={classes.headerclass}>
                    <Welcome />
                </div>
            </div>
            
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >
            <Paper elevation={5} className={classes.paperclass1}>
                <br />
            
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >
            <Paper square elevation={0}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
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
            <div className={classes.root12}>
            <TextField id="city" label="City" variant="outlined" name="city" value={input.city} onInput={handleinput}/>
            </div>
            <div className={classes.root12}>
            <TextField id="state" label="State" variant="outlined" name="state" value={input.state} onInput={handleinput}/>
            </div>
            <div className={classes.root12}>
            <TextField id="country" label="Country" variant="outlined" name="country" value={input.country} onInput={handleinput}/>
            </div>

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

            <br />
            <br />
            

            {
                luxrooms.length>=1 ? <><div
                className={classes.myclass}
                >
                <Typography variant='h6'>
                    <Link to='/rooms/?category=Deluxe+room' style={{textDecoration:'none',color:'black'}}>Our Deluxe Rooms...</Link>
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
                    <Link to='/rooms/?category=Classic+room' style={{textDecoration:'none',color:'black'}}>Our Classic Rooms...</Link>
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
                    <Link to='/rooms/?category=Single' style={{textDecoration:'none',color:'black'}}>Our Single Rooms...</Link>
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
                    <Link to='/shops/' style={{textDecoration:'none',color:'black'}}>Our Shops...</Link>
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
                    <Link to='/apartments/' style={{textDecoration:'none',color:'black'}}>Our Housing...</Link>
                </Typography>
                </div>
                <br />
                <div className={classes.myclass1}>
                <Scrollapartment rooms={apartment}/></div> <br /></> : null
            }
            
            <Paper elevation={5} className={classes.paperclass}>
            <div className={classes.bgclass}>
            <div
                className={classes.myclass}
                >
            <Typography variant='h6' className={classes.textclass}>
                %Offers and discount
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


            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.gridclass1}
            spacing={1}
            >
                <Grid item xs={4} >
                <Paper elevation={5} className='gridme1' >
                <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                hy
            </Grid>
            </Paper>
                </Grid>

                <Grid item xs={4} >
                <Paper elevation={5} className='gridme1' >
                <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                hy
            </Grid>
            </Paper>
                </Grid>

                
                <Grid item xs={4} >
                <Paper elevation={5} className='gridme1'>
                <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                hy
            </Grid>
            </Paper>
                </Grid>
                
            </Grid>
         

            
            
                        
        </div>
    )
}

export default Home
