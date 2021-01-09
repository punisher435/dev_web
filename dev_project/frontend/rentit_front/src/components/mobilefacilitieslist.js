import React from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import TvOffOutlinedIcon from '@material-ui/icons/TvOffOutlined';
import { IoWaterOutline } from 'react-icons/io5';
import HotTubIcon from '@material-ui/icons/HotTub';
import ToysIcon from '@material-ui/icons/Toys';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import { BiFoodMenu } from "react-icons/bi"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { BiCctv } from "react-icons/bi";
import { GiGuards } from "react-icons/gi";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BathtubIcon from '@material-ui/icons/Bathtub';
import { IconContext } from "react-icons";


export default function Facilitymobile ({post}){

    const mystyle={
        fontSize:'0.75rem',
        marginLeft:'10px',
        marginRight:'10px',
    }
    const mystyle2 = {
        fontSize:'1.25rem',
        marginLeft:'10px',
        marginRight:'10px',
    }
    return (
    <IconContext.Provider value={{ size: "1.25rem",}}>
    <Grid container alignItems="center">
    { 
    post.wifi ? <Grid item md={2}><div><Icon ><WifiIcon  style={mystyle2}/></Icon><p style={mystyle}>Wifi Facility</p></div></Grid> : <Grid item md={1}><div><WifiOffIcon  style={mystyle2}/><p style={mystyle}>no Wifi</p></div></Grid>
    }
    
    { 
    post.room_TV ?  <Grid item md={2}><div><Icon fontSize='small'><TvOutlinedIcon  style={mystyle2}/></Icon><p style={mystyle}>Room TV</p></div> </Grid> : <></>
    }
    { 
    post.house_TV ? <Grid item md={2}><div><Icon fontSize='small'><TvOutlinedIcon  style={mystyle2}/></Icon><p style={mystyle}>House TV</p></div></Grid> : <div><TvOffOutlinedIcon  style={mystyle2}/><p style={mystyle}>No TV</p></div>
    }
    { 
    post.balcony ? <Grid item md={2}><div><Icon fontSize='small'><MeetingRoomOutlinedIcon  style={mystyle2}/></Icon><p style={mystyle}>Balcony</p></div></Grid> : <></>
    }
    { 
    post.separate_washroom ? <Grid item md={2}><div><Icon fontSize='small'><BathtubIcon  style={mystyle2}/></Icon><p style={mystyle}>Separate washroom</p></div></Grid> : <></>
    }
    { 
    post.purified_water ? <Grid item md={2}><div><IoWaterOutline  style={mystyle2}/><p style={mystyle}>Pure Water</p></div></Grid> : <></>
    }
    { 
    post.geyser ? <Grid item md={2}><div><HotTubIcon  style={mystyle2}/><p style={mystyle}>  Hot Water</p></div></Grid> : <></>
    }
    { 
    post.AC ? <Grid item md={2}><div><AcUnitIcon  style={mystyle2}/><p style={mystyle}>AC</p></div></Grid> : <></>
    }
    { 
    post.cooler ? <Grid item md={2}><div><ToysIcon  style={mystyle2}/><p style={mystyle}>Cooler</p></div></Grid> : <></>
    }
    { 
    post.laundry ? <Grid item md={2}><div><LocalLaundryServiceIcon  style={mystyle2}/><p style={mystyle}>Laundry</p></div></Grid> : <></>
    }
    { 
    post.iron ? <Grid item md={2}><div><WhatshotIcon  style={mystyle2}/><p style={mystyle}>Iron</p></div></Grid> : <></>
    }
    { 
    post.guest_allowed ? <Grid item md={2}><div><AccessibilityIcon  style={mystyle2}/><p style={mystyle}>Guest Allowed</p></div></Grid> : <></>
    }
    { 
    post.breakfast ? <Grid item md={2}><div><FreeBreakfastIcon  style={mystyle2}/><p style={mystyle}>Breakfast</p></div></Grid> : <></>
    }
    { 
    post.lunch ? <Grid item md={2}><div><FastfoodIcon  style={mystyle2}/><p style={mystyle}>Lunch</p></div></Grid> : <></>
    }
    { 
    post.dinner ? <Grid item md={2}><div><BiFoodMenu  style={mystyle2}/><p style={mystyle}>Dinner</p></div></Grid> : <></>
    }
    { 
    post.cctv_building ? <Grid item md={2}><div><BiCctv  style={mystyle2}/><p style={mystyle}>CCTV</p></div></Grid> : <></>
    }
    { 
    post.building_guard ? <Grid item md={2}><div><GiGuards  style={mystyle2}/><p style={mystyle}>Security guard</p></div></Grid> : <></>
    }
        </Grid>
    </IconContext.Provider>
    )
}