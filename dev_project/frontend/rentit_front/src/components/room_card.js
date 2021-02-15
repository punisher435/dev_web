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
    maxWidth: 400,
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
          image={myroom.photo1}
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
    state: { property_id: myroom.room_id }
  }} style={{textDecoration:'none'}}><Button size="small" color="primary">
          Edit
        </Button></Link>
      </CardActions>
    </Card>
    <br />
  </div>
  );
 
}