import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import RoomIcon from '@material-ui/icons/Room';
import RoomImage from './newcardimage'
import Box from '@material-ui/core/Box'
import ScrollableIcons from './ScrollableIcons'
import {Link} from 'react-router-dom';

import axios from 'axios';


axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;


const useStyles = makeStyles((theme) => ({
root: {
width: 280,
height: 350,
margin: 10,
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

function RecipeReviewCard({post}) {
       const classes = useStyles();

      

       


        
 
 return (
<Card className={classes.root}>
<Link to={`/shops/${post.shop_id}`} target="_blank" style={{textDecoration:'none',color:'black'}}>
   
 <RoomImage post={post} />

 

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
          {post.currency.slice(0,1)} {post.final_price}
          </Typography>
          </Grid>
          <Grid item md={4}>
          <Typography
          variant='h6' className={classes.textroot1}>
          <s>{post.currency.slice(0,1)} {post.price}</s>
          </Typography>
          </Grid>
          <Grid item md={4}>
          <Typography
         variant='h6' className={classes.textroot2}>
            {post.net_discount}% off    
            </Typography>    
        </Grid>
    </Grid>
        
</Box>
</Link>  
</Card>
);
}



export default RecipeReviewCard;