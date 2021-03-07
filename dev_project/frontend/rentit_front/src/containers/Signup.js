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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to='/'>
        Rentit
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
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        is_seller:false,
        password: '',
        re_password: '',
        gender:'Male'
    });

    const classes = useStyles();

    const [accountCreated, setAccountCreated] = useState(false);

    const { first_name,last_name,is_seller, email, password, re_password,gender } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const checked = e => {
        setFormData({ ...formData, is_seller: e.target.checked });
    }

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup({ first_name,last_name, email,is_seller, password, re_password,gender });
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='login' />;
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

              
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoFocus
                    value={first_name}
                    onInput={ e => onChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    value={last_name}
                    onInput={ e => onChange(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onInput={ e => onChange(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onInput={ e => onChange(e)}
                    />
                </Grid>
                
                <FormControl className={classes.formControl}>
        <InputLabel id="gender">Gender</InputLabel>
                <Select
          labelId="gender"
          id="gender"
          value={formData.gender}
          onChange={(e) => {setFormData({...formData,gender:e.target.value})}}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
        </FormControl>

                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="re_password"
                    label="Confirm Password"
                    type="password"
                    id="re_password"
                    autoComplete="current-password"
                    value={re_password}
                    onInput={ e => onChange(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                control={<Checkbox value={is_seller} onChange={e => checked(e)} color="primary" />}
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