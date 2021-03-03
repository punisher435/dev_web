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
    minWidth: '16%',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(0),
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
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
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
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs 
        variant='scrollable'
        aria-label="ant example"
        value={value}
        onChange={handleChange}>


            
 <IconContext.Provider value={{ size: "1.5em",}}>
         { 
        post.wifi ? 
        <AntTab label="Wifi Facility" icon={<WifiIcon />} disabled/>
        // <Grid item ><div><Icon fontSize='small' ><WifiIcon /></Icon><p style={mystyle}>Wifi Facility</p></div></Grid> 
        : <></>
        }
        
        { 
        post.room_TV ? 
        <AntTab label="Room TV" icon={<TvOutlinedIcon />} disabled/> 
        // <Grid item ><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>Room TV</p></div> </Grid> 
        : <p></p>
        }
        { 
        post.house_TV ? 
        <AntTab label="House TV" icon={<TvOutlinedIcon />} disabled/>
        // <Grid item ><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>House TV</p></div></Grid> 
        : <></>
        }
        { 
        post.balcony ? 
        <AntTab label="Balcony" icon={<MeetingRoomOutlinedIcon />} disabled/>
        : <></>
        }
        { 
        post.separate_washroom ? 
        <AntTab label="Separate washroom" icon={<BathtubIcon />} disabled/>
        : <></>
        }
        { 
        post.purified_water ? 
            <AntTab label="Pure Water" icon={<IoWaterOutline/>} disabled/>
        : <></>
        }
        { 
        post.geyser ? 
        <AntTab label="Hot Water" icon={<HotTubIcon />} disabled/>
        : <></>
        }
        { 
        post.AC ? 
        <AntTab label="AC" icon={<AcUnitIcon />} disabled/>
        : <></>
        }
        { 
        post.cooler ? 
        <AntTab label="Cooler" icon={<ToysIcon />} disabled/>
        : <></>
        }
        { 
        post.laundry ? 
        <AntTab label="Laundry" icon={<LocalLaundryServiceIcon />} disabled/>
        : <></>
        }
        { 
        post.iron ?
        <AntTab label="Iron" icon={<WhatshotIcon />} disabled/>
        : <></>
        }
        { 
        post.guest_allowed ? 
        <AntTab label="Breakfast" icon={<AccessibilityIcon />} disabled/>
        : <></>
        }
        { 
        post.breakfast ? 
        <AntTab label="" icon={<FreeBreakfastIcon />} disabled/>
        : <></>
        }
        { 
        post.lunch ? 
        <AntTab label="lunch" icon={<FastfoodIcon />} disabled/>
        : <></>
        }
        { 
        post.dinner ? 
        <AntTab label="dinner" icon={<BiFoodMenu />} disabled/>
        : <></>
        }
        { 
        post.cctv_building ? 
        <AntTab label="CCTV" icon={<BiCctv />} disabled/>
        : <></>
        }
        { 
        post.building_guard ? 
        <AntTab label="Security guard" icon={<GiGuards />} disabled/>
        : <></>
        }
        </IconContext.Provider>
        </AntTabs>
        {/* <Typography className={classes.padding} /> */}
      </div>
      
    </div>
  );
}



// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/Phone';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import HelpIcon from '@material-ui/icons/Help';
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-force-tabpanel-${index}`}
//       aria-labelledby={`scrollable-force-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={0}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `scrollable-force-tab-${index}`,
//     'aria-controls': `scrollable-force-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function ScrollableTabsButtonForce() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//         <Tabs
//           variant="scrollable"
//           scrollButtons="on"
//           indicatorColor="primary"
//           textColor="primary"
//           aria-label="scrollable force tabs example"
//         >
//           <Tab icon={<PhoneIcon />} disabled/>
//           <Tab  icon={<FavoriteIcon />} disabled  />
//           <Tab  icon={<PersonPinIcon />} disabled />
//           <Tab  icon={<HelpIcon />} disabled />
//           <Tab  icon={<ShoppingBasket />} disabled />
//           <Tab  icon={<ThumbDown />} disabled/>
//           <Tab  icon={<ThumbUp />} disabled />
//         </Tabs>
      
//     </div>
//   );
// }
