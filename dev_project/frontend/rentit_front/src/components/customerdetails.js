import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';




export default function AddressForm({bookdetails,setbookdetails,setpayment,profile}) {


  const onChange = (e) => {
    setbookdetails({ ...bookdetails, [e.target.name]: e.target.value });
  }

   

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
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
          <TextField
            required
            id="country_code"
            name="country_code"
            label="Country code"
            fullWidth
            value={bookdetails.country_code}
            autoComplete="country_code"
            onInput={ e => onChange(e)}
          />
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