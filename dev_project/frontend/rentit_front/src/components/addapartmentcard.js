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

const useStyles = makeStyles({
  root: {
    width: '70vw',
    maxWidth:350,
  },
  media: {
    height: 250,
  },
});

export default function AddApartmentCard({info}) {
  const classes = useStyles();

  
if(info){
  return (
      <div>
    <Link to={{
    pathname: `/dashboard/my_apartments/edit`,
    state: { property_id: null }
  }} style={{textDecoration:'none'}}><Card className={classes.root}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image="/add.png"
        title="Photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Add Apartment
        </Typography>
        
      </CardContent>
    </CardActionArea>
    
  </Card></Link>
  </div>
  );
  }
  else{
      return <div></div>;
  }

 
}