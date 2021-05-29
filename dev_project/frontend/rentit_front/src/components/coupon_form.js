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
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateSelect from './dateselect'
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const validationSchema = yup.object({
  
  coupoun_code: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),

  off: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  life: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),

  min_price: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),

  
  
  
  coupon_type: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),

 
   

    
});


  const useStyles = makeStyles((theme) => ({
    
  
 
    // necessary for content to be below app bar
    myclass: {
     
      [theme.breakpoints.up('md')]: {
        padding:'1%',
      },
     
  },
  bgclass: {
    backgroundColor:`${process.env.REACT_APP_BG_COLOR}`,
    height:'100vh',
  
    

 
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
    textclass1:{
        float: 'left',
    },
    papernewclass:{
      padding:20,
      [theme.breakpoints.up('sm')]: {
        padding:50,
      },
      [theme.breakpoints.up('lg')]: {
        padding:50,
        minWidth:600,
      },
     
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
     
    },
  }));

function CouponForm (props){
    const classes = useStyles();
    var date = new Date(Date.now())

    var x;
    var y;
    if(parseInt(date.getMonth()+1)<10)
    {
      x = `0${date.getMonth()+1}`;
    }
    if(parseInt(date.getMonth()+1)>=10)
    {
      x = `${date.getMonth()+1}`;
    }
    if(parseInt(date.getDate())<10)
    {
      y = `0${date.getDate()}`;
    }
    if(parseInt(date.getDate())>=10)
    {
      y = `${date.getDate()}`;
    }
   

    const [mycoupon,setcoupon] = useState({
      coupoun_code:'',
      coupon_type:'',
      valid_from: `${date.getFullYear()}-${x}-${y}`,
      life:1,
      coupoun_rooms:[],
      coupoun_shops:[],
      coupoun_apartments:[],    
      off:0,
      min_price:0,
      max_off_price:'',
    })

    const [edit,setedit] = useState(false)
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const couponid = props.location.state.property_id;
    const [myrooms,setrooms] =useState([])
    const [myshops,setshops] =useState([])
    const [myapartments,setapartments] =useState([])
    const [loading1,setloading1] = useState(false)
    const [newredirect,setnewredirect] = React.useState(false);

    React.useEffect(() => {
      if(props.profile)
      {
        if(props.profile)
        {
          if(!props.profile.profile_completed || !props.profile.bank_completed || !props.profile.address_completed)
          {
            setnewredirect(true);
          }
        }
      }
    },[props.profile])

   

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
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcesfnsjfn231/mycoupons/${couponid}/`,config);
               
                setcoupon({
                    coupoun_code:res.data.coupoun_code,
                    coupon_type:res.data.coupon_type,
                    valid_from: res.data.valid_from,
                    life:res.data.life,
                    coupoun_rooms:res.data.coupoun_rooms,
                    coupoun_shops:res.data.coupoun_shops,
                    coupoun_apartments:res.data.coupoun_apartments,    
                    off:res.data.off,
                    min_price:res.data.min_price,
                    max_off_price:res.data.max_off_price,
                })
                setedit(true);
        
                
              
              }
                catch{

                    
      
                }

            
              
                
                 
                  try{const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcewdsfdaegds/my_rooms/`,config);
                
                  setrooms(res1.data)
                 
                
                }
                  catch{
        
                  }

                  try{const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcekfhkt274fs/my_shops/`,config);
              
                  setshops(res2.data)
                 
                
                }
                  catch{
        
                  }
                  try{const res3 = await axios.get(`${process.env.REACT_APP_API_URL}/sourceddnvslf54d/my_apartments/`,config);
              
                  setapartments(res3.data)
                
                
                }
                  catch{
        
                  }
        }
    }
    
    ,[couponid])


  

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
        coupoun_code:mycoupon.coupoun_code,
        coupon_type:mycoupon.coupon_type,
        valid_from: mycoupon.valid_from,
        life:mycoupon.life,
        coupoun_rooms:mycoupon.coupoun_rooms,
        coupoun_shops:mycoupon.coupoun_shops,
        coupoun_apartments:mycoupon.coupoun_apartments,    
        off:mycoupon.off,
        min_price:mycoupon.min_price,
        max_off_price:mycoupon.max_off_price,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setloading1(true)      
      const config = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      const body = {
          data:values
      }

      
      if(edit===false)
      {
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcesfnsjfn231/mycoupons/`,body,config);
        setloading1(false)        
        setredirect(true)
        
              }
                catch{
                  setloading1(false)  
                 seterror(true);
                
                  
                }
      }
     
    },
  });


  

  if(props.isAuthenticated===false)
    {
      return <Redirect to="/login" />;
    }

    if(newredirect==true)
{
  return <Redirect to={{
    pathname: '/dashboard/profile',
    state: { property_id: true }
  }}/>
}

  if(redirect==true)
  {
    return <Redirect to='/dashboard/my_coupons' />
  }
  if(error===true)
  {

      return <div className={classes.erorclass}><Eror error={'Cannot update coupon details'}/></div>
  }

  const handleChange = (e,roomid,boolean) => {
      
     
      if(boolean)
      {
          /* formik.setFieldValue('coupoun_rooms',formik.values.coupoun_rooms.splice(formik.values.coupoun_rooms.indexOf(roomid)-1,1)) */
      }
      else{
        formik.setFieldValue('coupoun_rooms',formik.values.coupoun_rooms.concat(roomid))
      }
  }

  const handleChange1 = async (e,shopid,boolean) => {
    
    
    if(boolean)
    {
       /*  await formik.setFieldValue('coupoun_shops',formik.values.coupoun_shops.splice(formik.values.coupoun_shops.indexOf(shopid),1)) */
    }
    else{
      await formik.setFieldValue('coupoun_shops',formik.values.coupoun_shops.concat(shopid))
    }
    
}
const handleChange2 = (e,apartmentid,boolean) => {
    
   
    if(boolean)
    {
        /* formik.setFieldValue('coupoun_apartments',formik.values.coupoun_apartments.splice(formik.values.coupoun_apartments.indexOf(apartmentid)-1,1)) */
    }
    else{
      formik.setFieldValue('coupoun_apartments',formik.values.coupoun_apartments.concat(apartmentid))
    }
}


  return (
    <div className="formbgclass">
    
    <div className={classes.myclass}>

<Backdrop className={classes.backdrop} open={loading1}>
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
        
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="coupoun_code"
          name="coupoun_code"
          label="Coupoun Code"
          value={formik.values.coupoun_code}
          onChange={formik.handleChange}
          error={formik.touched.coupoun_code && Boolean(formik.errors.coupoun_code)}
          helperText={formik.touched.coupoun_code && formik.errors.coupoun_code}
        />
       
        <br />
        
        
         
        <FormControl className={classes.form}>
        
            <InputLabel id="coupon_type">Coupon type</InputLabel>
            <Select
            labelId="coupon_type"
            id="coupon_type"
            value={formik.values.coupon_type}
            onChange={(e) => {formik.setFieldValue('coupon_type',e.target.value);
            }}
            error={formik.touched.coupon_type && Boolean(formik.errors.coupon_type)}
            helperText={formik.touched.coupon_type && formik.errors.coupon_type}
            >
            <MenuItem value={'discount'}>% Discount</MenuItem>
            <MenuItem value={'off_price'}>Reduce some money</MenuItem>
            </Select>
        </FormControl>
        <br />
      
   

        
        <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Discount Amount 
        </Typography>
      
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={1}
          id="off"
          name="off"
          label="Off"
          value={formik.values.off}
          onChange={(e) => {formik.setFieldValue('off',e.target.value); 
          }}
          error={formik.touched.off && Boolean(formik.errors.off)}
          helperText={formik.touched.off && formik.errors.off}
        />
       </>

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Min price for discount to be applied
        </Typography>
    
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={1}
          id="min_price"
          name="min_price"
          label="Min price to be applied on"
          value={formik.values.min_price}
          onChange={(e) => {formik.setFieldValue('min_price',e.target.value); 
          }}
          error={formik.touched.min_price && Boolean(formik.errors.min_price)}
          helperText={formik.touched.min_price && formik.errors.min_price}
        />
       </>

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Valid from
        </Typography>
      
       
      <DateSelect value={formik.values.valid_from} setvalue={formik.setFieldValue} name={'valid_from'} />
 </>

  

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Max. discount amount
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="max_off_price"
          name="max_off_price"
          label="Max discount price(if Any)"
          value={formik.values.max_off_price}
          onChange={(e) => {formik.setFieldValue('max_off_price',e.target.value); 
          }}
         
        />
       </>

        <br />



        <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      life (no. of days)
        </Typography>
     
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={1}
          id="life"
          name="life"
          label="Expiry after"
          value={formik.values.life}
          onChange={(e) => {formik.setFieldValue('life',e.target.value); 
          }}
          error={formik.touched.life && Boolean(formik.errors.life)}
          helperText={formik.touched.life && formik.errors.life}
        />
      </>
<br />
  
        <Typography variant="h6" color="textSecondary" >
      Rooms
        </Typography>
       
          {
              edit===false && myrooms.map((room) => (
                  <div>
                      <Checkbox
        checked={formik.values.coupoun_rooms.includes(room.room_id)}
        
        inputProps={{ 'aria-label': 'primary checkbox' } } className={classes.textclass1}
        onChange={e => handleChange(e,room.room_id,formik.values.coupoun_rooms.includes(room.room_id))}
      />
     <Typography variant="body1" color="textSecondary" >
      {room.title}
        </Typography>

                  </div>
              ))
          }

          <br />
         
          <Typography variant="h6" color="textSecondary" >
      Shops
        </Typography>
       
        <br />

{
              edit===false && myshops.map((shop) => (
                  <div>
                      <Checkbox
        checked={formik.values.coupoun_shops.indexOf(shop.shop_id)!==-1}
        
        inputProps={{ 'aria-label': 'primary checkbox' } } className={classes.textclass1}
        onChange={e => handleChange1(e,shop.shop_id,formik.values.coupoun_shops.indexOf(shop.shop_id)!==-1)}
      />
     <Typography variant="body1" color="textSecondary" >
      {shop.title}
        </Typography>

        <br /></div>
              ))
          }


          <Typography variant="h6" color="textSecondary" >
      Apartment
        </Typography>
      
        <br />

{
             edit===false && myapartments.map((apartment) => (
                  <div>
                      <Checkbox
        checked={formik.values.coupoun_apartments.includes(apartment.apartment_id)}
        
        inputProps={{ 'aria-label': 'primary checkbox' } } className={classes.textclass1}
        onChange={e => handleChange2(e,apartment.apartment_id,formik.values.coupoun_apartments.includes(apartment.apartment_id))}
      />
     <Typography variant="body1" color="textSecondary" >
      {apartment.title}
        </Typography>

        <br /></div>
              ))
          }


          
 
        <br />

        {
          edit ? null : <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
        }
        
        
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

export default connect(mapStateToProps)(CouponForm)
