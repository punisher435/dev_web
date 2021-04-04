import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    minWidth: '80vw',
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cover: {
    width: '30vw',
    maxWidth:300,
  },
 
});

export default function OutlinedCard({complaint}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
        <CardMedia
         component="img"
        className={classes.cover}
        image={complaint.photo1}
       
      />
       <div className={classes.details}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {complaint.complaint_id}
        </Typography>
        <Typography variant="h5" component="h2">
          {complaint.subject}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">

          {complaint.customer_fullfilled && complaint.seller_fullfilled ? <Chip
        icon={<FaceIcon />}
        label="Closed"
       
        color="secondary"
        deleteIcon={<DoneIcon />}
      /> : null}

{complaint.customer_fullfilled && complaint.seller_fullfilled===false ? <Chip
        icon={<FaceIcon />}
        label="Closed from customer's side"
        
        color="primary"
    
        deleteIcon={<DoneIcon />}
      /> : null}

{complaint.customer_fullfilled===false && complaint.seller_fullfilled ? <Chip
        icon={<FaceIcon />}
        label="Closed from seller's side"
        
        color="primary"
    
        deleteIcon={<DoneIcon />}
      /> : null}


{complaint.customer_fullfilled===false && complaint.seller_fullfilled===false ? <Chip
        icon={<FaceIcon />}
        label="Open"
        
      /> : null}

        </Typography>
        <Typography variant="body2" component="p">
         {complaint.message.slice(0,10)}...
         
          
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/complaints/housing/${complaint.complaint_id}`} style={{textDecoration:'none'}} ><Button size="small">View Details</Button></Link>
      </CardActions>

      </div>  
      
    </Card>
  );
}