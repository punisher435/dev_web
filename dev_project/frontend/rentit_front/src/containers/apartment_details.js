import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'
import SpecificRoomCarousel from '../components/specificapartmentcarosel'
import RatingAndReviews from '../components/RatingAndReviews'
import RoomDescriptionContent from '../components/RoomDescriptionContent'
import GoogleApiWrapper from '../components/GoogleMapAPI'
import GoogleApiWrapper1 from '../components/mobilemaps'
import BookCard from '../components/bookcard_apartment'
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
import Mobileimages from '../components/mobileimages_apartments';
import SimpleModal1 from '../components/bookcardmodel_apartment';

import RatingWithCompliments from '../components/MobileRatingSearchCard' 
import Mapview from '../components/mapcomp'



import axios from 'axios';

import CustomizedRatings from '../components/rating_meter';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import {Redirect} from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux'

import Mapviewmobile from '../components/mapmobile'
import SimpleSnackbar from '../components/wishlistsmackbar';
import SimpleSnackbar1 from '../components/cartsmackbar';

import RenteneAppBar from '../components/Navbar'

import ReviewSeller from '../components/seller_reviews_pop';
import Button from '@material-ui/core/Button';



axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowX: 'hidden'
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
    width:'100vw',
    height:'30vh',
    position:'absolute',
    overflowX:'hidden',
    display:'flex',
    
  },
  apiclass:{
    

  },
  paraclass1 :{
    position:'relative',
    float:'bottom',
  },
  mapclass:{

  },
  iconroot1: {
    display: 'inline',
    color:'#f44336',
    
  },
  navclass:{
    overflowX:'hidden',
    position:'absolute',
  },
  scrollme:{
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    width:'100vw',
   
    [theme.breakpoints.up('md')]: {
      whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    width:'650px',
   
    },
  
  },
  
}));

