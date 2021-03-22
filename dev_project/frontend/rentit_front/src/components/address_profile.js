import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Eror from './eror'
import Paper from '@material-ui/core/Paper';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const validationSchema = yup.object({
  

    address: yup
    .string('Enter your Address')
    .required('Address is required'),

    city: yup
    .string('Enter your City')
    .required('City is required'),

    state: yup
    .string('Enter your State')
    .required('State is required'),

    country: yup
    .string('Enter your Country')
    .required('Country is required'),

    pincode: yup
    .string('Enter your Pincode')
    .required('Pincode is required'),

    landmark:yup
    .string('Enter your Landmark')
    .required('Landmark is required'),

    
});


  const useStyles = makeStyles((theme) => ({
    
  
 
    // necessary for content to be below app bar
    myclass: {
        padding:'5%',
        overflowX:'hidden'
       
    },
    bgclass: {
      backgroundColor:`${process.env.REACT_APP_BG_COLOR}`,
      height:'100vh',
      
   
      overflowX:'hidden'
    },
    myclass1: {
      padding:'30px',
      overflowX:'hidden',
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
    gridclass: {
      overflowX:'hidden'
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

function AddressForm (props){
    const classes = useStyles();

    const [myaddress,setaddress] = useState({
      address:'',
      city:'',
      state:'',
      country:'',
      landmark:'',
      pincode:'',
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
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcejkzff8wqhdq92/my_address/${props.profile.id}/`,config);
              
                setaddress({
                  address:res.data.address,
                  city:res.data.city,
                  state:res.data.state,
                  country:res.data.country,
                  landmark:res.data.landmark,
                  pincode:res.data.pincode,
                })
                setedit(true);
                
              
              }
                catch{
      
                }
        }
    }
    
    ,[props.profile])

  

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      address:myaddress.address,
      city:myaddress.city,
      state:myaddress.state,
      country:myaddress.country,
      landmark:myaddress.landmark,
      pincode:myaddress.pincode,
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
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcejkzff8wqhdq92/my_address/${props.profile.id}/`,body,config);
              
          setredirect(true)
              
              }
                catch{
                  console.log('error')
                  seterror(true)
                }
      }
      else{
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcejkzff8wqhdq92/my_address/`,body,config);
              
        setredirect(true)
        
              }
                catch{
                  console.log('error')
                  seterror(true)
                }
      }
    },
  });

  if(redirect==true)
  {
    return <Redirect to='/dashboard/profile' />
  }
  if(error===true)
  {

      return <div className={classes.erorclass}><Eror error={'Cannot update address details'}/></div>
  }

  return (
    <div className="formbgclass1">
    <div className={classes.myclass}>
      
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.gridclass}
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
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        </Grid>

        <br />
        <Grid item>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        </Grid>

        <br />
        <Grid item>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={1}
          id="state"
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
        </Grid>

        <br />
        <Grid item>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={1}
          id="landmark"
          name="landmark"
          label="Landmark"
          value={formik.values.landmark}
          onChange={formik.handleChange}
          error={formik.touched.landmark && Boolean(formik.errors.landmark)}
          helperText={formik.touched.landmark && formik.errors.landmark}
        />
        </Grid>

        <br />

        <Grid item>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={1}
          id="country"
          name="country"
          label="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
        </Grid>

        <br />
        <Grid item>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="pincode"
          name="pincode"
          label="Pincode"
          value={formik.values.pincode}
          onChange={formik.handleChange}
          error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          helperText={formik.touched.pincode && formik.errors.pincode}
        />
        </Grid>
 

        
 
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

export default connect(mapStateToProps)(AddressForm)
