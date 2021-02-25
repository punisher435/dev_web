import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
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

axios.defaults.xsrfHeaderName = `${process.env.XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.CSRF_COOKIE}`;

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

const useStyles = makeStyles(theme => ({
    myclass: {
        marginTop:'10%'
    },
    imageclass: {
      overflow: 'hidden',
        width: '110px',
        height: '110px',
        position:'relative',
      borderRadius:'50%',
      [theme.breakpoints.up('sm')]: {
        borderRadius:'50%',
        overflow: 'hidden',
        width: '200px',
        height: '200px',
        position:'relative',
      },
      [theme.breakpoints.up('md')]: {
        borderRadius:'50%',
        overflow: 'hidden',
        width: '300px',
        height: '300px',
        position:'relative',
      },
      marginLeft:'1%',
      marginRight:'1%',
    },
    erorclass: {
      width:'50%',
      marginLeft:'25%',
  },
  buttonclass:{
    padding:0,
    borderRadius:'70%',
    
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
      file:"/account-icon-8.png"
    })

    const [edit,setedit] = useState(false)
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const hiddenFileInput1 = React.useRef(null);
   

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
                  file:res.data.photo
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
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let form_data = new FormData();
      form_data.append('user_id',values.user_id)
      form_data.append('country_code',values.country_code)
      form_data.append('mobile',values.mobile)
      form_data.append('alternate_mobile',values.alternate_mobile)
      form_data.append('aadhar',values.aadhar)
      form_data.append('photo',myprofile.photo)
      console.log(form_data.entries())
      const config = {
        headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      
      if(edit===true)
      {
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/${props.profile.id}/`,form_data,config);
              
          setredirect(true)
              
              }
                catch{
                  console.log('error')
                  seterror(true)
                }
      }
      else{
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcezxradakgdlh/profile/`,form_data,config);
              
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
    return <div className={classes.erorclass}><Eror error={'Cannot update profile'} /></div>;
  }

  return (
    <div className={classes.myclass}>
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <form onSubmit={formik.handleSubmit}>

      <Grid item className={classes.imageclass}>

      <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput1.current.click();}}>
        <img src={myprofile.file} className={classes.imageclass}/>
        </Button>

      <input type='file'  ref={hiddenFileInput1} style={{display:'none'}}  id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
      setprofile({...myprofile,file: URL.createObjectURL(event.target.files[0]),photo:event.target.files[0]})}}/> 

      </Grid>

        <br />
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



const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(ProfileForm)
