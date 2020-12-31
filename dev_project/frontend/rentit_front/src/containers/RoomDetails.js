import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'
import SpecificRoomCarousel from '../components/SpecificRoomCarousel'
import RatingAndReviews from '../components/RatingAndReviews'
import RoomDescriptionContent from '../components/RoomDescriptionContent'
import GoogleApiWrapper from '../components/GoogleMapAPI'
import BookCard from '../components/BookCard'
import RatingWithCompliment from '../components/RatingWithCompliment'
import Facility from '../components/FacilityList'

import axios from 'axios';

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
  },
  mystyle: {
    position: '-webkit-sticky',
  position: 'sticky',
  top: 0,
  }
}));

export default function FullWidthGrid(props) {


 /*  let query = useQuery();
  var roomid=query.get('roomid');
  console.log(roomid); */

  const roomid = props.match.params.roomid;

  const classes = useStyles();
  const [details, setDetails] = useState({});
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/${roomid}/`,config);
      
      try{
          console.log(res.data);
        
          setDetails(res.data);
          setLoading(false);
          console.log(details);
      }  catch (err) {
        // Handle Error Here
        console.error(err);
    }
    };

    fetchDetails();
  }, []);


  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcedjfnsk743/room/reviews/`,{
        params:{
          room_id:roomid,
        },
        config:config
      });
      
      try{
          console.log(res1.data);
          setReviews(res1.data.results);
          setLoading(false);
          console.log(reviews);
      }  catch (err) {
        // Handle Error Here
        console.error(err);
    }
    };

    fetchDetails();
  }, []);



  return (
    <div className={classes.root}>
      <Grid container spacing={5}>

        <Grid item xs={12} >
          <SpecificRoomCarousel post={details}/>
        </Grid>
        <CssBaseline />
        

        <Container maxWidth='lg'>
            <Grid container justify='space-between'>
                <Grid item xs={7} >
                    <Box mr={5} mt={7}>
                  <Grid container >
                  
                      <Grid container
                        direction="row"
                        justify="space-between"
                        >
                          {/* Hostel Name and rating */}
                            <Grid item xs={6} >
                            
                                <Typography variant="h4" component="h4">
                                {details.title}
                                </Typography>
                                <Typography variant="h6" component="h6" gutterBottom >
                                {details.location}
                                </Typography>
                            </Grid>
                              
                            <Grid item >
                                <RatingWithCompliment rating={3.7}/>
                            </Grid>
                      </Grid>

                          <Grid item xs = {12}>
                              <Typography variant='h5'>
                                  Description
                              </Typography>
                              <RoomDescriptionContent description={details.description}/>
                          </Grid>
                          <Grid item xs={12}>
                          <Typography variant='h5'>
                                  Facilities
                              </Typography>
                            <Facility post={details}/>
                          </Grid>
                          
                          <Grid item xs = {12} className={classes.api}>
                            <br></br><br></br>
                            <GoogleApiWrapper/>
                          </Grid>

                          <Grid item xs = {12}>
                            <RatingAndReviews  no={96} rating={3.7}/>
                          </Grid>
                      </Grid>
                    </Box>
                </Grid>


                <Grid item xs={4}>
                  <Box mt={7} className={classes.mystyle}>

                  <BookCard details={details}/>
                  </Box>
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
