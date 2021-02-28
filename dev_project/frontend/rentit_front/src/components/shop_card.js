import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import RatingWithCompliments from './MobileRatingSearchCard' 

const useStyles = makeStyles({
  root: {
   width: '70vw',
   maxWidth:350,
  },
  media: {
    height: 250,
  },
});

export default function ShopCard({myshop}) {
  const classes = useStyles();

  

  

  if(myshop)
  return (
      <div>
    <Card className={classes.root}>
    <Link to={`/rooms/${myshop.room_id}`} target="_blank" style={{textDecoration:'none',color:'black'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={myshop.photo1}
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {myshop.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {myshop.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <RatingWithCompliments rating={parseFloat(myshop.avg_rating)}/>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
        
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
        
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
        
        <Link to={{
    pathname: `/dashboard/my_shops/edit`,
    state: { property_id: myshop.shop_id}
  }} style={{textDecoration:'none'}}><Button size="small" color="primary">
          Edit
        </Button></Link>
        <Link to={{
    pathname: `/dashboard/my_shops/delete`,
    state: { property_id: myshop.shop_id,url:'sourcekfhkt274fs/my_shops' ,url1:'my_shops' }
  }} style={{textDecoration:'none'}}><Button size="small" color="primary" >
          Delete
        </Button></Link>
        
      {
        myshop.pausebooking ? <Link to={{
          pathname: `/dashboard/my_shops/pause_booking`,
          state: { property_id: myshop.shop_id,url:'sourcekfhkt274fs/my_shops' ,url1:'my_shops'}
        }} style={{textDecoration:'none'}}><Button size="small" color="primary">
                Resume Booking
              </Button></Link> :  <Link to={{
    pathname: `/dashboard/my_shops/pause_booking`,
    state: { property_id: myshop.shop_id,url:'sourcekfhkt274fs/my_shops' ,url1:'my_shops'}
  }} style={{textDecoration:'none'}}><Button size="small" color="primary">
          Pause Booking
        </Button></Link>
      }

      </CardActions>
    </Card>
    <br />
  </div>
  );
 
}