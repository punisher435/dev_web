import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../components/DatePicker'
import Cancellation from '../components/CancellationPolicyPopover'
import Facility from './FacilityCheckBox'
import StarRoundedIcon from '@material-ui/icons/Star';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';


import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));

export default function MediaCard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <Typography variant="h5" component="legend">Hostel Name</Typography>
        <Grid container alignItems="center">
            <Grid item>
                <Rating name="read-only" value={value} readOnly  />
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
                        500$
                    </Typography>
                </Grid>
                <Grid item style={{ paddingBottom: '0px'}}>
                    <Typography variant="subtitle1" color="textSecondary" display = 'inline'>
                        <strike>200$</strike>
                    </Typography>
                </Grid>
                <Grid item style={{ paddingBottom: '0px'}}>
                    <Typography variant="subtitle2" color="textSecondary" display = 'inline'>
                        35% off
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant='caption'  style={{lineHeightBottom:'0'}}>
            (inclusive of all taxes)
             </Typography>      
        </Box>
        </CardContent>
            <Card  >
                    <Grid container justify="space-around" >
                        <Grid item>
                                From
                                <br></br>
                                <DatePicker/>
                            </Grid>
                            <Grid item>
                                Till
                                <br></br>
                                <DatePicker/>
                            </Grid>
                    </Grid>
                </Card>
      <CardContent>
          <Facility type='Breakfast' price='price'/>

          <Facility type='Lunch' price='price'/>

          <Facility type='Dinner' price='price'/>

          <Facility type='wifi' price='price'/>

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
            value={values.password}
            onChange={handleChange('password')}
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
                    $500
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
                    $1500
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
