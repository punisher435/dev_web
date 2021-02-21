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
import GoogleApiWrapper1 from '../components/mobilemaps'
import BookCard from '../components/BookCard'
import RatingWithCompliment from '../components/RatingWithCompliment'
import Facility from '../components/FacilityList'
import Facilitymobile from '../components/mobilefacilitieslist'
import Hidden from '@material-ui/core/Hidden';
import BottomAppBar from '../components/mobileappbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import CustomizedTabs1 from '../components/scrolloffers';
import Mobileimages from '../components/mobileimages';
import SimpleModal1 from '../components/bookcardmodel';

import RatingWithCompliments from '../components/MobileRatingSearchCard' 
import Mapview from '../components/mapcomp'



import axios from 'axios';

import CustomizedRatings from '../components/rating_meter';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root1: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
  },
  media1 : {
    width:'100%',
    right:0,
  },
  media2 : {
    width:'100%',
    right:0,
  },
  typo1 :{
    fontSize: '200%',
    fontWeight: 'normal',
  },
  typo2 :{
    fontSize: '1rem',
    fontWeight: 'normal',
    marginLeft:'1rem',
    color:'#f50057',
  },
  typo3:{
    fontSize: '90%',
  },
  paraclass:{
    marginTop:'15px',
  },
  margingrid : {
    marginTop:'100px',
  },
  sizeclass: {
    width:'50%',
    fontSize: '1.5rem',
  },
  divclass:{
    width:'80%',
    height:'30%',
    position:'absolute',
    overflowX:'hidden',
    left:30,
    right:20,
    margin: '0  auto -150px',

  },
  apiclass:{
    

  },
  paraclass1 :{
    position:'relative',
    float:'bottom',
  }
  
}));

export default function FullWidthGrid(props) {


 /*  let query = useQuery();
  var roomid=query.get('roomid');
  console.log(roomid); */

  const roomid = props.match.params.roomid;

  const classes = useStyles();
  const [details, setDetails] = useState(false);
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false);
  const [open1,changeopen1] = useState(false)
  const [loginpage,setloginpage] = useState(false);
  const [params,setparams] = useState({
    page:1,
    ordering:'-rating'
  })



 

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

    const fetchreviews = async () => {
      setLoading(true);
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      try{
      const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcedjfnsk743/room/reviews/`,{
        params:{
          room_id:roomid,
          page:params.page,
          ordering:params.ordering,
        },
        config:config
      });
      
     
          console.log('review',res1.data.results);
          setReviews(res1.data.results);
          setLoading(false);
          
      }  catch (err) {
        // Handle Error Here
        console.error(err);
    }
    };
    fetchDetails();
    fetchreviews();
  }, []);


  console.log('photo11',details.photo1);


if(loginpage===true)
{ 
  return <Redirect to='/login' />;
}



if(details){
  return (
    
    <div className={classes.root}>

      <Hidden smDown>
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
                                <RatingWithCompliment rating={parseFloat(details.avg_rating)} reviews={parseFloat(details.reviews)}/>
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
                          <br />
                          
                          <Grid item xs = {12} className={classes.api}>
                            
                            <div className={classes.apiclass}><Mapview value={details} /></div>
                          </Grid>

                          <Grid item xs = {12}>
                            <RatingAndReviews  reviews={reviews} params={params} setparams={setparams} no={parseFloat(details.reviews)} rating={parseFloat(details.avg_rating)}/>
                          </Grid>
                      </Grid>
                    </Box>
                </Grid>

                
                <Grid item xs={4}>
                  <Box mt={7} className={classes.mystyle}>
                  
                  <BookCard details={details} loginpage={loginpage} setloginpage={setloginpage}/>
                  </Box>
                </Grid>

            </Grid>
            
        </Container>
      
        <Grid item xs={12} sm={12}>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '30vh' }} />
        </Grid>
              

      </Grid>
      </Hidden>
      <Hidden mdUp>
            <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing = {1}
        >

         <Mobileimages post={details}/>
          
          <br />
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
  
            <Grid item xs={1}></Grid>

            <Grid item xs={8}>
            <Typography variant="h5" component="h4" className={classes.typo1}>
            {details.title}
            </Typography>
            <Typography variant="body1" component="h6" gutterBottom  className={classes.typo3}>
                              <Icon color="error" fontSize="inherit"><LocationOnIcon /></Icon>  {details.location}, {details.city}
                                </Typography>
                                <Typography variant="body1" component="h6" gutterBottom className={classes.typo3}>
                                ,  {details.state}, {details.country}
                                </Typography>
            </Grid>

            <Grid item xs={3}>
            <RatingWithCompliments reviews={parseFloat(details.reviews)} rating={parseFloat(details.avg_rating)}/>
            </Grid>

            <Grid item xs={0}></Grid>
            
          </Grid>

          <List component="nav" className={classes.root1} aria-label="offers">
          
          

          
          <Grid item xs={12}>
            <Divider variant='middle'/>
            <ListItem>
          <Typography variant="h5" component="h4" className={classes.typo2}>
            *Offers Applicable
            </Typography>
            </ListItem>
            <ListItem>
            <CustomizedTabs1 post={details}/>
            </ListItem>
            <Divider variant='middle'/>

          </Grid>
          </List>
          

          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className={classes.paraclass}>
          <Typography variant='h5'>
                                  Facilities
                              </Typography>
                            <Facilitymobile post={details}/>            
          </Grid>
          <Grid item xs={1}></Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className={classes.paraclass}>
            <Typography variant='h5'>
                Description
            </Typography>
            <RoomDescriptionContent description={details.description}/>
          </Grid>
          <Grid item xs={1}></Grid>
          </Grid>

          <br />

          <Grid item xs={12}>
          <div className={classes.divclass}><GoogleApiWrapper1 details={details}/></div>
          </Grid>


          <br /><br /><br /><br /><br /><br />
          <br /><br /><br />

          <br /><br /><br /><br /><br /><br />
          <br />


          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className={classes.paraclass1}>
            <RatingAndReviews reviews={reviews} params={params} setparams={setparams} no={parseFloat(details.reviews)} rating={parseFloat(details.avg_rating)}/>
          </Grid>
          <Grid item xs={1}></Grid>
          </Grid>
         
          

          

          
          <Grid item xs={12} className={classes.margingrid}></Grid>
        </Grid>

       
        <SimpleModal1 details={details} open={open1} change={changeopen1} loginpage={loginpage} setloginpage={setloginpage}/>
        <BottomAppBar details={details} open1={open1} changeopen1={changeopen1}/>

      </Hidden>


    </div>
     
  );
}
else{
  return <div></div>;
}
}
