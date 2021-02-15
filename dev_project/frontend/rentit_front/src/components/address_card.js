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
    maxWidth: 400,
  },
  media: {
    height: 250,
  },
});

export default function AddressCard({address,info}) {
  const classes = useStyles();

  

  if(address)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/address.png"
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {address.address}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {address.city}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {address.state}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {address.country}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {address.pincode}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {address.landmark}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to='/dashboard/address_details/edit' style={{textDecoration:'none'}}><Button size="small" color="primary">
          Edit
        </Button></Link>
      </CardActions>
    </Card>
  );
  else{
    return (
      <div>
       <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/address.png"
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Unknown
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to='/dashboard/address_details/edit' style={{textDecoration:'none'}}><Button size="small" color="primary">
          Add
        </Button></Link>
      </CardActions>
    </Card>
      </div>
    );
  }
}