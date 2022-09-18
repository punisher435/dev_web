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
    width: '80vw',
   maxWidth:350,
  },
  media: {
    height: 250,
  },
});

export default function RoomCard({myroom}) {
  const classes = useStyles();

  

  

  if(myroom)
  return (
      <div>
    <Card className={classes.root}>
    <Link to={`/rooms/${myroom.room_id}`} target="_blank" style={{textDecoration:'none',color:'black'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://media.designcafe.com/wp-content/uploads/2021/06/21172006/girls-study-room-design-ideas.jpg"
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {myroom.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {myroom.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <RatingWithCompliments rating={parseFloat(myroom.avg_rating)}/>
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
    pathname: `/dashboard/my_rooms/edit`,
    state: { property_id: myroom.room_id}
  }} style={{textDecoration:'none'}}><Button size="small" color="primary">
          Edit
        </Button></Link>
        <Link to={{
    pathname: `/dashboard/my_rooms/delete`,
    state: { property_id: myroom.room_id,url:'sourcewdsfdaegds/my_rooms' ,url1:'my_rooms' }
  }} style={{textDecoration:'none'}}><Button size="small" color="primary" >
          Delete
        </Button></Link>
        
      {
        myroom.pausebooking ? <Link to={{
          pathname: `/dashboard/my_rooms/pause_booking`,
          state: { property_id: myroom.room_id,url:'sourcewdsfdaegds/my_rooms',url1:'my_rooms' }
        }} style={{textDecoration:'none'}}><Button size="small" color="primary">
                Resume Booking
              </Button></Link> :  <Link to={{
    pathname: `/dashboard/my_rooms/pause_booking`,
    state: { property_id: myroom.room_id,url:'sourcewdsfdaegds/my_rooms',url1:'my_rooms' }
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