import React,{useState} from 'react';

import { makeStyles,useTheme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import Eror from './eror'
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Add from '../addroom.png';
import './css/App.css';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png"
];

const validationSchema = yup.object({
  review: yup
  .string('Enter your Room name')
  .required('Room name is required'),

  rating: yup
  .number().required(''),

 



    

    
});

const useStyles = makeStyles(theme => ({
    myclass: {
        paddingTop:'10%'
    },
    imageclass: {
      overflow: 'hidden',
        width: '85px',
        height: '85px',
        position:'relative',
      borderRadius:'50%',
      [theme.breakpoints.up('sm')]: {
        borderRadius:'50%',
        overflow: 'hidden',
        width: '100px',
        height: '100px',
        position:'relative',
      },
      [theme.breakpoints.up('md')]: {
        borderRadius:'50%',
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
  papernewclass:{
    padding:20,
    [theme.breakpoints.up('sm')]: {
      padding:30,
    },
   
  },
  buttonclass:{
    padding:0,
    borderRadius:'70%',
    
    },
}));

function ReviewForm (props){
    const classes = useStyles();
    const theme = useTheme();

    const [myreview,setreview] = useState({
      rating:0,
      review:'',
      seller_rating:0,
      seller_review:'',
      photo1:'',
      file1:Add,
      photo2:'',
      file2:Add,
      photo3:'',
      file3:Add,
    })

    
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const hiddenFileInput1 = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const hiddenFileInput3 = React.useRef(null);

   

    const [loading,setloading] = React.useState(false);

    const type = props.location.state.property_id;
    const bookingid = props.match.params.bookingid;

    

  

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      input1:false,
      input2:false,
      input3:false,
        rating:myreview.rating,
        review:myreview.review,
        seller_rating:myreview.seller_rating,
        seller_review:myreview.seller_review,
        photo1:myreview.photo1,
        photo2:myreview.photo2,
        photo3:myreview.photo3,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setloading(true);
      let form_data = new FormData();
      form_data.append('rating',values.rating)
      form_data.append('review',values.review)
      form_data.append('seller_rating',values.seller_rating)
      form_data.append('seller_review',values.seller_review)
      form_data.append('photo1',values.photo1)
      form_data.append('photo2',values.photo2)
      form_data.append('photo3',values.photo3)
      form_data.append('bookingid',bookingid)
      form_data.append('type',type)
     
      const config = {
        headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      
      
      
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcebahsda292bidua92/reviews/`,form_data,config);
            setloading(false)  
        setredirect(true)

              }
                catch{
                  setloading(false)
              
                  seterror(true)
                }
      }
    
  });



const Filevalidation3 = (file1,name) => {
  
 
  // Check if any file is selected.
  
     

          const fsize =file1.size;
          const file = Math.round((fsize / 1024));
          // The size of the file.
          if (file >= 3072) {
              alert(
                "File too Big, please select a file less than 5mb");
          } 
          else{
            
            formik.setFieldValue('photo3',file1);
            setreview({...myreview,file3: URL.createObjectURL(file1),photo3:file1});
          }
      
  
}

const Filevalidation2 = (file1,name) => {
  
 
  // Check if any file is selected.
  
     

          const fsize =file1.size;
          const file = Math.round((fsize / 1024));
          // The size of the file.
          if (file >= 3072) {
              alert(
                "File too Big, please select a file less than 5mb");
          } 
          else{
            
            formik.setFieldValue('photo2',file1);
            setreview({...myreview,file2: URL.createObjectURL(file1),photo2:file1});
          }
      
  
}

const Filevalidation1 = (file1,name) => {
  
 
  // Check if any file is selected.
  
     

          const fsize =file1.size;
          const file = Math.round((fsize / 1024));
          // The size of the file.
          if (file >= 3072) {
              alert(
                "File too Big, please select a file less than 5mb");
          } 
          else{
            
            formik.setFieldValue('photo1',file1);
            setreview({...myreview,file1: URL.createObjectURL(file1),photo1:file1});
          }
      
  
}


  

  if(redirect==true)
  {
    return <Redirect to='/dashboard/recentbookings' />
  }
  if(error===true)
  {
    return <div className={classes.erorclass}><Eror error={'Unable to give feedback!'} /></div>;
  }

  return (
    <div className="formbgclass1">
    <div className={classes.myclass}>
            <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
        

       
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
           <Paper elevation={5} className={classes.papernewclass}>
      <form onSubmit={formik.handleSubmit}>
        
        <br />

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >

      <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput1.current.click();}}>
          <img src={myreview.file1} className={classes.imageclass}/>
          </Button>
        
          <input type='file'  ref={hiddenFileInput1} style={{display:'none'}}  id='photo1' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
          Filevalidation1(event.target.files[0]);}} />
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput2.current.click();}}>
          <img src={myreview.file2} className={classes.imageclass}/>
          </Button>
        
          <input type='file'  ref={hiddenFileInput2} style={{display:'none'}}  id='photo2' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
  Filevalidation2(event.target.files[0]);}}/> 
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput3.current.click();}}>
          <img src={myreview.file3} className={classes.imageclass}/>
          </Button>
        
          <input type='file'  ref={hiddenFileInput3} style={{display:'none'}}  id='photo3' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
  Filevalidation3(event.target.files[0]);}}/> 
        </Grid>

        </Grid>
        <br />

        <Grid item>
        <Rating
          name="rating"
          value={formik.values.rating}
          onChange={(event, newValue) => {
            formik.setFieldValue('rating',newValue);
          }}
        />
        </Grid>


        <br />
          <Grid item>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={3}
          id="review"
          name="review"
          label="Write Review"
          value={formik.values.review}
          onChange={formik.handleChange}
          error={formik.touched.review && Boolean(formik.errors.review)}
          helperText={formik.touched.review && formik.errors.review}
        />
        </Grid>
        <br />

        <Grid item>
          <Typography variant="h5" component="h3" className={classes.newclass}>
            Seller Feedback (optional)
          </Typography>
        </Grid>
        <br />

        <Grid item>
        <Rating
          name="seller_rating"
          value={formik.values.seller_rating}
          onChange={(event, newValue1) => {
            formik.setFieldValue('seller_rating',newValue1);
          }}
        />
        </Grid>


        <br />

        <Grid item>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={3}
          id="seller_review"
          name="seller_review"
          label="Seller Review"
          value={formik.values.seller_review}
          onChange={formik.handleChange}
          error={formik.touched.seller_review && Boolean(formik.errors.seller_review)}
          helperText={formik.touched.seller_review && formik.errors.seller_review}
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

export default connect(mapStateToProps)(ReviewForm)
