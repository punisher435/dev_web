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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';



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
    overflow: 'visible !important'
    
  },
}));


export default function VerticalDividers({no, rating,reviews,params,setparams}) {
  const classes = useStyles();

  const handleclick1 = (e) => {

    e.preventDefault();
    if(params.page>1){
      setparams({...params,page:params.page-1})
    }
   
  }
  const handleclick2 = (e) => {
    e.preventDefault();
    
    setparams({...params,page:params.page+1})
  }

  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={params.ordering}
          onChange={e => {e.preventDefault(); setparams({...params,ordering:e.target.value});}}
        >
          <MenuItem value={'-timestamp'}>Newest first</MenuItem>
          <MenuItem value={'-rating'}>Highly rated</MenuItem>
          <MenuItem value={'rating'}>Negative first</MenuItem>
          <MenuItem value={'timestamp'}>Oldest first</MenuItem>
        </Select>
      </FormControl>

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

        </Grid>
        
        
        
        <GridList className={classes.gridList} cols={2.5}>
        {reviews.map((review) => ( 
          <div>
         
            {
              review.photo1 ? <GridListTile key={review.photo1} className={classes.liststyle}><img src={review.photo1} className={classes.imageclass}/></GridListTile> : null
            }

            {
              review.photo2 ? <GridListTile key={review.photo2} className={classes.liststyle}><img src={review.photo1} className={classes.imageclass}/></GridListTile> : null
            }

            {
              review.photo3 ? <GridListTile key={review.photo3} className={classes.liststyle}><img src={review.photo1} className={classes.imageclass}/></GridListTile> : null
            }

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
          <ListItem>
          <IconButton onClick={e => handleclick1(e)} >
      <ArrowBackIosIcon />
      </IconButton>
          <p>{params.page}</p>
      <IconButton onClick={e => handleclick2(e)} >
      <ArrowForwardIosIcon />
      </IconButton>
          </ListItem>
        </List>
      

      <Paper />

    

      
    </div>
  );
}
