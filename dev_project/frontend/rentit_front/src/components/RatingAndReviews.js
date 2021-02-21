import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Rating1 from '../components/Rating';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import RatingBar from '../components/RatingBar'

const useStyles = makeStyles((theme) => ({
  root: {
    height:'150px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  

  },

  root1: {
    display: 'flex',
    overflow:'hidden',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
   
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    overflowX:'scroll',
    overflowY:'scroll',
    flexWrap: 'nowrap',
  
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imageclass: {
    width:'100%',
   
  },
  liststyle: {
    overflow: 'visiblw'
    
  },
}));


export default function VerticalDividers({no, rating,reviews,params,setparams}) {
  const classes = useStyles();

  return (
    <div>
      <Grid container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.root}>
        <Grid item>
          <Rating1  no={no} rating={rating}/>
        </Grid>

        <Divider orientation="vertical" />

        <Grid item xs={6} align="center" justify="center">

          <RatingBar star={1} value={50}/>
          <RatingBar star={2} value={30}/>
          <RatingBar star={3} value={70}/>
          <RatingBar star={4} value={40}/>
          <RatingBar star={5} value={30}/>

        </Grid>
        
        
        
        <GridList className={classes.gridList} cols={2.5}>
        {reviews.map((review) => ( 
          <div>
          <GridListTile key={review.photo1} className={classes.liststyle}>
            {
              review.photo1 ? <img src={review.photo1} className={classes.imageclass}/> : null
            }

           
            
          </GridListTile>

          <GridListTile key={review.photo2} className={classes.liststyle}>
         

            {
              review.photo2 ? <img src={review.photo2}/> : null
            }

            
          </GridListTile>

          <GridListTile key={review.photo3} className={classes.liststyle}>


            {
              review.photo3? <img src={review.photo3}/> : null
            }


            
          </GridListTile>

          </div>
          
        ))}    
      </GridList>

      <Paper elevation={0} />
      <List component="nav" aria-label="main mailbox folders">
          {
            reviews.map(
              (review) => (
                <>
                <ListItem>
                <Rating
                  name="simple-controlled"
                  value={review.rating}
                  readOnly 
                />
              </ListItem>
                <ListItem>
                  <ListItemText primary={review.reviews} />
                </ListItem>
                <Divider />
                </>
              )
            )
          }
        </List>


      <Paper />

    

      </Grid>
    </div>
  );
}
