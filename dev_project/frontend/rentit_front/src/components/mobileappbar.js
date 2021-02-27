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
    backgroundColor:`${process.env.REACT_APP_COLOR}`,

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
    padding:0,
    display: 'block',
  },
  typo :{
    color: 'white',
  }
}));

export default function BottomAppBar({details,open1,changeopen1}) {
  const classes = useStyles();
  console.log(process.env)

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
      <Button className={classes.buttonroot} onClick={() => {changeopen1(true)}}>
        <Toolbar>
        
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
              <Grid item xs={5}>
                    
                        <BookIcon />
                        <Typography variant="body1" component="body1" className={classes.typo1}>
                        Book now
                        </Typography>
                   
              </Grid>

              
              

          </Grid>
        
          <div className={classes.grow} />
          
        </Toolbar>
        </Button>
      </AppBar>
    </React.Fragment>
  );
}
