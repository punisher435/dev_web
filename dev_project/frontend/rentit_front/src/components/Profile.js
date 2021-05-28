import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';

import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/auth/actions/auth_actions';
import styles from './css/navbar.module.css';

import Avatar from '@material-ui/core/Avatar';
import {deepPurple } from '@material-ui/core/colors';
import axios from 'axios';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

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
      display: 'block',
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
}));

function RenteneAppBar({ isAuthenticated, logout,profile }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
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
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}><NavLink className={`nav-link ${styles.textclass2}`} exact to='/logout'>Logout </NavLink></MenuItem>
   </Menu>
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
        if(profile)
        {
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${profile.id}/`,config);
        
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
    
,[profile])

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >


          {
            isAuthenticated ? null : <><MenuItem><NavLink className={`nav-link ${styles.textclass}`} exact to='/login'>
            <Typography className={classes.body2} variant="h6" noWrap>
              Login
            </Typography>
            </NavLink></MenuItem>
            <MenuItem><NavLink className={`nav-link ${styles.textclass}`} exact to='/signup'>
            <Typography className={classes.body2} variant="h6" noWrap>
              Sign up
            </Typography>
            </NavLink></MenuItem></>
          }


      <MenuItem>
      <NavLink className={`nav-link ${styles.textclass2}`} exact to='/wishlist'>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={wishlist} color="secondary">
            <FavoriteOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Wishlist</p>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {
                profile ? <Avatar className={classes.purple} alt={profile.first_name.toUpperCase()} src={pic} /> : <AccountCircle />
              }
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  
  



  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
        <NavLink className={`nav-link ${styles.textclass}`} exact to='/'>
          <Typography className={classes.title} variant="h6" noWrap>
            Rentene
          </Typography>
          </NavLink>
          <NavLink className={`nav-link ${styles.textclass}`} exact to='/about'>
          <Typography className={classes.body} variant="h6" noWrap>
            About
          </Typography>
          </NavLink>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          

          {
            isAuthenticated ? null : <><NavLink className={`nav-link ${styles.textclass}`} exact to='/login'>
            <Typography className={classes.body} variant="h6" noWrap>
              Login
            </Typography>
            </NavLink>
            <NavLink className={`nav-link ${styles.textclass}`} exact to='/signup'>
            <Typography className={classes.body} variant="h6" noWrap>
              Sign up
            </Typography>
            </NavLink></>
          }


            <NavLink className={`nav-link ${styles.textclass}`} exact to='/wishlist'>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={wishlist} color="secondary">
                <FavoriteOutlinedIcon />
              </Badge>
            </IconButton>
            </NavLink>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
      

              {
                profile ? <Avatar className={classes.purple} alt={profile.first_name.toUpperCase()} src={pic} /> : <AccountCircle />
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
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}


const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps, { logout })(RenteneAppBar);