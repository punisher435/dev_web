import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Icon from '@material-ui/core/Icon'
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import RoomIcon from '@material-ui/icons/Room';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    height: 400,
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary, 
  },


  root1: {
    maxWidth: 500,
    height: 300,
    textAlign: 'center',

    borderLeft: 2,
    borderLeftColor: grey,
    // display: 'flex',
    // alignItems: 'center',
  },

  root2: {
    maxWidth: '100%',
    height: '100%',
    textAlign: 'left',
    padding : '10px 0 0 20px',


    // display: 'flex',
    // alignItems: 'center',
  },
  root3: {
    maxWidth: 100,
    height: 100,
    textAlign: 'center',


    borderLeft: 2,
    borderLeftColor: grey,
    // display: 'flex',
    // alignItems: 'center',
  },


  media: {
    height: 300,
  },
  media2: {
    height: 100,
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },

  textroot: {
    textAlign: 'Left',

    borderLeft: 2,
    borderLeftColor: grey,
    // display: 'flex',
    // alignItems: 'center',
  },

}));

export default function NestedGrid({post}) {
  const classes = useStyles();

  function MediaCard() {

  
    return (
      <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  spacing = {1}
>
<Grid item md={10} xs={12}>
<Card className={classes.root1}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={post.photo1}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
</Grid>
<Grid item md={2}>
<Grid
  container
  direction="column"
  justify="flex-start"
  spacing = {1}
>
<Grid item>
<Card className={classes.root3}>
        <CardActionArea>
          <CardMedia
            className={classes.media2}
            image={post.photo2}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
</Grid>
<Grid item>
<Card className={classes.root3}>
        <CardActionArea>
          <CardMedia
            className={classes.media2}
            image={post.photo3}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
</Grid>
<Grid item>
<Card className={classes.root3}>
        <CardActionArea>
          <CardMedia
            className={classes.media2}
            image={post.photo4}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
</Grid>

</Grid>

</Grid>
</Grid>
    );
  }

  function NameCard(){
    return (
      <Card className={classes.root2}>
        <Typography variant="h4" component="h3">
          {post.title}
        </Typography>
        <Typography variant="body1" component="h2">
        <Icon color="error"><RoomIcon /></Icon>
          {post.location},{post.city},{post.state}
        </Typography>
        <Typography variant="body2" component="h2">
            -   near {post.landmark}
        </Typography>
        <br/>
        { 
        post.wifi ? <WifiIcon /> : <WifiOffIcon />
        }
        
      </Card>
    );
  }

  function PriceCard(){
    return (
      <Card className={classes.root1}>
        <Typography variant="h5" component="h2" className={classes.root1}>
         $500
        </Typography>
      </Card>
    );
  }

  function BookCard(){
    return (
      <Card className={classes.root1}>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
      </Card>
    );
  }

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item lg={5} xs={12}>
          <MediaCard/>
        </Grid>
        <Grid item lg={7} xs={12}>
          <NameCard/>
        </Grid>
       {/*  <Grid item md={2} xs={12}>
          <PriceCard/>
        </Grid>
        <Grid item md={3} xs={12}>
          <BookCard/>
        </Grid> */}
        {/* <Grid item xs={3}>
          <Paper className={classes.paper} elevation= {0}>item</Paper>
        </Grid> */}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
        <Grid container item xs={12}>
          <FormRow />
        </Grid>
        
    </div>
  );
}

