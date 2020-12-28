import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Rating from '../components/Rating';
import { makeStyles } from '@material-ui/core/styles';

import RatingBar from '../components/RatingBar'

const useStyles = makeStyles((theme) => ({
  root: {
    height:'150px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  

  },
}));


export default function VerticalDividers({no, rating}) {
  const classes = useStyles();

  return (
    <div>
      <Grid container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.root}>
        <Grid item>
          <Rating  no={96} rating={3.7}/>
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
    </div>
  );
}
