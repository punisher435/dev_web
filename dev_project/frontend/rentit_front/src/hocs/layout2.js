import React from 'react';

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

import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import AccountCircle from '@material-ui/icons/AccountCircle';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';

import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import {Link} from 'react-router-dom'
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import '../components/css/App.css'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Logo from '../logo.png';

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
    
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuButton1: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '250px',
    },
    
    marginRight: theme.spacing(0),
    color:'white'
  },
  // necessary for content to be below app bar
  toolbar: {
    paddingTop:10,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#000000",
    backgroundImage: "linear-gradient(315deg, #000000 0%, #414141 74%);",
  
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  myclass: {
    color:'white',
  },
  layouttextclass: {
    color:'white',
  },
  igclass:{
width:230,
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
      
      <div className={classes.igclass}><Link style={{textDecoration:'none'}} to='/' ><img src={Logo} /></Link></div>
      <br />
      <List>
      

       {
         seller ?  <Link to='/dashboard/analytics' style={{textDecoration:'none',color:'black'}}><ListItem button key="Analytics">
         <ListItemIcon className={classes.layouttextclass}><EqualizerOutlinedIcon/></ListItemIcon>
         <ListItemText primary="Analytics" className={classes.layouttextclass}/>
     </ListItem></Link> : null
       }

     

        <Link to='/dashboard/recentbookings' style={{textDecoration:'none',color:'black'}}><ListItem button key="Bookings">
            <ListItemIcon className={classes.layouttextclass}><ViewListOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Bookings" className={classes.layouttextclass}/>
        </ListItem></Link>

        {
          seller ? <Link to='/dashboard/my_rooms' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Rooms">
          <ListItemIcon className={classes.layouttextclass}><MeetingRoomOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Rooms" className={classes.layouttextclass}/>
          </ListItem></Link> : null
        }
        {
          seller ? <Link to='/dashboard/my_shops' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Shops">
          <ListItemIcon className={classes.layouttextclass}><StorefrontOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Shops" className={classes.layouttextclass}/>
          </ListItem></Link> : null
        }
        {
          seller ? <Link to='/dashboard/my_housing' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Apartments">
          <ListItemIcon className={classes.layouttextclass}><HomeWorkOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Houses" className={classes.layouttextclass}/>
          </ListItem></Link> : null
        }

        {
          seller ? <Link to='/dashboard/my_coupons' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Coupons">
          <ListItemIcon className={classes.layouttextclass}><AccountBalanceWalletOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Coupons" className={classes.layouttextclass}/>
          </ListItem></Link> : null
        }

        {
          seller ? <Link to='/dashboard/my_reviews' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Coupons">
          <ListItemIcon className={classes.layouttextclass}><FeedbackOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Feedback" className={classes.layouttextclass}/>
          </ListItem></Link> : null
        }

<Link to='/dashboard/profile' style={{textDecoration:'none',color:'black'}}><ListItem button key="My Profile">
          <ListItemIcon className={classes.layouttextclass}><PersonOutlinedIcon /></ListItemIcon>
          <ListItemText primary="My Profile" className={classes.layouttextclass}/>
      </ListItem></Link> 



       
        {
          seller ? null :  <Link to='/dashboard/complaints/room' style={{textDecoration:'none',color:'black'}}><ListItem button key="Room complaints">
          <ListItemIcon className={classes.layouttextclass}><CommentOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Room complaints" className={classes.layouttextclass}/>
      </ListItem></Link>
        }


{
          seller ? null :  <Link to='/dashboard/complaints/shop' style={{textDecoration:'none',color:'black'}}><ListItem button key="Shop complaints">
          <ListItemIcon className={classes.layouttextclass}><CommentOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Shop complaints" className={classes.layouttextclass} />
      </ListItem></Link>
        }


{
          seller ? null :  <Link to='/dashboard/complaints/housing' style={{textDecoration:'none',color:'black'}}><ListItem button key="Housing complaints">
          <ListItemIcon className={classes.layouttextclass}><CommentOutlinedIcon /></ListItemIcon>
          <ListItemText primary="housing complaints" className={classes.layouttextclass} />
      </ListItem></Link>
        }



{
          props.profile.is_superuser ?  <Link to='/admin/jdwai2021801yadb28ykha2sad1893812/awuhd812832232w7dyqw1/ada' style={{textDecoration:'none',color:'black'}}><ListItem button key="Housing complaints">
          <ListItemIcon className={classes.layouttextclass}><SupervisorAccountIcon /></ListItemIcon>
          <ListItemText primary="Admin" className={classes.layouttextclass}/>
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
          <Link style={{textDecoration:'none'}} to='/' ><IconButton className={classes.menuButton1}><ArrowBackOutlinedIcon /></IconButton></Link>
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
        <Hidden smUp implementation="css">
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
        <Hidden xsDown implementation="css">
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

