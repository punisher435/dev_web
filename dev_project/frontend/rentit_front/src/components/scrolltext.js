import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import AcUnitIcon from '@material-ui/icons/AcUnit';

import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
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
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined';
import WeekendIcon from '@material-ui/icons/Weekend';

import RoomIcon from '@material-ui/icons/Room';
// import Box from '@material-ui/core/Box'

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    margin:0,
    padding:0,
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: '0%',

    margin:0,
    padding:0,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(0),
    color: 'rgba(0, 0, 0, 0.87)',
    opacity: 1,
    maxWidth:1000,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.87)',
      opacity: 1,
    },
    '&$selected': {
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(0),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

export default function CustomizedTabs({post}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('Wifi Facility');

  const handleChange = (event, newValue) => {
    event.preventDefault();
  
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs 
        variant='scrollable'
        aria-label="ant example"
        value={false}
        onClick={handleChange}
       >


            
 
<AntTab icon={<RoomIcon color="error"/>} id="112" /> 

         <AntTab label={post.location} id="location" /> 
         <AntTab label="," />
         <AntTab label={post.city} id="city" />
         <AntTab label="," />
         <AntTab label={post.district} id="district" /> 
         <AntTab label="," /> 
         <AntTab label={post.state} id="state" /> 
         <AntTab label="," />
         <AntTab label={post.country} id="country" /> 
         <AntTab label="," />
         <AntTab label={post.pincode} id="pincode" /> 
        
        </AntTabs>
      </div>
      
    </div>
  );
}

