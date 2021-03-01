import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width:'80vw',
    maxWidth: 400,
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
});

export default function CouponCard({mycoupon}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          
          {
              mycoupon.coupon_type==='off_price' ? 'Price off Coupon' : 'Discount Coupon'
          }
        </Typography>
        <Typography variant="h5" component="h2">
        {mycoupon.coupoun_code}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {mycoupon.off} {
              mycoupon.coupon_type==='off_price' ? 'off in Price' : '% Discount'
          }
        </Typography>
        <Typography variant="body2" component="p">
        Valid from {
              mycoupon.valid_from
          }
          <br />
          Valid till {
              mycoupon.expiry_date
          }
        </Typography>
        <Typography variant="body2" component="p">
        Min. price for discount  {
              mycoupon.min_price
          }
          <br />
         Max_discount {
              mycoupon.max_off_price
          }
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={{
    pathname: `/dashboard/my_coupons/edit`,
    state: { property_id: mycoupon.coupoun_code}
  }} style={{textDecoration:'none'}}><Button size="small" color="primary">
          Edit
        </Button></Link>
        <Link to={{
    pathname: `/dashboard/my_coupons/delete`,
    state: { property_id:mycoupon.coupoun_code,url:'sourcesfnsjfn231/mycoupons' ,url1:'my_coupons' }
  }} style={{textDecoration:'none'}}><Button size="small" color="primary" >
          Delete
        </Button></Link>
      </CardActions>
    </Card>
  );
}