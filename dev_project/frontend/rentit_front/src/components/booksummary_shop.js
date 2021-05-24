import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';




const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({bookdetails,setbookdetails}) {
  const classes = useStyles();
  const x = parseInt(bookdetails.duration/12);
  const y = parseInt(bookdetails.duration%12);
  const z = bookdetails.month+y;
  const w = bookdetails.year + x; 
  

  const products = [
    { name: 'Duration (in months)', desc: '', price: `${bookdetails.duration}` },
   
    { name: 'Booking from', desc: '', price: `${bookdetails.date}/${bookdetails.month}/${bookdetails.year}` },
    { name: 'Booked till', desc: '', price: `${bookdetails.date}/${z}/${w}` },
    { name: 'Discount', desc: '', price: `${bookdetails.discount}%` },
    { name: 'Coupon applied', desc: '', price: `${bookdetails.coupon}%` },
    { name: 'Please note that the price is increased due to transaction charges of payment gateway', price: `` },
  ];




  const facility = [
    { name: 'WIFI', price: `${bookdetails.wifi}` },
    { name: 'TV', price: `${bookdetails.TV}` },
  
    { name: 'Purified water', price: `${bookdetails.purified_water}` },
  
    { name: 'AC', price: `${bookdetails.AC}` },
    { name: 'Cooler', price: `${bookdetails.cooler}` },
  
  ];

  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Booking summary
      </Typography>
      <List disablePadding>

      <Divider />

      <Typography variant="body2">Facilities selected</Typography>

        {facility.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <Divider />

        <Typography variant="body2">Details</Typography>

        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <Divider />

        <ListItem className={classes.listItem}>
          <ListItemText primary="Your savings" />
          <Typography variant="subtitle1" className={classes.total}>
            {bookdetails.currency}{bookdetails.savings}
          </Typography>
        </ListItem>

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {bookdetails.currency}{bookdetails.price}
          </Typography>
        </ListItem>
        
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Customer
          </Typography>
          <Typography gutterBottom>{bookdetails.firstname} {bookdetails.lastname}</Typography>
          <Typography gutterBottom>{bookdetails.country_code} {bookdetails.mobile} , {bookdetails.alternate_mobile}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Room details
          </Typography>
          <Grid container>
            
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom>{bookdetails.title}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{bookdetails.address}</Typography>
                </Grid>
              </React.Fragment>
            
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}