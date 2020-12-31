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


import Posts from '../components/Posts';
import Checkboxes from '../components/bookedcheckbox';
import PaginationOutlined from '../components/PaginationOutlined';
import RangeSlider from '../components/priceslider'
import SimpleSelect from '../components/categoryselect';
import SimpleSelect1 from '../components/foodcheckbox';
import SimpleSelect2 from '../components/facilitiesfilter';
import SimpleSelect3 from '../components/sequrityfilter';
import MaterialUIPickers1 from '../components/datefilter';
import RadioButtonsGroup from '../components/minratingfilter';
import Capacityfilter from '../components/Capacityfilter';
import Trustpointsfilter from '../components/mintrustpoints';
import Windowsfilter from '../components/minwindows';
import Floorfilter from '../components/floorfilter';
import SimpleSelect5 from '../components/bedtypefilter';
import SearchFields from '../components/searchfilter';
import SearchFields2 from '../components/searchfilter2';
import SimpleSelectfinal from '../components/sort';


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
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
    backgroundColor:'#f50057',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
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
    marginTop:'0px',
  },
  mystyle: {
    marginLeft:'10px',
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

      <Checkboxes size='small' setfilters={props.setfilters} filters={props.filters} setfilters={props.setfilters}/>

      <Typography variant="body1">
          Show all rooms
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
       <SimpleSelect filters={props.filters} setfilters={props.setfilters}/>
      </ListItem >
      <Divider />

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
          Booking Date
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <MaterialUIPickers1 filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
          Capacity
      </Typography>
      </ListItem>
      <ListItem className={classes.mystyle}>
      <Capacityfilter filters={props.filters} setfilters={props.setfilters}/>
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
      <SimpleSelect1 filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      <ListItem className={classes.mystyle}>
      <Typography variant="h6">
         Min. Windows
      </Typography>
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

      <ListItem className={classes.mystyle}>
      <SimpleSelect5 filters={props.filters} setfilters={props.setfilters}/>
      </ListItem>
      <Divider />

      
        
      </List>

      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Hidden smDown>
        <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        >
           <SearchFields filters={props.filters} setfilters={props.setfilters} />
           <SimpleSelectfinal filters={props.filters} setfilters={props.setfilters} />

        </Grid>
        </Hidden>

        <Hidden mdUp>
        <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        >
          <SimpleSelectfinal filters={props.filters} setfilters={props.setfilters} />
        </Grid>
        </Hidden>

        
           <Posts posts={props.posts} loading={props.loading} />
           <PaginationOutlined paginate={props.paginate} postsPerPage={props.postsPerPage} currentPage={props.currentPage} totalposts={props.totalposts}/>

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
