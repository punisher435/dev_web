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
import Bank from '../bank.jpg'

const useStyles = makeStyles({
  root: {
    width:'80vw',
    maxWidth: 400,
  },
  media: {
    height: 250,
    backgroundSize:'contain',
  },
});

export default function BankCard({bank,info}) {
  const classes = useStyles();

  

  if(bank)
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={Bank}
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {bank.account_no}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bank.bank_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bank.bank_address}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {bank.IFSC_code}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {bank.account_type}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {bank.currency}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to='/dashboard/bank_details/edit' style={{textDecoration:'none'}}><Button size="small" color="primary">
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
          image={Bank}
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
}