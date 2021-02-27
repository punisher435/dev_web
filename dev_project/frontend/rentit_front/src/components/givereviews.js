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
import Rating from '@material-ui/lab/Rating';
import Eror from './eror'
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  photo1: yup.mixed().when("input1", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo2: yup.mixed().when("input2", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),

  photo3: yup.mixed().when("input3", {
    is: true,
    then: yup.mixed().required("A file is required")
    .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  }),



    

    
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
        width: '200px',
        height: '200px',
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

function ReviewForm (props){
    const classes = useStyles();
    const theme = useTheme();

    const [myreview,setreview] = useState({
      rating:0,
      review:'',
      seller_rating:0,
      seller_review:'',
      photo1:'',
      file1:"/addroom.png",
      photo2:'',
      file2:"/addroom.png",
      photo3:'',
      file3:"/addroom.png",
    })

    
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const hiddenFileInput1 = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const hiddenFileInput3 = React.useRef(null);

    const [input1,setinput1] = React.useState(false);
    const [input2,setinput2] = React.useState(false);
    const [input3,setinput3] = React.useState(false);

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
      console.log(form_data.entries())
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
                  console.log('error')
                  seterror(true)
                }
      }
    
  });

  if(redirect==true)
  {
    return <Redirect to='/dashboard/recentbookings' />
  }
  if(error===true)
  {
    return <div className={classes.erorclass}><Eror error={'Unable to give feedback!'} /></div>;
  }

  return (
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
      <form onSubmit={formik.handleSubmit}>
        <Grid item>
          <Typography variant="h5" component="h3" className={classes.newclass}>
            Room Feedback
          </Typography>
        </Grid>
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
  setreview({...myreview,file1: URL.createObjectURL(event.target.files[0])}); formik.setFieldValue('photo1',event.target.files[0]); formik.setFieldValue('input1',true)}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput2.current.click();}}>
          <img src={myreview.file2} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput2} style={{display:'none'}}  id='photo2' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
  setreview({...myreview,file2: URL.createObjectURL(event.target.files[0])});  formik.setFieldValue('photo2',event.target.files[0]);  formik.setFieldValue('input2',true)}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput3.current.click();}}>
          <img src={myreview.file3} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput3} style={{display:'none'}}  id='photo3' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
  setreview({...myreview,file3: URL.createObjectURL(event.target.files[0])});  formik.setFieldValue('photo3',event.target.files[0]);  formik.setFieldValue('input3',true)}}/> 
        
        </Grid>

        </Grid>

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
          rows={3}
          id="review"
          name="review"
          label="WriteReview"
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
          rows={3}
          id="seller_review"
          name="seller_review"
          label="seller_review"
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
      </Grid>
    </div>
  );
}



const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(ReviewForm)
