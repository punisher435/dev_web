import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WifiIcon from '@material-ui/icons/Wifi';
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
// import Box from '@material-ui/core/Box'

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: '0%',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(0),
    color: 'rgba(0, 0, 0, 0.87)',
    opacity: 1,
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
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs 
        variant='scrollable'
        aria-label="ant example"
        value={false}
       >


            
 <IconContext.Provider value={{ size: "1.5em",}}>
         { 
        post.wifi ? 
        <AntTab label="Wifi Facility" value="Wifi Facility" icon={<WifiOutlinedIcon />} /> 
        // <AntTab label="Room TV" icon={<TvOutlinedIcon />} /> 
        
        : null
        }
        
        { 
        post.room_TV ? 
        <AntTab label="Room TV" icon={<TvOutlinedIcon />} /> 
        : null
        }
        { 
        post.house_TV ? 
        <AntTab label="House TV" icon={<TvOutlinedIcon />} />
        : null
        }
        { 
        post.balcony ? 
        <AntTab label="Balcony" icon={<MeetingRoomOutlinedIcon />} />
        : null
        }
        { 
        post.separate_washroom ? 
        <AntTab label="Separate washroom" icon={<BathtubIcon />} />
        : null
        }
        { 
        post.purified_water ? 
            <AntTab label="Pure Water" icon={<IoWaterOutline/>} />
        : null
        }
        { 
        post.geyser ? 
        <AntTab label="Hot Water" icon={<HotTubIcon />} />
        : null
        }
        { 
        post.AC ? 
        <AntTab label="AC" icon={<AcUnitIcon />} />
        : null
        }
        { 
        post.cooler ? 
        <AntTab label="Cooler" icon={<ToysIcon />} />
        : null
        }
        { 
        post.laundry ? 
        <AntTab label="Laundry" icon={<LocalLaundryServiceIcon />} />
        : null
        }
        { 
        post.iron ?
        <AntTab label="Iron" icon={<WhatshotIcon />} />
        : null
        }
        { 
        post.guest_allowed ? 
        <AntTab label="Breakfast" icon={<AccessibilityIcon />} />
        : null
        }
        { 
        post.breakfast ? 
        <AntTab label="" icon={<FreeBreakfastIcon />} />
        : null
        }
        { 
        post.lunch ? 
        <AntTab label="lunch" icon={<FastfoodIcon />} />
        : null
        }
        { 
        post.dinner ? 
        <AntTab label="dinner" icon={<BiFoodMenu />} />
        : null
        }
        { 
        post.cctv_building ? 
        <AntTab label="CCTV" icon={<BiCctv />} />
        : null
        }
        { 
        post.building_guard ? 
        <AntTab label="Security guard" icon={<GiGuards />} />
        : null
        }
        </IconContext.Provider>
        </AntTabs>
      </div>
      
    </div>
  );
}

