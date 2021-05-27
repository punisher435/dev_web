import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

import CouponCard from "./newcoupon";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Hidden from '@material-ui/core/Hidden';
// import Box from '@material-ui/core/Box'




import ScrollMenu from 'react-horizontal-scrolling-menu';
import './css/App.css';

const useStyles = makeStyles((theme) => ({
  scrollclass:{
  
  },
}));



export default function CustomizedTabs1({post}) {

  const classes = useStyles();

    const MenuItem = ({coupon}) => {
        return <CouponCard mycoupon={coupon} />;
      };
      
      // All items component
      // Important! add unique key
      const Menu = (post) =>
        
        post.map(room => {
          
          return <MenuItem coupon={room} key={room.coupoun_code}/>;
        })
        

    const Arrow = ({ text, className }) => {
        return (
          <Button variant="outlined"
            className={className}
          >{text}</Button>
        );
      };

    const ArrowLeft = Arrow({ text: <ArrowBackIosIcon />, className: '' });
    const ArrowRight = Arrow({ text: <ArrowForwardIosIcon />, className: '' });

    
    const [menuItems,setitems] = React.useState()

    React.useEffect(() => {
      setitems(Menu(post))
     
      
      
    },[post])
     
   
    
    if(post && menuItems){


      const menu = menuItems;
   
      
     
      
      
    return (
        <div className="App">
        <Hidden mdDown><ScrollMenu
          data={menu}
         
          className={classes.scrollclass}
         
          alignCenter={false}
          arrowClass='myarrow'
          wheel={false}
          transition={0.9}
          inertiaScrollingSlowdown={1.0}
          
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          inertiaScrolling={true}
          
        /></Hidden>
         <Hidden lgUp><ScrollMenu
          data={menu}
          transition={0.9}
          className={classes.scrollclass}
          wheel={false}
          alignCenter={false}
          inertiaScrollingSlowdown={1.0}
         
          inertiaScrolling={true}
          
        /></Hidden>
      </div>
    )}
    else{
      return <></>;
    }
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
