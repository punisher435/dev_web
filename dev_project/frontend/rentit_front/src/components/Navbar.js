import React,{Fragment} from 'react';
import { fade, makeStyles ,withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';

import MoreIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';

import { NavLink,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/auth/actions/auth_actions';
import styles from './css/navbar.module.css';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import axios from 'axios';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import './css/App.css'
import logo from '../logo.png';
import InfoIcon from '@material-ui/icons/Info';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import StorefrontIcon from '@material-ui/icons/Storefront';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const StyledMenu = withStyles({
  paper: {
   
    right:15,
    left:'auto !important'
    
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal:"right",
    }}
    
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    color:'white',
    
  },
  body: {
    display: 'none',
    fontSize:'18px',
    color:'white',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  body2:{
    display: 'block',
    fontSize:'18px',
    color:'black',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  logoclass:{
   width:200,
   marginLeft:-20,
   [theme.breakpoints.up('md')]: {
    width:220,
  },
   
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  yoclass:{
    display:'inline',
  },
  yo1class:{
    padding:0,
    marginRight:10,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  
  },
  give:{
   right:0,
  },
  AppBar: process.env.REACT_APP_THEME,
}));







function RenteneAppBar(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(false);

    const logout_user = () => {
        props.logout();
        setRedirect(true);
    };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleprofileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
   
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    
  };



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    < StyledMenu
     
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.give}
    >
      <NavLink className={`nav-link ${styles.textclass2}`} exact to={props.profile ? props.profile.is_seller ? '/dashboard/analytics' : '/dashboard/profile' : '/dashboard/profile'}><MenuItem onClick={handleMenuClose}>Dashboard</MenuItem></NavLink>
     
      {
        props.isAuthenticated ? <NavLink className={`nav-link ${styles.textclass2}`} exact to='/#!' onClick={logout_user}><MenuItem onClick={handleMenuClose}>Logout</MenuItem></NavLink> : null
      }
      
   </ StyledMenu>
  );


  const [pic,setpic] = React.useState('')
  const [wishlist,setwishlist] = React.useState(0)


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
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${props.profile.id}/`,config);
        
        setpic(res.data.photo);
        
        }
          catch{

          }
          try {
            await axios.put(`${process.env.REACT_APP_API_URL}/souraawdgrg33w24/wishlist/rooms/1/`,config,config)
            .then(res1 => {
              setwishlist(res1.data);
            })
            .catch(err => {
              
            })
            
            }
            catch{
            }
        
          
      
        }
        
    }
    
,[props.profile])

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    < StyledMenu
     
     
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.give}
    >

      <MenuItem>

      <NavLink className={`nav-link ${styles.textclass2}`} exact to='/rooms'>
        <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
        
            <MeetingRoomIcon />
          
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Our Rooms</Typography>
        </NavLink>
      </MenuItem>

      <MenuItem>

      <NavLink className={`nav-link ${styles.textclass2}`} exact to='/shops'>
        <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
      
            < StorefrontIcon  />
         
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Our Shops</Typography>
        </NavLink>
      </MenuItem>

      <MenuItem>

      <NavLink className={`nav-link ${styles.textclass2}`} exact to='/housing'>
        <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
        
            <HomeIcon />
       
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Our Housing</Typography>
        </NavLink>
      </MenuItem>
      <MenuItem>
      <NavLink className={`nav-link ${styles.textclass2}`} exact to='/about-us'>
      <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
        
        <InfoIcon />
   
    </IconButton>
        <Typography variant="body1" className={classes.yoclass}>About us</Typography>
        </NavLink>
      </MenuItem>


          {
            props.isAuthenticated ? null : <><MenuItem><NavLink className={`nav-link ${styles.textclass2}`} exact to='/login'>
            <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
            
                <VpnKeyIcon />
           
            </IconButton>
            <Typography variant="body1" className={classes.yoclass}>Login</Typography>
            </NavLink></MenuItem>
            <MenuItem><NavLink className={`nav-link ${styles.textclass2}`} exact to='/signup'>
        <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
         
            <LockOpenIcon />
         
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Sign up</Typography>
        </NavLink></MenuItem></>
          }




      <MenuItem>
      {
        props.focus ? <NavLink className={`nav-link ${styles.textclass2}`} exact to='/wishlist'>
        <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
          <Badge badgeContent={props.no} color="secondary">
            <FavoriteOutlinedIcon />
          </Badge>
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Wishlist</Typography>
        </NavLink> : <NavLink className={`nav-link ${styles.textclass2}`} exact to='/wishlist'>
        <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
          <Badge badgeContent={wishlist} color="secondary">
            <FavoriteOutlinedIcon />
          </Badge>
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Wishlist</Typography>
        </NavLink>
      }
      
      </MenuItem>

      {
        props.isAuthenticated ? <MenuItem >
        <NavLink className={`nav-link ${styles.textclass2}`} exact to='/#!' onClick={logout_user}>
         <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
         
            <ExitToAppIcon />
        
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Logout</Typography>
          </NavLink></MenuItem>
        
        
        : null
      }



      {
        props.isAuthenticated ?  <><MenuItem >
        <NavLink className={`nav-link ${styles.textclass2}`} exact to={props.profile ? props.profile.is_seller ? '/dashboard/analytics' : '/dashboard/profile' : '/dashboard/profile'}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.yo1class}
        >
          {
                props.profile ? <Avatar className={classes.purple} alt={props.profile.first_name.toUpperCase()} src={pic} /> : <AccountCircle />
              }
        </IconButton>
        <Typography variant="body1" className={classes.yoclass}>Dashboard</Typography>
        </NavLink>
      </MenuItem>
      
      </> : null
      }

      
     
    </ StyledMenu>
  );
  
  



  return (
    <div className={classes.grow}>
      <AppBar className="navbarclass">
        <Toolbar>
        <NavLink className={`nav-link ${styles.textclass}`} exact to='/'>
          <div className={classes.logoclass}><img src={logo} /></div>
          
          </NavLink>
          <NavLink className={`nav-link ${styles.textclass3} ${classes.body}`} exact to='/about-us'>
          <IconButton aria-label="show 4 new mails" color="inherit" className={classes.yo1class}>
        
        <InfoIcon />
   
    </IconButton>
          <Typography className={classes.body} variant="h6" noWrap>
            About Us
          </Typography>
          </NavLink>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

          <NavLink className={`nav-link ${styles.textclass3}`} exact to='/rooms'>
            <Typography className={classes.body} variant="h6" noWrap>
              <Box >
              <IconButton aria-label="show 4 new mails" color="inherit">
              
                  < MeetingRoomIcon />
             
              </IconButton>
              Our Rooms
              </Box>
            </Typography>
            </NavLink>
            <NavLink className={`nav-link ${styles.textclass3}`} exact to='/shops'>
            <Typography className={classes.body} variant="h6" noWrap>
              <Box >
              <IconButton aria-label="show 4 new mails" color="inherit">
              
                  <StorefrontIcon/>
             
              </IconButton>
              Our Shops
              </Box>
            </Typography>
            </NavLink>
            <NavLink className={`nav-link ${styles.textclass3}`} exact to='/housing'>
            <Typography className={classes.body} variant="h6" noWrap>
              <Box >
              <IconButton aria-label="show 4 new mails" color="inherit">
              
                  <HomeIcon />
             
              </IconButton>
              Our Housing
              </Box>
            </Typography>
            </NavLink>
          

          {
            props.isAuthenticated ? null : <><NavLink className={`nav-link ${styles.textclass3}`} exact to='/login'>
            <Typography className={classes.body} variant="h6" noWrap>
              <Box >
              <IconButton aria-label="show 4 new mails" color="inherit">
              
                  <VpnKeyIcon/>
             
              </IconButton>
              Login
              </Box>
            </Typography>
            </NavLink>
            <NavLink className={`nav-link ${styles.textclass3}`} exact to='/signup'>
            <Typography className={classes.body} variant="h6" noWrap>
              <Box >
              <IconButton aria-label="show 4 new mails" color="inherit">
              
                  <LockOpenIcon/>
             
              </IconButton>
              Sign up
              </Box>
            </Typography>
            </NavLink></>
          }

            {
              props.focus ? <NavLink className={`nav-link ${styles.textclass}`} exact to='/wishlist'>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={props.no} color="secondary">
                  <FavoriteOutlinedIcon />
                </Badge>
              </IconButton>
              </NavLink> : <NavLink className={`nav-link ${styles.textclass}`} exact to='/wishlist'>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={wishlist} color="secondary">
                <FavoriteOutlinedIcon />
              </Badge>
            </IconButton>
            </NavLink>
            }
            
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleprofileMenuOpen}
              color="inherit"
            >
      

              {
                props.profile ? <Avatar className={classes.purple} alt={props.profile.first_name.toUpperCase()} src={pic} /> : <AccountCircle />
              }
              
              
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" className={classes.give}/>
      {renderMobileMenu}
      {renderMenu}
      {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
    </div>
  );
}


const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps, { logout })(RenteneAppBar);