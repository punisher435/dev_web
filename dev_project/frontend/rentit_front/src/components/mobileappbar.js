import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import BookIcon from '@material-ui/icons/Book';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,

  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  buttonroot: {
    color: 'white',
  },
  typo :{
    color: 'white',
  }
}));

export default function BottomAppBar({details}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
        
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >
              <Grid item xs={5}>
                    <Button className={classes.buttonroot}>
                        <BookIcon />
                        <Typography variant="body1" component="body1" className={classes.typo1}>
                        Book now
                        </Typography>
                    </Button>
              </Grid>

              <Grid item xs={3}>
              <Button className={classes.buttonroot}>

                    
                    { 
                     details.cart ?<ShoppingCartIcon /> :<ShoppingCartOutlinedIcon />
                     }
                 
                     
                        <Typography variant="body1" component="body1" className={classes.typo1}>
                        Cart
                        </Typography>
                    </Button>
              </Grid>

              <Grid item xs={3}>
                     <Button className={classes.buttonroot}>
                
                    { 
                    details.wishlist ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />
                    }
                    <Typography variant="body1" component="body1" className={classes.typo1}>
                        Wishlist
                        </Typography>
                    </Button>
            
              </Grid>

          </Grid>
        
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
