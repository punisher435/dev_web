import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'




const drawerWidth = 245;


const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      '.MuiPaper-root': {
        // backgroundColor: '#fff0',
        // height:'auto',
      },
    },
  })(() => null);


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#ADB5BD',
    height:'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <GlobalCss />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
            <Grid container alignItems='center' justify='space-between'>
                <Grid item>
                    <Typography variant="h6" noWrap>
                        {/* Persistent drawer */}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={theme}>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
            >
            <div>
                <Box mt={1} mb={0}>

                <Grid container alignItems='center' justify='space-around'>
                    <Grid item >
                        <Grid container justify='center' alignItems='center'>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} /> 
                            </Grid>
                            <Grid item>
                                <Box ml={1}>
                                    <Grid container direction='col'>
                                        <Grid item xs={12}>
                                            {/* <Box textAlign='center'> */}
                                                <Typography variant='h5'>
                                                    User
                                                </Typography>
                                            {/* </Box> */}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {/* <Box textAlign='center'> */}
                                                <Typography content='p'>
                                                    Ceo
                                                </Typography>
                                            {/* </Box> */}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={2}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </Grid>
                </Grid>
                </Box>
                
            </div>
            <Divider />
            <List>
            <ListItem button key='Profile'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary='Profile' />
            </ListItem>
            <ListItem button key='Wishlist'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary='Wishlist' />
            </ListItem>
            <ListItem button key='My Cart'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary='My Cart' />
            </ListItem>
            <ListItem button key='Recent Booking'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary='Recent Booking' />
            </ListItem>
            <ListItem button key='My coupons'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary='My coupons' />
            </ListItem>
            <ListItem button key='My Spending'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary='My Spending' />
            </ListItem>
            </List>
            <Divider />
         </Drawer>
      </ThemeProvider>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
    </main>
    </div>
  );
}
