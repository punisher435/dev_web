import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    height: 200,
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary, 
  },


  root1: {
    maxWidth: 345,
    height: 200,
    textAlign: 'center',
    borderLeft: 2,
    borderLeftColor: grey,
    // display: 'flex',
    // alignItems: 'center',
  },


  media: {
    // width: 128,
    height: 200,
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },


}));

export default function NestedGrid() {
  const classes = useStyles();

  function MediaCard() {
  
    return (
      <Card className={classes.root1} elevation={0}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://cdn.cnn.com/cnnnext/dam/assets/140127103345-peninsula-shanghai-deluxe-mock-up.jpg"
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
    );
  }

  function NameCard(){
    return (
      <Card className={classes.root1}>
        <Typography variant="h4" component="h2">
          Master Suit
        </Typography>
      </Card>
    );
  }

  function PriceCard(){
    return (
      <Card className={classes.root1}>
        <Typography variant="h5" component="h2">
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
        <Grid item md={4} xs={12} >
          <MediaCard/>
        </Grid>
        <Grid item md={2} xs={12}>
          <NameCard/>
        </Grid>
        <Grid item md={2} xs={12}>
          <PriceCard/>
        </Grid>
        <Grid item md={2} xs={12}>
          <PriceCard/>
        </Grid>
        <Grid item md={2} xs={12}>
          <BookCard/>
        </Grid>
        {/* <Grid item xs={3}>
          <Paper className={classes.paper} elevation= {0}>item</Paper>
        </Grid> */}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container xs={12} spacing={0}>
          <FormRow />
        </Grid>
        
      </Grid>
    </div>
  );
}

