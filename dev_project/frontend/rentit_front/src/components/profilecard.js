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
    minWidth: 275,
    maxWidth: 400,
  },
  media: {
    height: 250,
  },
});

export default function ProfileCard({myprofile,info}) {
  const classes = useStyles();

  

  if(myprofile)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={myprofile.photo}
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {info.first_name} {info.last_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {info.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {myprofile.country_code} {myprofile.mobile}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {myprofile.country_code} {myprofile.alternate_mobile}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Aadhar  {myprofile.aadhar}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to='/dashboard/profile/edit' style={{textDecoration:'none'}}><Button size="small" color="primary">
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
          image="/account-icon-8.png"
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Unknown
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to='/dashboard/profile/edit' style={{textDecoration:'none'}}><Button size="small" color="primary">
          Add +
        </Button></Link>
      </CardActions>
    </Card>
      </div>
    );
  }
}