function FullWidthGrid(props) {


 /*  let query = useQuery();
  var roomid=query.get('roomid');
  console.log(roomid); */

  const roomid = props.match.params.apartmentid;

  const classes = useStyles();
  const [details, setDetails] = useState(false);
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false);
  const [open_book,changeopen1] = useState(false)
  const [loginpage,setloginpage] = useState(false);
 
  const [params1,setparams] = useState({
    page:1,
    ordering:'-rating'
  })
  const [wishlistitems,changeitemswishlist] = useState(0)
  const [cartitems,changeitemscart] = useState(0)
  const [open1,setOpen1] = useState(false);
  const [open2,setOpen2] = useState(false);
  const [wishlist,changewishlist] = useState(false)
  const [nav,setnav] = useState(false)
  const [coupons,setcoupons] = useState([])

  const [open,changeopen] = useState(false)



 

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcebvdfesl2746/apartments/${roomid}/`,config);
      
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
   
  }, [props.isAuthenticated]);

  useEffect( async() => {
     
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };
    try{
    const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcemvdsnksnd59472/apartment/reviews/`,{
      params:{
        apartment_id:roomid,
        page:params1.page,
        ordering:params1.ordering,
      },
      config:config
    });
    
   
        console.log('review',res1.data.results);
        setReviews(res1.data.results);
        
        
    }  catch (err) {
      // Handle Error Here
      console.error(err);
  }
  try{
    const res12 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcesnajeijchi032uhd9w/coupon/give/`,{
      params:{
        roomid:roomid,
        type:'apartment',
      },
      config:config
    });
    
   
        console.log('coupon',res12.data);
        setcoupons(res12.data);
        
        
    }  catch (err) {
      // Handle Error Here
      console.error(err,'coupons_error');
  }
  },[])

  useEffect( async() => {
     
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };
    if(props.isAuthenticated){
      const config = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };
      try {
      await axios.get(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/${roomid}/`,config,config)
      .then(res => {
        changewishlist(res.data);
      })
      .catch(err => {
        
      })
      
      }
      catch{
      }

      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/1/`,config,config)
        .then(res1 => {
          changeitemswishlist(res1.data);
        })
        .catch(err => {
          
        })
        
        }
        catch{
        }
    }
  },[props.isAuthenticated])


  const handleclick = async (event) => {
    event.preventDefault();

    if(props.isAuthenticated)
    {

      if(wishlist)
      {
        const config = {
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`,
          },
        };
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/${roomid}/`,config);

        if(res.data == 'Removed from wishlist'){changewishlist(false); changeitemswishlist(wishlistitems-1); setnav(true);}
      }
    }else{
      setOpen1(true);
    }

  }

  const handleclick1 = async (event) => {
    event.preventDefault();

    if(props.isAuthenticated)
    {
      if(!wishlist)
      {
        const config = {
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`,
          },
          params: {
            apartment_id:roomid,
          },
        };
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/`,config,config);

        if(res.data == 'Added to wishlist'){changewishlist(true);  changeitemswishlist(wishlistitems+1);  setnav(true);}
      }
    }else{
      setOpen1(true);
    }

  }




if(loginpage===true)
{ 
  return <Redirect to='/login' />;
}



if(details){
  return (

    
    
    
    
    <div className={classes.root}>
      <div className={classes.navclass}><RenteneAppBar no={wishlistitems} focus={true}/></div>
      
      
      <SimpleSnackbar open={open1} setOpen={setOpen1}/>
       <SimpleSnackbar1 open={open2} setOpen={setOpen2}/>

       <ReviewSeller open={open} change={changeopen} id={details.seller_id}/>

      <Hidden smDown>
      <Grid container>

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
                      { 
        wishlist ? <Grid item ><IconButton color='error' onClick={(event) => {handleclick(event);}} className={classes.iconroot1}><FavoriteIcon /></IconButton> <Typography variant="body1" color="error">
        {details.wishlist} have added this to their wishlist!
        </Typography></Grid> : <Grid item ><IconButton color='error' onClick={(event) => {handleclick1(event);}} className={classes.iconroot1}><FavoriteBorderOutlinedIcon /></IconButton> <Typography variant="body1"  color="error">
        {details.wishlist} have added this to their wishlist!
        </Typography></Grid>
        }
  
        <Grid item>
        
        </Grid>



<List component="nav" className={classes.root1} aria-label="offers">
          <Grid item >
            <Divider variant='middle'/>
            <ListItem>
          <Typography variant="h5" component="h4" className={classes.typo2}>
            *Offers Applicable
            </Typography>
            </ListItem>
            </Grid>

            <div className={classes.scrollme}>
            <ListItem>
            <CustomizedTabs1 post={coupons}/>
            </ListItem>
            </div>
            
            <Divider variant='middle'/>

          
          </List>

                          <Grid item xs = {12}>
                              <Typography variant='h5'>
                                  Description
                              </Typography>
                              <RoomDescriptionContent details={details} type="apartment"/>
                          </Grid>
                          <Grid item xs={12}>
                          <Typography variant='h5'>
                                  Facilities
                              </Typography>
                            <Facility post={details}/>
                          </Grid>
                         
                          
                          <Grid item xs = {12} className={classes.api}>
                            <br />
                            
                            <div className={classes.apiclass}><Mapview value={details} /></div>
                          </Grid>

                          <Grid item xs = {12}>
                            <RatingAndReviews  reviews={reviews} params={params1} setparams={setparams} no={parseFloat(details.reviews)} rating={parseFloat(details.avg_rating)}/>
                          </Grid>

                          <Grid item>
                          <br />
                          <Button color="primary" variant="contained" onClick={(e) => {e.preventDefault();changeopen(true);}} >Owner Reviews</Button>
                          
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
          <br />
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '30vh' }} />
        </Grid>
              

      </Grid>
      </Hidden>



      <Hidden mdUp>
            

         <Mobileimages post={details} wishlist={wishlist} handleclick1={handleclick1} handleclick={handleclick} />
          
         <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          > { 
            wishlist ? <><Grid item ><IconButton color='error' onClick={(event) => {handleclick(event);}} className={classes.iconroot1}><FavoriteIcon /></IconButton></Grid><Grid item><Typography variant="body1" color="error">
            {details.wishlist} have added this to their wishlist!
            </Typography></Grid></> : <><Grid item ><IconButton color='error' onClick={(event) => {handleclick1(event);}} className={classes.iconroot1}><FavoriteBorderOutlinedIcon /></IconButton></Grid><Grid item> <Typography variant="body1"  color="error">
            {details.wishlist} have added this to their wishlist!
            </Typography></Grid></>
            }
            </Grid>
          
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
  
            <Grid item xs={1}></Grid>

            <Grid item xs={6}>
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

            <Grid item xs={4}>
            <RatingWithCompliments reviews={parseFloat(details.reviews)} rating={parseFloat(details.avg_rating)}/>
            </Grid>

            
            
          </Grid>
          
          
          <List component="nav" className={classes.root1} aria-label="offers">
          <Grid item >
            <Divider variant='middle'/>
            <ListItem>
          <Typography variant="h5" component="h4" className={classes.typo2}>
            *Offers Applicable
            </Typography>
            </ListItem>
            </Grid>

            <div className={classes.scrollme}>
            <ListItem>
            <CustomizedTabs1 post={coupons}/>
            </ListItem>
            </div>
            
            <Divider variant='middle'/>

          
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
            <RoomDescriptionContent details={details}  type="apartment"/>
          </Grid>
          <Grid item xs={1}></Grid>
          </Grid>

          <br />

          <br />
          
          
          <Mapviewmobile value={details}/>
       

          <br />
          <br />


          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
          
          <Grid item xs={10} className={classes.paraclass1}>
            <RatingAndReviews reviews={reviews} params={params1} setparams={setparams} no={parseFloat(details.reviews)} rating={parseFloat(details.avg_rating)}/>
          </Grid>
          
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
          
          <br />
         <Button color="primary" variant="contained" onClick={(e) => {e.preventDefault();changeopen(true);}} >Owner Reviews</Button>
         </Grid>   
         
          

          

          
          <Grid item xs={12} className={classes.margingrid}></Grid>
        

       
        <SimpleModal1 details={details} open={open_book} change={changeopen1} loginpage={loginpage} setloginpage={setloginpage}/>
        <BottomAppBar details={details} open1={open_book} changeopen1={changeopen1}/>

      </Hidden>


    </div>
     
  );
}
else{
  return <div></div>;
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  access: state.authreducers.access
});

export default connect(mapStateToProps)(FullWidthGrid);
