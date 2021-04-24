import React from 'react'


import 'bootstrap/dist/css/bootstrap.min.css'; 

import 'antd/dist/antd.css';
import axios from 'axios'

import Grid from '@material-ui/core/Grid';

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
import {Link,Redirect} from 'react-router-dom'
import {withStyles, makeStyles} from '@material-ui/core/styles';



import "../components/css/App.css"


axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const StyledTextField = withStyles((theme) => ({
    root: {
      margin: theme.spacing(2),
      width: 300,
      "& .MuiInputBase-root": {
        color: 'red',
        
        
        height: 60,
        "& input": {
          textAlign: "center",
         
        }
      },

      '& input:valid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
        
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        borderColor: 'red',
        padding: '4px !important', // override inline-style
      },
      "& .MuiFormLabel-root": {
        color: 'red',
       
      }
    }
  }))(TextField);


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
        color:'red',
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




function Serachbox() {

    const [value, setValue] = React.useState('Rooms');
    const [roomsearch,setroomsearch] = React.useState(false)
    const [shopsearch,setshopsearch] = React.useState(false)
    const [apartmentsearch,setapartmentsearch] = React.useState(false)

    const classes = useStyles();


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
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            
            >

            <div className="searchcardme">
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            
            >
                {/* <div className={demowrap}></div> */}
           
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
                
                onChange={handleChange}
                aria-label="disabled tabs example"
                className={classes.navclass}
            >
                <Tab label="Rooms" icon={<MeetingRoomIcon />} value='Rooms'/>
                <Tab label="Shops" icon={<StorefrontIcon />} value='Shops'/>
                <Tab label="Housing" icon={<ApartmentIcon />} value='Housing'/>
            </Tabs>
            
            </Grid>
            <br />
            
            

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
                
           
            </Grid>
            </div>

            </Grid>
        </div>
    )
}

export default Serachbox
