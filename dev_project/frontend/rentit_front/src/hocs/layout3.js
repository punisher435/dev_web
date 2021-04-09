import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import AccountCircle from '@material-ui/icons/AccountCircle';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import {Link} from 'react-router-dom'
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import '../components/css/App.css'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
      },
      sectionDesktop: {
        display: 'flex',
        
      },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  myclass: {
    color:'white',
  },
}));

function Dashboarddrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pic,setpic] = React.useState('')
  const [seller,setseller] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  React.useEffect(
    async () => {

      const config = {
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`,
          },
        };
        if(props.profile)
        {
          setseller(props.profile.is_seller);
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${props.profile.id}/`,config);
        
        setpic(res.data.photo);

        
        }
          catch{

          }
          
        
          
      
        }
        
    }
    
,[props.profile])

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        
      <Link to='/dashboard/analytics' style={{textDecoration:'none',color:'black'}}><ListItem button key="Analytics">
            <ListItemIcon><EqualizerOutlinedIcon/></ListItemIcon>
            <ListItemText primary="Analytics" />
        </ListItem></Link>

        <Link to='/dashboard/recentbookings' style={{textDecoration:'none',color:'black'}}><ListItem button key="Bookings">
            <ListItemIcon><ViewListOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Bookings" />
        </ListItem></Link>

        {
          seller ? <Link to='/dashboard/my_rooms' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Rooms">
          <ListItemIcon><MeetingRoomOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Rooms" />
          </ListItem></Link> : null
        }
        {
          seller ? <Link to='/dashboard/my_shops' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Shops">
          <ListItemIcon><StorefrontOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Shops" />
          </ListItem></Link> : null
        }
        {
          seller ? <Link to='/dashboard/my_housing' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Apartments">
          <ListItemIcon><HomeWorkOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Houses" />
          </ListItem></Link> : null
        }

        {
          seller ? <Link to='/dashboard/my_coupons' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Coupons">
          <ListItemIcon><AccountBalanceWalletOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Coupons" />
          </ListItem></Link> : null
        }

        {
          seller ? <Link to='/dashboard/my_reviews' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Coupons">
          <ListItemIcon><FeedbackOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Feedback" />
          </ListItem></Link> : null
        }

        <Link to='/dashboard/profile' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Profile">
            <ListItemIcon><PersonOutlinedIcon /></ListItemIcon>
            <ListItemText primary="My Profile" />
        </ListItem></Link>

        {
          seller ? null :  <Link to='/dashboard/complaints/room' style={{textDecoration:'none',color:'black'}}><ListItem button key="Room complaints">
          <ListItemIcon><CommentOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Room complaints" />
      </ListItem></Link>
        }


{
          seller ? null :  <Link to='/dashboard/complaints/shop' style={{textDecoration:'none',color:'black'}}><ListItem button key="Shop complaints">
          <ListItemIcon><CommentOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Shop complaints" />
      </ListItem></Link>
        }


{
          seller ? null :  <Link to='/dashboard/complaints/housing' style={{textDecoration:'none',color:'black'}}><ListItem button key="Housing complaints">
          <ListItemIcon><CommentOutlinedIcon /></ListItemIcon>
          <ListItemText primary="housing complaints" />
      </ListItem></Link>
        }

{
          props.profile.is_superuser ?  <Link to='/admin/jdwai2021801yadb28ykha2sad1893812/awuhd812832232w7dyqw1/ada' style={{textDecoration:'none',color:'black'}}><ListItem button key="Housing complaints">
          <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
          <ListItemText primary="Admin" />
      </ListItem></Link> : null
        }


       
        
      </List>
      <Divider />
      <List>
       
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className="navbarclass">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.myclass}>
            Dashboard
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
            props.profile ? <Avatar className={classes.purple} alt={props.profile.first_name.toUpperCase()} src={pic} /> : <AccountCircle />
            }
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />


      </main> */}
    </div>
  );
}


const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    profile : state.authreducers.user
  });
  
export default connect(mapStateToProps)(Dashboarddrawer);

