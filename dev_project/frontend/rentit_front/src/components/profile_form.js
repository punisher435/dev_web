import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const validationSchema = yup.object({
  

    country_code: yup
    .string('Enter your country code')
    .required('Country code is required'),

    mobile: yup
    .string('Enter your mobile')
    .min(10, 'Mobile should be of minimum 10 characters length')
    .required('Mobile is required'),
    aadhar: yup
    .string('Enter your aadhar')
    .min(12, 'Aadhar should be of minimum 12 characters length')
    .required('Aadhar is required'),

    
});

const useStyles = makeStyles({
    myclass: {
        marginTop:'10%'
    },
  });

function ProfileForm (){
    const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      country_code:'+91',
      mobile:'',
      alternate_mobile:'',
      aadhar:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={classes.myclass}>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <form onSubmit={formik.handleSubmit}>
          <Grid item>
        <TextField
          multiline
          rows={1}
          id="country_code"
          name="country_code"
          label="Country code"
          value={formik.values.country_code}
          onChange={formik.handleChange}
          error={formik.touched.country_code && Boolean(formik.errors.country_code)}
          helperText={formik.touched.country_code && formik.errors.country_code}
        />
        </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="mobile"
          name="mobile"
          label="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="alternate_mobile"
          name="alternate_mobile"
          label="alternate_mobile"
          value={formik.values.alternate_mobile}
          onChange={formik.handleChange}
        />
        </Grid>

        <Grid item>
        <TextField
          multiline
          rows={1}
          id="aadhar"
          name="aadhar"
          label="aadhar"
          value={formik.values.aadhar}
          onChange={formik.handleChange}
          error={formik.touched.aadhar && Boolean(formik.errors.aadhar)}
          helperText={formik.touched.aadhar && formik.errors.aadhar}
        />
        </Grid>
        <br />
        
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      </Grid>
    </div>
  );
}

export default ProfileForm
