import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../components/DatePicker'
import Cancellation from '../components/CancellationPolicyPopover'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MonthSelect from './MonthSelect'
import FacilityIcon from './FacilityIconProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));

export default function BoolCard({details}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    couponCode: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Card elevation={4}>
        
            <Grid container alignItems='center' justify='space-around'  style={{ backgroundColor: '#cfe8fc'}}>
                <Grid item>
                    <Typography variant="subtitle1">
                        Login to get exclusive deals
                    </Typography>
                </Grid>
                <Grid item>
                    <Button color="secondary" >
                        login
                    </Button>
                </Grid>

            </Grid>


        <CardContent>

        <Box component="fieldset" mb={1} borderColor="transparent">
        <Typography variant="h5" component="legend">
            {details.title}
            </Typography>
        <Grid container alignItems="center">
            <Grid item>
                <Rating name="read-only" value={3} readOnly  />
            </Grid>
            <Grid item>
            <Typography variant="subtitle1">(244)</Typography>
            </Grid>
        </Grid>
      </Box>

    <Divider/>


        <Box component="fieldset" mt={1} borderColor="transparent">
            <Grid container alignItems="center" spacing={1}>
                <Grid item  style={{ paddingBottom: '0px'}}>
                    <Typography variant="h5" color="textSecondary" display = 'inline' >
                    {details.currency}{details.final_price}
                    </Typography>
                </Grid>
                <Grid item style={{ paddingBottom: '0px'}}>
                    <Typography variant="subtitle1" color="textSecondary" display = 'inline'>
                        <strike>{details.currency}{details.price}</strike>
                    </Typography>
                </Grid>
                <Grid item style={{ paddingBottom: '0px'}}>
                    <Typography variant="subtitle2" color="textSecondary" display = 'inline'>
                        {details.fake_discount}% off
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant='caption'  style={{lineHeightBottom:'0'}}>
            (inclusive of all taxes)
             </Typography>      
        </Box>

        
            <Grid container justify="space-around" alignItems='bottom' >
                <Grid item xs={6}>
                        <DatePicker/>
                    </Grid>
                    <Grid item xs={6}>
                        <Box mt={1}>
                            <Grid container justify='center'>
                                <Grid item>
                                    <MonthSelect/>
                                    
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    
            </Grid>

{/* 
          <Facility type='Breakfast' price='price'/>

          <Facility type='Lunch' price='price'/>

          <Facility type='Dinner' price='price'/>

          <Facility type='wifi' price='price'/> */}

        <FacilityIcon post={details}/>

          <Divider/>
        <Box mt={1} mb={2}>
    <Grid container alignItems='center'>
        <Grid item xs={4}>
            <Typography variant='subtitle1'>
                Apply Coupon
            </Typography>
        </Grid>
                    <Grid item xs={7}>
                            <FormControl variant="outlined" noValidate>
                            <InputLabel >Coupon Code</InputLabel>
                            <OutlinedInput
                                value={values.couponCode}
                                onChange={handleChange('couponCode')}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Button>
                                        Check
                                    </Button>
                                </InputAdornment>
                                }
                                labelWidth={100}
                                />
                            </FormControl>
                    </Grid>
            </Grid>






        </Box>

<Divider/>
            <Box mt={1} mb={2}>
            <Grid container alignItems='center'>
                <Grid item xs={8}>
                    <Typography variant='subtitle1'>
                        <Box fontSize="20px">
                        Your savings
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle2'>
                    <Box fontSize="18px">
                    {details.currency}{details.price - details.final_price}
                    </Box>
                    </Typography>
                </Grid>
            </Grid>


            <Grid container alignItems='center'>
                <Grid item xs={8} >
                    <Typography variant='subtitle1'>
                    <Box fontSize="20px">
                        Total Price
                     </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle2'>
                    <Box fontSize="18px">
                    {details.currency}{details.price}
                </Box>
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant='caption'  style={{lineHeightBottom:'0'}}>
                (inclusive of all taxes)
            </Typography>

        </Box>

      <Button variant='contained' color="secondary" fullWidth >
          Continue to book
        </Button>
        <Cancellation/>
      </CardContent>
    </Card>
  );
}
