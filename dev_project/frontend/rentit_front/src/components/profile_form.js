import React,{useState,useEffect} from 'react';

import { makeStyles,useTheme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Eror from './eror'
import Paper from '@material-ui/core/Paper';
import './css/App.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const validationSchema = yup.object({
  

    country_code: yup
    .string('Enter your country code')
    .required('Country code is required'),

    mobile: yup
    .number('Enter your mobile')
    .min(10, 'Mobile should be of minimum 10 characters length')
    .required('Mobile is required'),

   
   

    
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(theme => ({
  myclass: {
    padding:'6%'
   
},
bgclass: {
  backgroundColor:`${process.env.REACT_APP_BG_COLOR}`,
  height:'100vh'
 

},
myclass1: {
  padding:'30px'
},
imageclass: {
  overflow: 'hidden',
    width: '140px',
    height: '140px',
    position:'relative',
  borderRadius:'30%',
  [theme.breakpoints.up('sm')]: {
    borderRadius:'30%',
    overflow: 'hidden',
    width: '170px',
    height: '170px',
    position:'relative',
  },
  [theme.breakpoints.up('md')]: {
    borderRadius:'30%',
    overflow: 'hidden',
    width: '200px',
    height: '200px',
    position:'relative',
  },
  marginRight:'1%',
  marginLeft:'1%',

},
    erorclass: {
      width:'50%',
      marginLeft:'25%',
  },
  buttonclass:{
    padding:0,
    borderRadius:'70%',
    
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
    myclass11:{
     
    width: '140px',
  
  [theme.breakpoints.up('sm')]: {
    
    width: '170px',
   
  },
  [theme.breakpoints.up('md')]: {
  
    width: '200px',
   
  },
    },
}));

function ProfileForm (props){
    const classes = useStyles();
    const theme = useTheme();

    const [myprofile,setprofile] = useState({
      country_code:'+91',
      mobile:'',
      alternate_mobile:'',
      aadhar:'',
      user_id:'',
      photo:'',
      file:"../account-icon-8.png",
      front:null,
      back:null,
    })

    const [edit,setedit] = useState(false)
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const hiddenFileInput1 = React.useRef(null);
    const [open1,setopen1] = React.useState(false);
    const [message,setmessage] = React.useState(false);
   

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
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${props.profile.id}/`,config);
              
                setprofile({
                  country_code:res.data.country_code,
                  mobile:res.data.mobile,
                  alternate_mobile:res.data.alternate_mobile,
                  aadhar:res.data.aadhar,
                  user_id:props.profile.id,
                  photo:res.data.photo,
                  file:res.data.photo,
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
      user_id:myprofile.user_id,
      country_code:myprofile.country_code,
      mobile:myprofile.mobile,
      alternate_mobile:myprofile.alternate_mobile,
      aadhar:myprofile.aadhar,
      photo:'null',
      front:myprofile.front,
      back:myprofile.back,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      var temp = true;

   

if(props.profile.is_seller && edit===false && (values.front===null || values.back===null || (values.country_code==='+91' && values.aadhar.length!=12)  ) )
{
    temp=false;
}

      if(temp===true)
      {
       
      let form_data = new FormData();
      form_data.append('user_id',values.user_id)
      form_data.append('country_code',values.country_code)
      form_data.append('mobile',values.mobile)
      form_data.append('alternate_mobile',values.alternate_mobile)
      form_data.append('aadhar',values.aadhar)
      form_data.append('photo',values.photo)
      if(values.front!=null)
      {
        form_data.append('front',values.front)
      }
      if(values.back!=null)
      {
        form_data.append('back',values.back)
      }
    
      const config = {
        headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      
      if(edit===true)
      {
        await axios.put(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${props.profile.id}/`,form_data,config)
        .then((res) => {
          setredirect(true)
        })
        .catch((err) => {
          setmessage(`Your ${err.response.data} is linked to some other account!`)
          
          setopen1(true);

        })
      }
      else{
        await axios.post(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/`,form_data,config)
        .then((res) => {
          setredirect(true)
        })
        .catch((err) => {
          setmessage(`${err.response.data}!`)
          setopen1(true);

        })
              
        

              
                
      }

    }
    else{
      setmessage(`Identification proof photos are required and if your country code is +91, then aadhar no. is also required`)
          setopen1(true);
    }
   

    },
  });


  const Filevalidation1 = (file1,name) => {
  
 
    // Check if any file is selected.
    
       
  
            const fsize =file1.size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 5120) {
                alert(
                  "File too Big, please select a file less than 5mb");
            } 
            else{
              
              formik.setFieldValue('photo',file1);
              setprofile({...myprofile,file: URL.createObjectURL(file1),photo:file1});
            }
        
    
  }

  const Filevalidation2 = (file1,name) => {
  
 
    // Check if any file is selected.
    
       
  
            const fsize =file1.size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 5120) {
                alert(
                  "File too Big, please select a file less than 5mb");
            } 
            else{
              
              formik.setFieldValue('front',file1);
              
            }
        
    
  }
  const Filevalidation3 = (file1,name) => {
  
 
    // Check if any file is selected.
    
       
  
            const fsize =file1.size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 5120) {
                alert(
                  "File too Big, please select a file less than 5mb");
            } 
            else{
              
              formik.setFieldValue('back',file1);
              
            }
        
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen1(false);
  };

  if(redirect==true)
  {
    return <Redirect to='/dashboard/profile' />
  }
  if(error===true)
  {
    return <div className={classes.erorclass}><Eror error={'Cannot update profile'} /></div>;
  }

  if(props.profile)
  {
  return (
    <div className="formbgclass1">
    <div className={classes.myclass}>

    <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
        </Snackbar>
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
          <Paper elevation={5} className={classes.papernewclass}>
      <form onSubmit={formik.handleSubmit}>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >

      
     

      <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput1.current.click();}}>
        <img src={myprofile.file} className={classes.imageclass}/>
        </Button>

      <input type='file'  ref={hiddenFileInput1} style={{display:'none'}}  id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
          Filevalidation1(event.target.files[0]);}}/> 
 
    </Grid>

        <br />

        {
          props.profile.profile_completed===false ? <Grid item>
          <FormControl className={classes.form}>
          <InputLabel htmlFor="age-native-simple">Country code</InputLabel>
          <Select
            native
            value={formik.values.country_code}
            onChange={(e) => {e.preventDefault();formik.setFieldValue('country_code', e.target.value);}}
            error={formik.touched.country_code && Boolean(formik.errors.country_code)}
            helperText={formik.touched.country_code && formik.errors.country_code}
            
          >
           
            <option value={'+91'}>+91</option>
            
          
          </Select>
        </FormControl>
          </Grid> : null
        }

        
         
        <Grid item>
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         
         fullWidth
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
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="alternate_mobile"
          name="alternate_mobile"
          label="alternate_mobile"
          value={formik.values.alternate_mobile}
          onChange={formik.handleChange}
        />
        </Grid>


        {
          formik.values.country_code==='+91' && props.profile.is_seller && props.profile.profile_completed===false ? <Grid item>
          <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
            rows={1}
            id="aadhar"
            name="aadhar"
            label="Identification proof id"
            value={formik.values.aadhar}
            onChange={formik.handleChange}
            error={formik.touched.aadhar && Boolean(formik.errors.aadhar)}
            helperText={formik.touched.aadhar && formik.errors.aadhar}
          />
          </Grid> : null
        }
<br />



{
           props.profile.is_seller && props.profile.profile_completed===false ? <>
           <Grid item>
             <Typography variant="body1">Upload front view of identification proof</Typography>
           </Grid>
          <Grid item>
        <input type='file'  id='front' accept='image/png,image/jpeg,image/jpg' className={classes.myclass11} onChange={(event) => {
          Filevalidation2(event.target.files[0]);}}/> 
          </Grid></> : null
        }
<br />

{
           props.profile.is_seller && props.profile.profile_completed===false ? <>
           <Grid item>
             <Typography variant="body1">Upload back view of identification proof</Typography>
           </Grid>
          <Grid item>
        <input type='file'  id='back' accept='image/png,image/jpeg,image/jpg' className={classes.myclass11} onChange={(event) => {
          Filevalidation3(event.target.files[0]);}}/> 
          </Grid></> : null
        }

        
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
else{
  return <div></div>;
}
}




const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(ProfileForm)
