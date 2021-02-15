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

export default function RoomCard({myroom}) {
  const classes = useStyles();

  

  if(myroom)
  return (
      <div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={myroom.photo1}
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
        
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
        
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
        
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to='/dashboard/bank_details/edit' style={{textDecoration:'none'}}><Button size="small" color="primary">
          Edit
        </Button></Link>
      </CardActions>
    </Card>
    <br />
    <Card className={classes.root}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image="/bank.jpg"
        title="Photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Unknown
        </Typography>
        
      </CardContent>
    </CardActionArea>
    <CardActions>
      
      <Link to='/dashboard/bank_details/edit' style={{textDecoration:'none'}}><Button size="small" color="primary">
        Add
      </Button></Link>
    </CardActions>
  </Card>
  </div>
  );
 
}