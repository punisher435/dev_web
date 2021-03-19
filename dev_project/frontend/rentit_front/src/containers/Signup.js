import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../redux/auth/actions/auth_actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  
  first_name: yup
  .string('Enter your first name')
  .required('First name is required'),

  last_name: yup
  .string('Enter your last name')
  .required('last name is required'),

  email: yup
  .string('Enter your email')
  .email('PLease enter valid email')
  .required('Email is required'),

  password: yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.'),

  re_password: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
 

  
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to='/'>
        Rent=ene
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Signup = ({ signup, isAuthenticated }) => {
   

    const classes = useStyles();

    const [accountCreated, setAccountCreated] = useState(false);

    

    

   
    const [message,setmess] = useState('')
    const [display,setdisplay] = useState(false)
    const [display1,setdisplay1] = useState(false)

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


   

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setdisplay(false);
    };

    const handleClose1 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setdisplay1(false);
    };

    const formik = useFormik({
      
      initialValues: {

        first_name: '',
        last_name: '',
        email: '',
        is_seller:false,
        password: '',
        re_password: '',
        gender:'Male'
       
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        
        
        const { first_name,last_name,is_seller, email, password, re_password,gender } = values;

       

        if (password === re_password) {
            signup({ first_name,last_name, email,is_seller, password, re_password,gender })
            .then(temp => {
              
              setdisplay(true)
              setAccountCreated(true)

              })
              .catch(err => {
                console.log('error',err.message);
                setmess(err.message);
                setdisplay1(true)

              })
           
            
           
        }
  
        
      },
    });
  

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='/login/?signup=success' />;
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Snackbar open={display} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Activation email has been sent. Kindly check your email!
            </Alert>
          </Snackbar>

          <Snackbar open={display1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="error">
              Error! {message}
            </Alert>
          </Snackbar>


            <div className={classes.paper}>

              
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                   
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoFocus
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                   
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                  
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                
                <FormControl className={classes.formControl}>
        <InputLabel id="gender">Gender</InputLabel>
                <Select
          labelId="gender"
          id="gender"
          value={formik.values.gender}
          onChange={(e) => {formik.setFieldValue('gender',e.target.value)}}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
        </FormControl>

                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    
                    fullWidth
                    name="re_password"
                    label="Confirm Password"
                    type="password"
                    id="re_password"
                    autoComplete="current-password"
                    value={formik.values.re_password}
                    onChange={formik.handleChange}
                    error={formik.touched.re_password && Boolean(formik.errors.re_password)}
                    helperText={formik.touched.re_password && formik.errors.re_password}
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                control={<Checkbox value={formik.values.is_seller} onChange={e => formik.setFieldValue('is_seller',e.target.checked)} color="primary" />}
                label="I am a seller."
                />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign Up
                </Button>
                <Grid container justify="flex-end">
                <Grid item>
                    <Link to='/login'>
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
            <Box mt={5}>
            <Copyright />
            </Box>
        </Container>
        );

};

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);