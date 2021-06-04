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

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../components/css/App.css';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      <Link to='/' style={{textDecoration:'none',color:`${process.env.REACT_APP_COMPLIMENT_COLOR}`}}>
        Rentene
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: `${process.env.REACT_APP_COLOR}`,
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
  bgclass:{
    backgroundImage:"url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80')",
    width:'100vw',
    height:'100vh',
   
    
    backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    
        [theme.breakpoints.up('lg')]: {
          backgroundImage:"url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80')",
         
          height:'125vh',
          
          width:'130vw',
          backgroundRepeat: 'no-repeat',
        },
  },
  textclass:{
    
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const Signup = ({ signup, isAuthenticated }) => {
   

    const classes = useStyles();

    const [accountCreated, setAccountCreated] = useState(false);

    

    

   
    const [message,setmess] = useState('')
    const [display,setdisplay] = useState(false)
    const [display1,setdisplay1] = useState(false)
    const [open1,setopen1] = useState(false)

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
        setopen1(true);
        
        
        const { first_name,last_name,is_seller, email, password, re_password,gender } = values;

       

        if (password === re_password) {
            signup({ first_name,last_name, email,is_seller, password, re_password,gender })
            .then(temp => {
              setopen1(false);
              setdisplay(true)
              setAccountCreated(true)
              

              })
              .catch(err => {
                setopen1(false);
                setmess(err.message);
                setdisplay1(true)

              })
           
            
           
        }
        else{
          setopen1(false);
        }
  
        
      },
    });
  

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='/login/?signup=success' />;
    
    return (
      <div className={classes.bgclass}>
        <Container component="main" maxWidth="xs" >
            <CssBaseline />

            <Backdrop className={classes.backdrop} open={open1}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
                  
                    className={classes.textclass}
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
                label="I want to rent my property."
                />
               
                <FormControlLabel
                checked={true} disabled={true}
                control={<Checkbox color="primary" />}
                label="I agree to the terms and conditions."
                />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={`${classes.submit} buttonmainclass`}
                >
                Sign Up
                </Button>
                <Grid container justify="flex-end">
                <Grid item>
                    <Link to='/login' style={{textDecoration:'none',color:`${process.env.REACT_APP_COMPLIMENT_COLOR}`}}>
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
        </div>
        );

};

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);