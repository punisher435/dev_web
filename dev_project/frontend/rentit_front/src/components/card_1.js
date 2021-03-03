import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import RoomIcon from '@material-ui/icons/Room';
import RoomImage from './MobileSearchCardImage'
import Box from '@material-ui/core/Box'
import ScrollableIcons from './ScrollableIcons'
import {Link} from 'react-router-dom';

import axios from 'axios';
import { connect } from 'react-redux'

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;


const useStyles = makeStyles((theme) => ({
root: {
  width:'80vw',
maxWidth: 355,
maxLength: 400,
margin: '0 auto',
float: 'none',
 
},
media: {
height: 10,
paddingTop: '50.25%', // 16:9
marginLeft: '0px',
},
expand: {
transform: 'rotate(0deg)',
marginLeft: 'auto',
transition: theme.transitions.create('transform', {
duration: theme.transitions.duration.shortest,
}),
},
expandOpen: {
transform: 'rotate(180deg)',
},
avatar: {
backgroundColor: red[500],
},
}));

function RecipeReviewCard({isAuthenticated,post,setOpen1,setOpen2,wishlistitems,changeitemswishlist}) {
       const classes = useStyles();

       const [wishlist,changewishlist] = useState(false)

       useEffect(async () => {

        if(isAuthenticated){
        const config = {
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`,
          },
        };
        try {
        await axios.get(`${process.env.REACT_APP_API_URL}/souraawdgrg33w24/wishlist/rooms/${post.room_id}/`,config,config)
        .then(res => {
          changewishlist(res.data);
        })
        .catch(err => {
          
        })
        
        }
        catch{
        }
  
  
      }
  
      }
        ,[isAuthenticated])


        
 
 return (
<Card className={classes.root}>
   
 <RoomImage post={post} wishlist={wishlist} changewishlist={changewishlist} setOpen1={setOpen1} isAuthenticated={isAuthenticated} wishlistitems={wishlistitems} changeitemswishlist={changeitemswishlist}/>

 <Link to={`/rooms/${post.room_id}`} target="_blank" style={{textDecoration:'none',color:'black'}}>

 <Box ml={1}>

   <Box mb={0}>
   <Grid container alignItems='flex-start'>
     <Grid item xs={1}>
        <Icon color="error"><RoomIcon /></Icon>

     </Grid>
     <Grid item xs={11}>
            <Typography variant="body1" component="h2">
              <Box mt={1}>
          {post.location},{post.city},{post.state}
          {/* Anand Plaza, First, University Rd, A Block, Udaipur, Rajasthan 313001 */}
              </Box>
        </Typography>

     </Grid>
   </Grid>
   </Box>
   </Box>
   <ScrollableIcons post={post}/>
  <Box ml={1} mt={1} mb={1}>
    <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing="2"
        >
    
        <Grid item md={4}>
        <Typography 
            color='error'  variant='h6' className={classes.textroot}>
          {post.currency}{post.final_price}
          </Typography>
          </Grid>
          <Grid item md={4}>
          <Typography
          variant='h6' className={classes.textroot1}>
          <s>{post.currency}{post.final_price}</s>
          </Typography>
          </Grid>
          <Grid item md={4}>
          <Typography
         variant='h6' className={classes.textroot2}>
            {post.owner_discount+post.company_discount}% off    
            </Typography>    
        </Grid>
    </Grid>
        
</Box>
</Link>  
</Card>
);
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  access: state.authreducers.access
});

export default connect(mapStateToProps)(RecipeReviewCard);