import React,{useState,useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Eror from './eror'
import Paper from '@material-ui/core/Paper';
import './css/App.css';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const validationSchema = yup.object({
  

    account_no: yup
    .string('Enter your Account no.')
    .required('Account no. is required'),

    bank_name: yup
    .string('Enter your Bank name')
    .required('Bank name is required'),

    bank_address: yup
    .string('Enter your Bank address')
    .required('Bank address is required'),

    IFSC_code: yup
    .string('Enter your IFSC code')
    .required('IFSC code is required'),

    currency: yup
    .string('Enter your currency')
    .required('Currency is required'),

    account_type:yup
    .string('Enter your Account type:')
    .required('Account type: is required'),

    
});


  const useStyles = makeStyles((theme) => ({
    
  
 
    // necessary for content to be below app bar
    myclass: {
      padding:'6%'
     
  },
  
  myclass1: {
    padding:'30px'
},
    imageclass: {
      width:'350px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    erorclass: {
        width:'50%',
        marginLeft:'25%',
    },
    papernewclass:{
      padding:20,
      [theme.breakpoints.up('sm')]: {
        padding:30,
      },
     
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
     
    },
  }));

function BankForm (props){
    const classes = useStyles();

    const [mybank,setbank] = useState({
      bank_name:'',
      bank_address:'',
      IFSC_code:'',
      account_type:'',
      currency:'',
      account_no:'',
    })

    const [edit,setedit] = useState(false)
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
   

    useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.profile)
              {
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceadbahdvjs218/my_bank_details/${props.profile.id}/`,config);
              
                setbank({
                    bank_name:res.data.bank_name,
                    bank_address:res.data.bank_address,
                    IFSC_code:res.data.IFSC_code,
                    account_type:res.data.account_type,
                    currency:res.data.currency,
                    account_no:res.data.account_no,
                })
                setedit(true);
                
              
              }
                catch{
      
                }
        }
        console.clear();
    }
    
    ,[props.profile])

  

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      bank_name:mybank.bank_name,
      bank_address:mybank.bank_address,
      IFSC_code:mybank.IFSC_code,
      account_type:mybank.account_type,
      currency:mybank.currency,
      account_no:mybank.account_no,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      
      const config = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      const body = {
          data:values
      }

      
      if(edit===true)
      {
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourceadbahdvjs218/my_bank_details/${props.profile.id}/`,body,config);
              
          setredirect(true)
              
              }
                catch{
               
                  seterror(true)
                }
      }
      else{
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourceadbahdvjs218/my_bank_details/`,body,config);
              
        setredirect(true)
        
              }
                catch{
                 
                  seterror(true)
                }
      }
      console.clear();
    },
  });

  if(redirect==true)
  {
    return <Redirect to='/dashboard/profile' />
  }
  if(error===true)
  {

      return <div className={classes.erorclass}><Eror error={'Cannot update bank details'}/></div>
  }

  return (
    <div className="formbgclass1">
    <div className={classes.myclass}>
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >

<Paper elevation={5} className={classes.papernewclass}>
      <form onSubmit={formik.handleSubmit}>
        
       
        <br />
        <Grid item>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="account_no"
          name="account_no"
          label="Account no."
          value={formik.values.account_no}
          onChange={formik.handleChange}
          error={formik.touched.account_no && Boolean(formik.errors.account_no)}
          helperText={formik.touched.account_no && formik.errors.account_no}
        />
        </Grid>

        
        <Grid item>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="bank_name"
          name="bank_name"
          label="Bank name"
          value={formik.values.bank_name}
          onChange={formik.handleChange}
          error={formik.touched.bank_name && Boolean(formik.errors.bank_name)}
          helperText={formik.touched.bank_name && formik.errors.bank_name}
        />
        </Grid>

        <Grid item>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="bank_address"
          name="bank_address"
          label="Bank address"
          value={formik.values.bank_address}
          onChange={formik.handleChange}
          error={formik.touched.bank_address && Boolean(formik.errors.bank_address)}
          helperText={formik.touched.bank_address && formik.errors.bank_address}
        />
        </Grid>

       
        <Grid item>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="IFSC_code"
          name="IFSC_code"
          label="IFSC code"
          value={formik.values.IFSC_code}
          onChange={formik.handleChange}
          error={formik.touched.IFSC_code && Boolean(formik.errors.IFSC_code)}
          helperText={formik.touched.IFSC_code && formik.errors.IFSC_code}
        />
        </Grid>

      

        <Grid item>
            <FormControl className={classes.form}>
                <InputLabel id="account_type">Account type</InputLabel>
                <Select
                labelId="account_type"
                id="account_type"
                value={formik.values.account_type}
                onChange={(e) => formik.setFieldValue('account_type',e.target.value)}
                error={formik.touched.account_type && Boolean(formik.errors.account_type)}
                helperText={formik.touched.account_type && formik.errors.account_type}
                >
                <MenuItem value={'current'}>current</MenuItem>
                <MenuItem value={'savings'}>savings</MenuItem>
                </Select>
            </FormControl>
        </Grid>
 

        <Grid item>
            <FormControl className={classes.form}>
                <InputLabel id="currency">Currency</InputLabel>
                <Select
                labelId="currency"
                id="currency"
                value={formik.values.currency}
                onChange={(e) => formik.setFieldValue('currency',e.target.value)}
                error={formik.touched.currency && Boolean(formik.errors.currency)}
                helperText={formik.touched.currency && formik.errors.currency}
                >
                <MenuItem value={'₹ INR'}>₹ (Indian rupees)</MenuItem>
                </Select>
            </FormControl>
        </Grid>
 
        <br />
        <br />
        
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      </Paper>
      </Grid>
    </div>
    </div>
  );
}



const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(BankForm)
