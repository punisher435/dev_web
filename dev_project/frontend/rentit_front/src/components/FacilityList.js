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


export default function Facility ({post}){
    return (
    <IconContext.Provider value={{ size: "1.5em",}}>
    <Grid container alignItems="center">
    { 
    post.wifi ? <Grid item md={2}><div><Icon fontSize='small'><WifiIcon /></Icon><p >Wifi Facility</p></div></Grid> : <Grid item md={1}><div><WifiOffIcon /><p>no Wifi</p></div></Grid>
    }
    
    { 
    post.room_TV ?  <Grid item md={2}><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>Room TV</p></div> </Grid> : <></>
    }
    { 
    post.house_TV ? <Grid item md={2}><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>House TV</p></div></Grid> : <div><TvOffOutlinedIcon /><p>No TV</p></div>
    }
    { 
    post.balcony ? <Grid item md={2}><div><Icon fontSize='small'><MeetingRoomOutlinedIcon /></Icon><p>Balcony</p></div></Grid> : <></>
    }
    { 
    post.separate_washroom ? <Grid item md={2}><div><Icon fontSize='small'><BathtubIcon /></Icon><p>Separate washroom</p></div></Grid> : <></>
    }
    { 
    post.purified_water ? <Grid item md={2}><div><IoWaterOutline /><p>Pure Water</p></div></Grid> : <></>
    }
    { 
    post.geyser ? <Grid item md={2}><div><HotTubIcon /><p>  Hot Water</p></div></Grid> : <></>
    }
    { 
    post.AC ? <Grid item md={2}><div><AcUnitIcon /><p>AC</p></div></Grid> : <></>
    }
    { 
    post.cooler ? <Grid item md={2}><div><ToysIcon /><p>Cooler</p></div></Grid> : <></>
    }
    { 
    post.laundry ? <Grid item md={2}><div><LocalLaundryServiceIcon /><p>Laundry</p></div></Grid> : <></>
    }
    { 
    post.iron ? <Grid item md={2}><div><WhatshotIcon /><p>Iron</p></div></Grid> : <></>
    }
    { 
    post.guest_allowed ? <Grid item md={2}><div><AccessibilityIcon /><p>Guest Allowed</p></div></Grid> : <></>
    }
    { 
    post.breakfast ? <Grid item md={2}><div><FreeBreakfastIcon /><p>Breakfast</p></div></Grid> : <></>
    }
    { 
    post.lunch ? <Grid item md={2}><div><FastfoodIcon /><p>Lunch</p></div></Grid> : <></>
    }
    { 
    post.dinner ? <Grid item md={2}><div><BiFoodMenu /><p>Dinner</p></div></Grid> : <></>
    }
    { 
    post.cctv_building ? <Grid item md={2}><div><BiCctv /><p>CCTV</p></div></Grid> : <></>
    }
    { 
    post.building_guard ? <Grid item md={2}><div><GiGuards /><p>Security guard</p></div></Grid> : <></>
    }
        </Grid>
    </IconContext.Provider>
    )
}