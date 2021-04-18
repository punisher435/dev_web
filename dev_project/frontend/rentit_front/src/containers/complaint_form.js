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
import Eror from '../components/eror'
import Paper from '@material-ui/core/Paper';
import '../components/css/App.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const validationSchema = yup.object({
  

    room_id: yup
    .string('')
    .required('Room selection is required'),

    subject: yup
    .string('')
    .required('Subject is required'),

    message: yup
    .string('')
    .required('Message is required'),
   

    
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

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));

function ProfileForm (props){
    const classes = useStyles();
    const theme = useTheme();

    const [myprofile,setprofile] = useState({
     
      file:"/addroom.png"
    })

   
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const hiddenFileInput1 = React.useRef(null);
    const [open1,setopen1] = React.useState(false);
    const [message,setmessage] = React.useState(false);
    const [bookings,setbookings] = React.useState([]);

    const [load,setload] = useState(false)
   

    useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.isAuthenticated)
              {
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcehjbda983290whjba/room/book/`,config);
              
                setbookings(res.data);
                
                
              
              }
                catch{
                 
                }
        }
    }
    
    ,[props.isAuthenticated])

  

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
        roomid: '',
      subject:'',
      message:'',
      photo:'',
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setload(true);
      let form_data = new FormData();
      form_data.append('room_id',values.room_id)
      form_data.append('subject',values.subject)
     
      form_data.append('message',values.message)
      
      form_data.append('photo',values.photo)
      
      const config = {
        headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      
   
    
        await axios.post(`${process.env.REACT_APP_API_URL}/sourcenjjbrtrtd7668ugf787t87t9yuigff/complaints/room/`,form_data,config)
        .then((res) => {
          setload(false);
          setredirect(true)
        })
        .catch((err) => {
          setload(false);
          setmessage(`Error`)
          setopen1(true)
         
        })
              
        

              
                
      
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
              setprofile({...myprofile,file: URL.createObjectURL(file1)});
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
    return <Redirect to='/dashboard/complaints/room' />
  }
  if(error===true)
  {
    return <div className={classes.erorclass}><Eror error={'Cannot issue your complaint.'} /></div>;
  }

  return (
    <div className="formbgclass1">
      <Backdrop className={classes.backdrop} open={load}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <Grid item>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="subject"
          name="subject"
          label="subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
        />
        </Grid>
        <Grid item>
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         
         fullWidth
          rows={1}
          id="message"
          name="message"
          label="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />
        </Grid>
       


        <FormControl variant="outlined" className={classes.form} >
        <InputLabel id="demo-sroom_id">Booking ID</InputLabel>
        <Select
          labelId="demo-sroom_id"
          id="room_id"
          value={formik.values.room_id}
          onChange={(e) => {e.preventDefault();formik.setFieldValue('room_id', e.target.value)}}
          label="Select Booking"
          error={formik.touched.room_id && Boolean(formik.errors.room_id)}
          helperText={formik.touched.room_id && formik.errors.room_id}
        >
         

          {
              bookings.map((booking) => (
                <MenuItem value={booking.booking_id}>{booking.booking_id}</MenuItem>
              ))
          }
          
        </Select>
      </FormControl>

      <Grid item> <br /></Grid>

       
        
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

export default connect(mapStateToProps)(ProfileForm)
