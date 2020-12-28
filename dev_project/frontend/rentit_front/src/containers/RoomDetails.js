import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SpecificRoomCarousel from '../components/SpecificRoomCarousel'
import GoldenFeatures from '../components/GoldenRoomFeatures'
import Rating from '../components/Rating'
import RatingAndReviews from '../components/RatingAndReviews'

import RoomDescriptionContent from '../components/RoomDescriptionContent'
import GoogleApiWrapper from '../components/GoogleMapAPI'
import BookCard from '../components/BookCard'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  api:{
    height:'450px'
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <SpecificRoomCarousel/>
        </Grid>

        <CssBaseline />
        

        <Container maxWidth="lg">

            <Grid container spacing={4}>
                <Grid item xs={8} sm={8} >
                    
                <Grid container >
                
                    <Grid container
                      direction="row"
                      justify="space-between"
                      >
                        {/* Hostel Name and rating */}
                          <Grid item xs={10} >
                          
                              <Typography variant="h4" component="h4" gutterBottom >
                              Hostel Room
                              </Typography>
                              <Typography variant="h6" component="h6" gutterBottom >
                              location
                              </Typography>
                          </Grid>
                            
                          <Grid item xs={1}>
                              <Rating no={96} rating={3.7}/>
                          </Grid>
                    </Grid>

                        <GoldenFeatures/>

                        <Grid item xs = {12}>
                            <Typography variant='h5'>
                                Description
                            </Typography>
                            <RoomDescriptionContent/>
                        </Grid>
                        
                        <Grid item xs = {12} className={classes.api}>
                          <br></br><br></br>
                          <GoogleApiWrapper/>
                        </Grid>

                        <Grid item xs = {12}>
                          {/* <Ameneties/> */}
                          <RatingAndReviews  no={96} rating={3.7}/>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item xs={4} sm={4}>
                  <BookCard/>
                </Grid>

            </Grid>
        </Container>
      
        <Grid item xs={12} sm={12}>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '30vh' }} />
        </Grid>
              

      </Grid>
    </div>
  );
}
