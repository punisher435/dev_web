import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles,useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
     
    },
  
   
}));

export default function AddressForm({bookdetails,setbookdetails,setpayment,profile}) {


  const onChange = (e) => {
    setbookdetails({ ...bookdetails, [e.target.name]: e.target.value });
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Guest Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstname"
            name="firstname"
            label="First name"
            value={bookdetails.firstname}
            fullWidth
            autoComplete="given-name"
            onInput={ e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={bookdetails.lastname}
            onInput={ e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile"
            fullWidth
            autoComplete="Mobile"
            value={bookdetails.mobile}
            onInput={ e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="alternate_mobile"
            name="alternate_mobile"
            label="Alternate mobile"
            fullWidth
            autoComplete="Alternate mobile"
            value={bookdetails.alternate_mobile}
            onInput={ e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
       
          <FormControl className={classes.form}>
          <InputLabel htmlFor="age-native-simple">Country code</InputLabel>
          <Select
            native
            id="country_code"
            name="country_code"
            value={bookdetails.country_code}
            onInput={ e => onChange(e)}
            
          >
           
            <option value={'+91'}>+91</option>
            
          
          </Select>
        </FormControl>
        
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='body1'>
            Note: Gender of customer must match the room gender specificity
          </Typography>
        </Grid>
      
       
      </Grid>
    </React.Fragment>
  );
}