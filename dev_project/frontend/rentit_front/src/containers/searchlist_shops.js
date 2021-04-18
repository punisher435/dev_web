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
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import '../components/css/App.css'


import Posts from '../components/post_shops';
import Checkboxes from '../components/bookedcheckbox';
import PaginationOutlined from '../components/PaginationOutlined';
import RangeSlider from '../components/priceslider'


import SimpleSelect2 from '../components/facilitiesfilter_shop';
import SimpleSelect3 from '../components/sequrityfilter';
import MaterialUIPickers1 from '../components/datefilter';
import RadioButtonsGroup from '../components/minratingfilter';

import Trustpointsfilter from '../components/mintrustpoints';
import Windowsfilter from '../components/minwindows_shop';
import Floorfilter from '../components/floorfilter';

import SearchFields from '../components/searchfilter';
import SearchFields2 from '../components/searchfilter2';
import SimpleSelectfinal from '../components/sort';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import FavoriteIcon from '@material-ui/icons/Favorite';

import MapIcon from '@material-ui/icons/Map';
import Location from '../components/locationfilter';


import Mapmount from '../components/mapmount_shops';

import { Link } from 'react-router-dom';



const drawerWidth = 300;
const drawerWidth1 = 250;

const useStyles = makeStyles((theme) => ({
  iconstyle1:{
    marginRight:'30px',
  },
  iconstyle2:{
    marginRight:'20px',
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    
  },
  drawer1: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth1,
      flexShrink: 0,
    },
  },
  appBar: {

    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,

    },
    backgroundColor:`${process.env.REACT_APP_COLOR}`,
  },
  appBar1: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth1}px)`,
      marginLeft: drawerWidth,

    },
    backgroundColor:`${process.env.REACT_APP_COLOR}`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  menuButton1: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    marginTop: theme.spacing(2),
  },
  myclass:{
    marginTop:50,
    display:'inline'
  },
  myclass2:{
    display:'inline',
    float:'left',
    marginLeft:10,
  },
  
  drawerPaper: {
    width: drawerWidth,
  },
  drawerPaper1: {
    width: drawerWidth1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    marginTop:'0px',
  },
  mystyle: {
    marginLeft:'10px',
  },
  iconstyle: {
    color: 'white',
    padding:0,
    margin:0,
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      
      <Divider />
      

      <List>

      <Hidden mdUp>
      <ListItem className={classes.mystyle}>
      <SearchFields2 filters={props.filters} setfilters={props.setfilters} />
      </ListItem>
      </Hidden>

      <ListItem className={classes.mystyle}>
      <Typography variant="h4" component="h3">
          Filters
      </Typography>
      </ListItem>

      <ListItem className={classes.mystyle}>

      <Checkboxes size='small' checked={checked} setChecked={setChecked} setfilters={props.setfilters} filters={props.filters} setfilters={props.setfilters}/>

      <Typography variant="body1">
          Show all shops
      </Typography>
      </ListItem>
      <Divider />

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
          Price
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <RangeSlider setfilters={props.setfilters} filters={props.filters} max_price={props.max_price} min_price={props.min_price}/>
      </ListItem>

      <Divider />
      

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
          Booking Date
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <MaterialUIPickers1 checked={checked} setChecked={setChecked} filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />



      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
          Min. Trust Points
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <Trustpointsfilter filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
          Location
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <Location filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      <ListItem className={classes.mystyle}>
      <RadioButtonsGroup filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />
      
      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
          Facilities
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <SimpleSelect2 filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      

      <ListItem className={classes.mystyle}>
     
      </ListItem>
      <ListItem className={classes.mystyle}>
      <Windowsfilter filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
         Sequrity
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <SimpleSelect3 filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
        Floor no.
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <Floorfilter filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      

      
        
      </List>

      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Hidden smDown>
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
      

            {/* THE APPBAR CONTENT SHOULD BE HERE */}
      
      <Link to='/'>
      <IconButton className={classes.iconstyle}>
      <KeyboardBackspaceIcon fontSize='large'/>
      </IconButton>
      </Link>

      <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      >
      <Grid item xs={2}>
      <IconButton onClick={(event) => {event.preventDefault();props.setmap(!props.mapview);}} className={classes.iconstyle}>
        <MapIcon /> 
          Map view
      </IconButton>
      </Grid>

      <Grid item xs={2}>
      <Link to='/wishlist'>
      <Badge badgeContent={props.wishlistitems} color="primary"  className={classes.iconstyle1}>
        <IconButton className={classes.iconstyle}><FavoriteIcon className={classes.iconstyle}/></IconButton>
      </Badge>
      </Link>
     

      
      </Grid>

      </Grid>
     
            


        </Toolbar>

        

      </AppBar>
      </Hidden>

      <Hidden mdUp>
      <AppBar position="fixed" className="navbarclass">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton1}
          >
            <MenuIcon />
          </IconButton>
      

            {/* THE APPBAR CONTENT SHOULD BE HERE */}
      
      <Link to='/'>
      <IconButton className={classes.iconstyle}>
      <KeyboardBackspaceIcon fontSize='large'/>
      </IconButton>
      </Link>

      <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      >

      <Grid item xs={7}>
      <IconButton onClick={(event) => {event.preventDefault();props.setmap(!props.mapview);}} className={classes.iconstyle}>
        <MapIcon /> 
          Map view
      </IconButton>
      </Grid>

      <Grid item xs={4}>
      <Link to='/wishlist'>
      <Badge badgeContent={props.wishlistitems} color="primary"  className={classes.iconstyle2}>
      <IconButton className={classes.iconstyle}><FavoriteIcon /></IconButton>
      </Badge>
      </Link>
     

      
      </Grid>

      </Grid>
            


        </Toolbar>

        

      </AppBar>
      </Hidden>

      <Hidden smDown>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden lgUp implementation="css">
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
        <Hidden mdDown implementation="css">
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
      </Hidden>


      <Hidden mdUp>
      <nav className={classes.drawer1} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper1,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden only={['xs']}implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper1,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      </Hidden>


      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Hidden smDown>
        <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        >
          {
            props.mapview ? null : <div className={classes.myclass}><div className={classes.myclass2}><SearchFields filters={props.filters} setfilters={props.setfilters} /></div>
            <div className={classes.myclass2}><SimpleSelectfinal filters={props.filters} setfilters={props.setfilters} /></div></div> 
          }
           

        </Grid>
        </Hidden>

        <Hidden mdUp>
        <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        >
           {
            props.mapview ? null : 
            <SimpleSelectfinal filters={props.filters} setfilters={props.setfilters} />
          }
          
        </Grid>
        </Hidden>

            {
              props.mapview ? <Mapmount filters={props.filters} setfilters={props.setfilters}/> : <div><Posts mypost={props.mypost} setmypost={props.setmypost} openmycard={props.openmycard} setmycard={props.setmycard} posts={props.posts}  setfilters={props.setfilters} filters={props.filters} loading={props.loading} wishlistitems={props.wishlistitems} cartitems={props.cartitems} changeitemswishlist={props.changeitemswishlist} changeitemscart={props.changeitemscart}/>
              <PaginationOutlined paginate={props.paginate} postsPerPage={props.postsPerPage} currentPage={props.currentPage} totalposts={props.totalposts}/></div>
            }
           

      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
