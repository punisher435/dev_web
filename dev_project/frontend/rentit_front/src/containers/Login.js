import React, { useState } from 'react'
import { Link , Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../redux/auth/actions/auth_actions'
import { useFormik } from 'formik';
import * as yup from 'yup';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import {Link as Link1} from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../components/css/App.css';

const validationSchema = yup.object({
  
 

  email: yup
  .string('Enter your email')
  .email('PLease enter valid email')
  .required('Email is required'),

  password: yup.string()
  .required('No password provided.') 
  
 

  
});




function Copyright() {

    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to='/' style={{textDecoration:'none',color:`${process.env.REACT_APP_COMPLIMENT_COLOR}`}}>
          Rent=ene
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const Login = ({ login, isAuthenticated }) => {

  var temp=''
  const urlParams = new URLSearchParams(window.location.search);
  const myparam = urlParams.get('signup')

  if(myparam)
  {
    temp=myparam
  }
  

        
   
    const classes = useStyles();


  const [display,setdisplay] = React.useState(false)

  React.useEffect(() => {

    if(temp==='success')
  {
   setdisplay(true) 
  }


  },[temp])
  
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


  const [message,setmess] = useState('')
    const [display1,setdisplay1] = useState(false)

  const formik = useFormik({
      
    initialValues: {

      email: '',
      password: ''
     
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
     
      const { email, password } = values;
      
      login(email, password)
      .then(temp => {
  

        })
        .catch(err => {
          
          setmess(err.message);
          setdisplay1(true)

        })


      
      
    },
  });

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    if (isAuthenticated)
        return <Redirect to='/' />;
    if(temp){
    return (
        <Grid container component="main" className={classes.root}>
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

          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                 
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/reset_password">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link  to='/signup'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      );}
      else{
        return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />

         
          <Snackbar open={display1} autoHideDuration={6000} onClose={handleClose1}>
            <Alert onClose={handleClose1} severity="error">
              Error! {message}
            </Alert>
          </Snackbar>

          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                 
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={`${classes.submit} buttonmainclass`}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/reset_password" style={{textDecoration:'none',color:`${process.env.REACT_APP_COMPLIMENT_COLOR}`}}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link  to='/signup' style={{textDecoration:'none',color:`${process.env.REACT_APP_COMPLIMENT_COLOR}`}}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      );
      }
};

const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);