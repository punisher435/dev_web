import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Seller Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Name"
            name="Name"
            label=" name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
       
        <Grid item xs={12}>
          <TextField
            required
            id="Email"
            name="Email"
            label="email"
            fullWidth
            autoComplete="email"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="aadhar no"
            name="aadhar no"
            label="Aadhar_No"
            fullWidth
            autoComplete="aadhar no"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="mobile no"
            name="mobile no"
            label="Mobile_No"
            fullWidth
            autoComplete="mobile no"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField id=" alternate mobile no" name="salternate mobile no" label="Alternate mobile_no" fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}