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

export default function ApartmentCard({myapartment}) {
  const classes = useStyles();

  

  

  if(myapartment)
  return (
      <div>
    <Card className={classes.root}>
    <Link to={`/housing/${myapartment.apartment_id}`} target="_blank" style={{textDecoration:'none',color:'black'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={myapartment.photo1}
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {myapartment.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {myapartment.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <RatingWithCompliments rating={parseFloat(myapartment.avg_rating)}/>
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
    pathname: `/dashboard/my_housing/edit`,
    state: { property_id: myapartment.apartment_id}
  }} style={{textDecoration:'none'}}><Button size="small" color="primary">
          Edit
        </Button></Link>
        <Link to={{
    pathname: `/dashboard/my_housing/delete`,
    state: { property_id: myapartment.apartment_id,url:'sourceddnvslf54d/my_apartments' ,url1:'my_apartments' }
  }} style={{textDecoration:'none'}}><Button size="small" color="primary" >
          Delete
        </Button></Link>
        
      {
        myapartment.pausebooking ? <Link to={{
          pathname: `/dashboard/my_housing/pause_booking`,
          state: { property_id: myapartment.apartment_id,url:'sourceddnvslf54d/my_apartments',url1:'my_apartments' }
        }} style={{textDecoration:'none'}}><Button size="small" color="primary">
                Resume Booking
              </Button></Link> :  <Link to={{
    pathname: `/dashboard/my_housing/pause_booking`,
    state: { property_id: myapartment.apartment_id,url:'sourceddnvslf54d/my_apartments',url1:'my_apartments' }
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