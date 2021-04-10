import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Eror from './eror'
import MapForm from './map_form'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Rules from './roomrules';
import './css/App.css';
axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;


const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png"
];


const SUPPORTED_FORMATS1 = [
  "application/pdf"
];

const validationSchema = yup.object({


  title: yup
  .string('Enter your Room name')
  .required('Room name is required'),

  gender: yup
  .string('Enter your Room name')
  .required('Room name is required'),
  
  wifi: yup
  .boolean()
  .required('You must answer this '),
  
  cost_wifi: yup
  .number().integer('please enter integer'),
  
  
  removable_wifi: yup
  .boolean()
  .required('You must answer this '),

  TV: yup
  .boolean()
  .required('You must answer this '),
  
  cost_TV: yup
  .number().integer('please enter integer'),
  
  
  removable_TV: yup
  .boolean()
  .required('You must answer this '),
  
  cooler: yup
  .boolean()
  .required('You must answer this '),
  
  cost_cooler: yup
  .number().integer('please enter integer'),
  
  
  removable_cooler: yup
  .boolean()
  .required('You must answer this '),
  
 
  
  purified_water: yup
  .boolean()
  .required('You must answer this '),
  
  cost_purified_water: yup
  .number().integer('please enter integer'),
  
  
  removable_purified_water: yup
  .boolean()
  .required('You must answer this '),

  AC: yup
  .boolean()
  .required('You must answer this '),

  cost_AC: yup
  .number().integer('please enter integer'),
  
  
  
  shop_cleaning: yup
  .boolean()
  .required('You must answer this '),
  
  cost_cleaning: yup
  .number().integer('please enter integer'),

  
  windows: yup
  .number().integer('please enter integer'),
  
  floor_no: yup
  .number().integer('please enter integer'),
  
  cost_electricity: yup
  .number().integer('please enter integer'),
  
  
  cost_water: yup
  .number().integer('please enter integer'),
  
  
 
  
  city: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  state: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  country: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  separate_washroom: yup
  .boolean()
  .required('You must answer this '),
  
  location: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  landmark: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  pincode: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  length: yup
  .number().integer('please enter integer'),
  
  
  breadth: yup
  .number().integer('please enter integer'),
  
  
  
  height: yup
  .number().integer('please enter integer'),

  washroom: yup
  .number().integer('please enter integer'),

  total_rooms: yup
  .number().integer('please enter integer'),

  total_floors: yup
  .number().integer('please enter integer'),
  
  
  fans: yup
  .number().integer('please enter integer'),
  
  
  description: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  furniture: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  building_guard: yup
  .boolean()
  .required('You must answer this '),
  
  cctv_building: yup
  .boolean()
  .required('You must answer this '),
  
  power_backup: yup
  .boolean()
  .required('You must answer this '),
  

  seller_price: yup
  .number().integer('please enter integer'),
  
  
  owner_discount: yup
  .number().integer('please enter integer'),
  
  longitude: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  latitude: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  balcony: yup
  .number().integer('please enter integer'),
  
  distance1: yup
  .number().required('please enter this'),
  
  distance2: yup
  .number().required('please enter this'),
  
  nearby_station1: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  nearby_station2: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
 
    
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
buttonclass:{
padding:0,
borderRadius:'70%',

},

form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
 
},
papernewclass:{
  padding:6,
  [theme.breakpoints.up('sm')]: {
    padding:30,
  },
 
},
nowclass1:{
  width: 'inherit'
}
  }));

function ShopForm (props){
  const theme = useTheme();
    const classes = useStyles();
    const hiddenFileInput1 = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const hiddenFileInput3 = React.useRef(null);
    const hiddenFileInput4 = React.useRef(null);
    const hiddenFileInput5 = React.useRef(null);

    const [openmodal, setopenmodal] = React.useState(true);

    const handleOpenmodal = () => {
      setopenmodal(true);
    };

    const closemodal = () => {
      setopenmodal(false);
    };

    const [newredirect,setnewredirect] = React.useState(false);
    const [myroom,setroom] = useState({
      wifi:'',
      cost_wifi:'',
      removable_wifi:false,

      TV:'',
      cost_TV:'',
      removable_TV:false,

      gender:'Both Male and Female',

      cooler:'',
      cost_cooler:'',
      removable_cooler:false,

      AC:'',
      cost_AC:'',

      purified_water:'',
      cost_purified_water:'',
      removable_purified_water:false,

      cost_electricity:'',
      cost_water:'',

      shop_cleaning:'',
      cost_cleaning:'',

   
      separate_washroom:'',
      title:'',
      seller_price:'',
      owner_discount:0,
     
      length:'',
      breadth:'',
      height:'',
      building_guard:'',
      category:'',
      cctv_building:'',
      balcony:0,
      total_rooms:1,
      total_floors:1,
      washroom:1,
      windows:0,
      power_backup:'',
      furniture:'',
      facility:'',
      description:'',
      fans:1,
      floor_no:0,

      city:'',
      state:'',
      country:'',
      landmark:'',
      longitude:'',
      latitude:'',
      location:'',
      pincode:'',

      nearby_station1:'',
      nearby_station2:'',
      distance1:0,
      distance2:0,

      shop_policy:'',

      address_proof:'',

      photo1:'',
      photo2:'',
      photo3:'',
      photo4:'',
      photo5:'',
      file1:"/addroom.png",
      file2:"/addroom.png",
      file3:"/addroom.png",
      file4:"/addroom.png",
      file5:"/addroom.png",
    })

    const [edit,setedit] = useState(false)
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const roomid = props.location.state.property_id;
    const [load,setload] = useState(false)
   

    useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.profile && roomid)
              {
                if(props.profile.is_seller && props.profile.profile_completed && props.profile.bank_completed && props.profile.address_completed){
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcekfhkt274fs/my_shops/${roomid}/`,config);
                
                setroom({
                  wifi:res.data.wifi,
                  cost_wifi:res.data.cost_wifi,
                  removable_wifi:res.data.removable_wifi,

                  TV:res.data.TV,
                  cost_TV:res.data.cost_TV,
                  removable_TV:res.data.removable_TV,

                  cooler:res.data.cooler,
                  cost_cooler:res.data.cost_cooler,
                  removable_cooler:res.data.removable_cooler,

                  gender:res.data.gender,

                 

                  purified_water:res.data.purified_water,
                  cost_purified_water:res.data.cost_purified_water,
                  removable_purified_water:res.data.removable_purified_water,

                 

                  cost_electricity:res.data.cost_electricity,
                  cost_water:res.data.cost_water,

                  shop_cleaning:res.data.shop_cleaning,
                  cost_cleaning:res.data.cost_cleaning,

                  balcony:res.data.balcony,
                  separate_washroom:res.data.separate_washroom,
                  washroom:res.data.washroom,
                  total_rooms:res.data.total_rooms,
                  total_floors:res.data.total_floors,
                  title:res.data.title,
                  seller_price:res.data.seller_price,
                  owner_discount:res.data.owner_discount,
                 
                  length:res.data.length,
                  breadth:res.data.breadth,
                  height:res.data.height,
                  building_guard:res.data.building_guard,
                  category:res.data.category,
                  cctv_building:res.data.cctv_building,
                  windows:res.data.windows,
                  power_backup:res.data.power_backup,
                  furniture:res.data.furniture,
                  facility:res.data.facility,
                  description:res.data.description,
                  fans:res.data.fans,
                  floor_no:res.data.floor_no,

                  AC:res.data.AC,
                  cost_AC:res.data.cost_AC,

                  city:res.data.city,
                  state:res.data.state,
                  country:res.data.country,
                  landmark:res.data.landmark,
                  longitude:res.data.longitude,
                  latitude:res.data.latitude,
                  location:res.data.location,
                  pincode:res.data.pincode,

                  nearby_station1:res.data.nearby_station1,
                  nearby_station2:res.data.nearby_station2,
                  distance1:res.data.distance1,
                  distance2:res.data.distance2,

                  shop_policy:res.data.shop_policy,

                  address_proof:res.data.address_proof,

                  photo1:res.data.photo1,
                  photo2:res.data.photo2,
                  photo3:res.data.photo3,
                  photo4:res.data.photo4,
                  photo5:res.data.photo5,

                  file1:res.data.photo1,
                  file2:res.data.photo2,
                  file3:res.data.photo3,
                  file4:res.data.photo4,
                  file5:res.data.photo5,
                })
                setedit(true);
                
              
              }
                catch{
      
                }
              }
              else{
                setnewredirect(true);
              }
        }
    }
    
    ,[props.profile,roomid])

    

  

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      edit:edit,
      
      wifi:myroom.wifi,
      cost_wifi:myroom.cost_wifi,
      removable_wifi:myroom.removable_wifi,

      TV:myroom.TV,
      cost_TV:myroom.cost_TV,
      removable_TV:myroom.removable_TV,

      cooler:myroom.cooler,
      cost_cooler:myroom.cost_cooler,
      removable_cooler:myroom.removable_cooler,

      purified_water:myroom.purified_water,
      cost_purified_water:myroom.cost_purified_water,
      removable_purified_water:myroom.removable_purified_water,

    

      cost_electricity:myroom.cost_electricity,
      cost_water:myroom.cost_water,

      gender:myroom.gender,

      shop_cleaning:myroom.shop_cleaning,
      cost_cleaning:myroom.cost_cleaning,

      AC:myroom.AC,
      cost_AC:myroom.cost_AC,

     
      balcony:myroom.balcony,
      separate_washroom:myroom.separate_washroom,
      washroom:myroom.washroom,
      total_rooms:myroom.total_rooms,
      total_floors:myroom.total_floors,
      title:myroom.title,
      seller_price:myroom.seller_price,
      owner_discount:myroom.owner_discount,
    
      length:myroom.length,
      breadth:myroom.breadth,
      height:myroom.height,
      building_guard:myroom.building_guard,
      category:myroom.category,
      cctv_building:myroom.cctv_building,
      windows:myroom.windows,
      power_backup:myroom.power_backup,
      furniture:myroom.furniture,
      facility:myroom.facility,
      description:myroom.description,
      fans:myroom.fans,
      floor_no:myroom.floor_no,

      city:myroom.city,
      state:myroom.state,
      country:myroom.country,
      landmark:myroom.landmark,
      longitude:myroom.longitude,
      latitude:myroom.latitude,
      location:myroom.location,
      pincode:myroom.pincode,

      nearby_station1:myroom.nearby_station1,
      nearby_station2:myroom.nearby_station2,
      distance1:myroom.distance1,
      distance2:myroom.distance2,

      shop_policy:myroom.room_policy,

      

      
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let form_data = new FormData();
     
      setload(true)
      form_data.append('title',values.title)
      form_data.append('wifi',values.wifi)
      form_data.append('cost_wifi',values.cost_wifi)
      form_data.append('removable_wifi',values.removable_wifi)

      form_data.append('cooler',values.cooler)
      form_data.append('cost_cooler',values.cost_cooler)
      form_data.append('removable_cooler',values.removable_cooler)

      form_data.append('TV',values.TV)
      form_data.append('cost_TV',values.cost_TV)
      form_data.append('removable_TV',values.removable_TV)

      form_data.append('AC',values.AC)
      form_data.append('cost_AC',values.cost_AC)

      form_data.append('purified_water',values.purified_water)
      form_data.append('cost_purified_water',values.cost_purified_water)
      form_data.append('removable_purified_water',values.removable_purified_water)

      form_data.append('shop_cleaning',values.room_cleaning)
      form_data.append('cost_cleaning',values.cost_cleaning)

      form_data.append('cost_electricity',values.cost_electricity)

      form_data.append('cost_water',values.cost_water)

      form_data.append('location',values.location)
      form_data.append('gender',values.gender)

      form_data.append('city',values.city)
      form_data.append('state',values.state)
      form_data.append('country',values.country)
      form_data.append('landmark',values.landmark)
      form_data.append('pincode',values.pincode)
      form_data.append('longitude',values.longitude)
      form_data.append('latitude',values.latitude)

      form_data.append('nearby_station1',values.nearby_station1)
      form_data.append('nearby_station2',values.nearby_station2)
      form_data.append('distance1',values.distance1)
      form_data.append('distance2',values.distance2)

      form_data.append('photo1',values.photo1)
      form_data.append('photo2',values.photo2)
      form_data.append('photo3',values.photo3)
      form_data.append('photo4',values.photo4)
      form_data.append('photo5',values.photo5)

      form_data.append('address_proof',values.address_proof)

 
      form_data.append('windows',values.windows)
      form_data.append('washroom',values.washroom)
      form_data.append('total_rooms',values.total_rooms)
      form_data.append('total_floors',values.total_floors)
      form_data.append('fans',values.fans)
      form_data.append('floor_no',values.floor_no)
      form_data.append('balcony',values.balcony)
      form_data.append('separate_washroom',values.separate_washroom)
      form_data.append('cctv_building',values.cctv_building)
      form_data.append('building_guard',values.building_guard)
      form_data.append('owner_discount',values.owner_discount)
      form_data.append('seller_price',values.seller_price)
      form_data.append('power_backup',values.power_backup)
      form_data.append('length',values.length)
      form_data.append('furniture',values.furniture)
      form_data.append('description',values.description)
      form_data.append('category',values.category)

      form_data.append('breadth',values.breadth)

      form_data.append('height',values.height)

      

      if(values.shop_policy!='')
      {
        form_data.append('shop_policy',values.shop_policy)
      }
      else{
        form_data.append('shop_policy','None')
      }

     

      if(values.facility!='')
      {
        form_data.append('facility',values.facility)
      }
      else{
        form_data.append('facility','None')
      }







   
      
      console.log(form_data.entries())
      const config = {
        headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      
      if(edit===true)
      {
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcekfhkt274fs/my_shops/${roomid}/`,form_data,config);
            setload(false)  
          setredirect(true)
              
              }
                catch{
                  setload(false)  
                  console.log('error')
                  seterror(true)
                 
                }
      }
      else{
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcekfhkt274fs/my_shops/`,form_data,config);
        setload(false)  
        setredirect(true)

              }
                catch{
                  setload(false)  
                  console.log('error')
                  seterror(true)
                 
                }
      }
    },
  });

  const handleclick1 = (name,value,setvalue) => {
    
    setvalue(name,value+1)
}
const handleclick2 = (name,value,setvalue) => {
  if(value>0){setvalue(name,value-1)}
  
}

useEffect(
  () => {
    if(formik.values.length!==formik.values.length){formik.setFieldValue('length',0);}
    
  
  }
,[formik.values.length])

useEffect(
  () => {
    if(formik.values.breadth!==formik.values.breadth){formik.setFieldValue('breadth',0);}
    
  
  }
,[formik.values.breadth])

useEffect(
  () => {
    if(formik.values.height!==formik.values.height){formik.setFieldValue('height',0);}
    
  
  }
,[formik.values.height])

useEffect(
  () => {
    
    if(formik.values.owner_discount!==formik.values.owner_discount){formik.setFieldValue('owner_discount',0);}
    
  
  }
,[formik.values.owner_discount])

useEffect(
  () => {
    
    if(formik.values.seller_price!==formik.values.seller_price){formik.setFieldValue('seller_price',0);}
    
  
  }
,[formik.values.seller_price])

useEffect(
  () => {
    
    if(formik.values.cost_wifi!==formik.values.cost_wifi){formik.setFieldValue('cost_wifi',0);}
    
  
  }
,[formik.values.cost_wifi])






useEffect(
  () => {
    

    if(formik.values.cost_purified_water!==formik.values.cost_purified_water){formik.setFieldValue('cost_purified_water',0);}

    
  
  }
,[formik.values.cost_purified_water])


useEffect(
  () => {
    
    
    if(formik.values.cost_electricity!==formik.values.cost_electricity){formik.setFieldValue('cost_electricity',0);}
    if(formik.values.cost_water!==formik.values.cost_water){formik.setFieldValue('cost_water',0);}
    if(formik.values.cost_AC!==formik.values.cost_AC){formik.setFieldValue('cost_AC',0);}
    if(formik.values.cost_TV!==formik.values.cost_TV){formik.setFieldValue('cost_TV',0);}
    if(formik.values.cost_cooler!==formik.values.cost_cooler){formik.setFieldValue('cost_cooler',0);}
  
  }
,[formik.values.cost_electricity,formik.values.cost_water,formik.values.cost_AC,formik.values.cost_TV,formik.values.cooler])


useEffect(
  () => {
    
    if(formik.values.distance1!==formik.values.distance1){formik.setFieldValue('distance1',0);}
    if(formik.values.distance2!==formik.values.distance2){formik.setFieldValue('distance2',0);}
    
    if(formik.values.cost_cleaning!==formik.values.cost_cleaning){formik.setFieldValue('cost_cleaning',0);}
  
  }
,[formik.values.distance1,formik.values.distance2,formik.values.cost_cleaning])


const Filevalidation = (file1) => {
  
 
  // Check if any file is selected.
  
     

          const fsize =file1.size;
          const file = Math.round((fsize / 1024));
          // The size of the file.
          if (file >= 2048) {
              alert(
                "File too Big, please select a file less than 4mb");
          } 
          else{
            
            formik.setFieldValue('address_proof',file1);
            document.getElementById("proof").innerHTML = '<b>'
                    + file1.name + '</b> KB UPLOADED';
          }
      
  
}


const Filevalidation4 = (file1,name) => {
  
 
  // Check if any file is selected.
  
     

          const fsize =file1.size;
          const file = Math.round((fsize / 1024));
          // The size of the file.
          if (file >= 5120) {
              alert(
                "File too Big, please select a file less than 5mb");
          } 
          else{
            
            formik.setFieldValue('photo4',file1);
            setroom({...myroom,file4: URL.createObjectURL(file1),photo4:file1});
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
            
            formik.setFieldValue('photo3',file1);
            setroom({...myroom,file3: URL.createObjectURL(file1),photo3:file1});
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
            
            formik.setFieldValue('photo2',file1);
            setroom({...myroom,file2: URL.createObjectURL(file1),photo2:file1});
          }
      
  
}

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
            
            formik.setFieldValue('photo1',file1);
            setroom({...myroom,file1: URL.createObjectURL(file1),photo1:file1});
          }
      
  
}

const Filevalidation5 = (file1,name) => {
  
 
  // Check if any file is selected.
  
     

          const fsize =file1.size;
          const file = Math.round((fsize / 1024));
          // The size of the file.
          if (file >= 5120) {
              alert(
                "File too Big, please select a file less than 5mb");
          } 
          else{
            
            formik.setFieldValue('photo5',file1);
            setroom({...myroom,file5: URL.createObjectURL(file1),photo5:file1});
          }
      
  
}



if(newredirect==true)
{
  return <Redirect to='/dashboard/profile' />
}



  if(redirect==true)
  {
    return <Redirect to='/dashboard/my_shops' />
  }
  if(error===true)
  {
    return <div className={classes.erorclass}><Eror error={'Cannot process request!'} /></div>;
  }

  return (

    <div className="formbgclass">
    <div className={classes.myclass}>

    <Rules open={openmodal} handleopen={handleOpenmodal} handleclose={closemodal} />

      <Backdrop className={classes.backdrop} open={load}>
        <CircularProgress color="inherit" />
      </Backdrop>
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <Grid item lg={5} md={6}>
           
           <Paper elevation={5} className={classes.papernewclass}>
           <div id="mapcontainer1">
       <form onSubmit={formik.handleSubmit} className={classes.nowclass} >
         <br />
       <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={classes.nowclass1}
      >
       

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput1.current.click();}}>
          <img src={myroom.file1} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput1} style={{display:'none'}}  id='photo1' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
          Filevalidation1(event.target.files[0]);}}
 /> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput2.current.click();}}>
          <img src={myroom.file2} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput2} style={{display:'none'}}  id='photo2' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
  Filevalidation2(event.target.files[0]);}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput3.current.click();}}>
          <img src={myroom.file3} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput3} style={{display:'none'}}  id='photo3' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
  Filevalidation3(event.target.files[0]);}}/> 
        
        </Grid>


       

        


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

          <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput4.current.click();}}>
            <img src={myroom.file4} className={classes.imageclass}/>
            </Button>

          <input type='file'  ref={hiddenFileInput4} style={{display:'none'}}  id='photo4' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
          Filevalidation4(event.target.files[0]);}}/> 

          </Grid>

          <Grid item className={classes.imageclass}>

          <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput5.current.click();}}>
            <img src={myroom.file5} className={classes.imageclass}/>
            </Button>

          <input type='file'  ref={hiddenFileInput5} style={{display:'none'}}  id='photo5' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {
          Filevalidation5(event.target.files[0]);}}/> 

          </Grid>
      </Grid>

        <br />
        <br />


      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >


      <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="title"
          name="title"
          label="Room name"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        </div>
        
        <br />

        

      
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of windows in the shop
          </Typography>
       
          <div>   
            <Button onClick={() => handleclick1('windows',formik.values.windows,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.windows}

            <Button  onClick={() => handleclick2('windows',formik.values.windows,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
      

    <br />

 
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of washrooms in the shop
          </Typography>
       
          <div>   
            <Button onClick={() => handleclick1('washroom',formik.values.washroom,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.washroom}

            <Button  onClick={() => handleclick2('washroom',formik.values.washroom,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
  

    <br />

   
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of rooms in the shop
          </Typography>
      
          <div>   
            <Button onClick={() => handleclick1('total_rooms',formik.values.total_rooms,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_rooms}

            <Button  onClick={() => handleclick2('total_rooms',formik.values.total_rooms,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
   

    <br />

    <Typography variant="body1" color="textSecondary" className={classes.textclass}>
        Who you want this shop to rent?
      </Typography>
   
    <FormControl className={classes.form}>
    
        <InputLabel id="gender">Gender</InputLabel>
        <Select
        labelId="gender"
        id="gender"
        value={formik.values.gender}
        onChange={(e) => formik.setFieldValue('gender',e.target.value)}
        error={formik.touched.gender && Boolean(formik.errors.gender)}
        helperText={formik.touched.gender && formik.errors.gender}
        >
        <MenuItem value={'Male'}>Male</MenuItem>
        <MenuItem value={'Female'}>Female</MenuItem>
        <MenuItem value={'Both Male and Female'}>Both Male and Female</MenuItem>
        <MenuItem value={'Any'}>Any</MenuItem>
        
        </Select>
    </FormControl>
 

    <br />

    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of floors in the shop
          </Typography>
       
          <div>   
            <Button onClick={() => handleclick1('total_floors',formik.values.total_floors,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_floors}

            <Button  onClick={() => handleclick2('total_floors',formik.values.total_floors,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
     
    <br />

    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of balconys in the room
          </Typography>
       
          <div>   
            <Button onClick={() => handleclick1('balcony',formik.values.balcony,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.balcony}

            <Button  onClick={() => handleclick2('balcony',formik.values.balcony,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
    

    <br />


   
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of fans in the room
          </Typography>
      
          <div>   
            <Button onClick={() => handleclick1('fans',formik.values.fans,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.fans}

            <Button  onClick={() => handleclick2('fans',formik.values.fans,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
    
          
          <br />

   
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Floor no. of room
          </Typography>
     
          <div>   
            <Button onClick={() => handleclick1('floor_no',formik.values.floor_no,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.floor_no}

            <Button  onClick={() => handleclick2('floor_no',formik.values.floor_no,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
     
    <br />

   

   

    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Length of the room
        </Typography>
     <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="length"
          name="length"
          label="length"
          value={formik.values.length}
          onChange={(e) => {formik.setFieldValue('length',parseInt(e.target.value)); 
          }}
          error={formik.touched.length && Boolean(formik.errors.length)}
          helperText={formik.touched.length && formik.errors.length}
        /></div>
       </>

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Breadth of the room
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="breadth"
          name="breadth"
          label="breadth"
          value={formik.values.breadth}
          onChange={(e) => {formik.setFieldValue('breadth',parseInt(e.target.value)); 
          }}
          error={formik.touched.breadth && Boolean(formik.errors.breadth)}
          helperText={formik.touched.breadth && formik.errors.breadth}
        />
      </>

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Height of the room
        </Typography>
      
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="height"
          name="height"
          label="height"
          value={formik.values.height}
          onChange={(e) => {formik.setFieldValue('height',parseInt(e.target.value)); 
          }}
          error={formik.touched.height && Boolean(formik.errors.height)}
          helperText={formik.touched.height && formik.errors.height}
        />
       </>

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Furniture in the room
        </Typography>
      
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={4}
          id="furniture"
          name="furniture"
          label="furniture"
          value={formik.values.furniture}
          onChange={formik.handleChange}
          error={formik.touched.furniture && Boolean(formik.errors.furniture)}
          helperText={formik.touched.furniture && formik.errors.furniture}
        />
        </>

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Description of the room
        </Typography>
      
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={4}
          id="description"
          name="description"
          label="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
       </>




            <br />
            
            <Typography variant="h4" color="textPrimary">
              Facilities
            </Typography>
           
            <br />

            
            <Typography variant="h6" color="textPrimary">
              Electricity charge
            </Typography>
           

<><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of electricity facility(if not any, enter 0)
        </Typography>
     
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         
         fullWidth
          rows={1}
          id="cost_electricity"
          name="cost_electricity"
          label="Cost of electricity facility"
          value={formik.values.cost_electricity}
          onChange={(e) => {formik.setFieldValue('cost_electricity',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_electricity && Boolean(formik.errors.cost_electricity)}
          helperText={formik.touched.cost_electricity && formik.errors.cost_electricity}
        />
       </>

  <br />

 
            <Typography variant="h6" color="textPrimary">
              Water charge
            </Typography>
           

<><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of Water facility(if not any, enter 0)
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="cost_water"
          name="cost_water"
          label="Cost of water facility"
          value={formik.values.cost_water}
          onChange={(e) => {formik.setFieldValue('cost_water',parseInt(e.target.value)); 
        }}
          error={formik.touched.cost_water && Boolean(formik.errors.cost_water)}
          helperText={formik.touched.cost_water && formik.errors.cost_water}
        />
       </>

  <br />


           
            <Typography variant="h6" color="textPrimary">
              WIFI
            </Typography>
           
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have WIFI ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="wifi">WIFI</InputLabel>
            <Select
            labelId="wifi"
            id="wifi"
            value={formik.values.wifi}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('wifi',e.target.value);
            formik.setFieldValue('cost_wifi',0);
            formik.setFieldValue('removable_wifi',false);}
            else{formik.setFieldValue('wifi',e.target.value)}}}
            error={formik.touched.wifi && Boolean(formik.errors.wifi)}
            helperText={formik.touched.wifi && formik.errors.wifi}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      

    


    {
      formik.values.wifi ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of wifi facility(if not enter 0)
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="cost_wifi"
          name="cost_wifi"
          label="Cost of wifi facility"
          value={formik.values.cost_wifi}
          onChange={(e) => {formik.setFieldValue('cost_wifi',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_wifi && Boolean(formik.errors.cost_wifi)}
          helperText={formik.touched.cost_wifi && formik.errors.cost_wifi}
        />
      </>
  : null
    }
    

{
      formik.values.wifi ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
     
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_wifi">Removable wifi facility?</InputLabel>
            <Select
            labelId="removable_wifi"
            id="removable_wifi"
            value={formik.values.removable_wifi}
            onChange={(e) => {
            formik.setFieldValue('removable_wifi',e.target.value)}}
            error={formik.touched.removable_wifi && Boolean(formik.errors.removable_wifi)}
            helperText={formik.touched.removable_wifi && formik.errors.removable_wifi}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
        </>
  : null
    }

<br />


            <Typography variant="h6" color="textPrimary">
              TV
            </Typography>
            
            <br />
    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have TV ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="TV">TV</InputLabel>
            <Select
            labelId="TV"
            id="TV"
            value={formik.values.TV}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('TV',e.target.value);
            formik.setFieldValue('cost_TV',0);
            formik.setFieldValue('removable_TV',false);}
            else{formik.setFieldValue('TV',e.target.value)}}}
            error={formik.touched.TV && Boolean(formik.errors.TV)}
            helperText={formik.touched.TV && formik.errors.TV}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      

    


    {
      formik.values.TV ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of TV facility(if not enter 0)
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="cost_TV"
          name="cost_TV"
          label="Cost of TV facility"
          value={formik.values.cost_TV}
          onChange={(e) => {formik.setFieldValue('cost_TV',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_TV && Boolean(formik.errors.cost_TV)}
          helperText={formik.touched.cost_TV && formik.errors.cost_TV}
        />
        </>
  : null
    }
    

{
      formik.values.TV ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
      
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_TV">Removable TV facility?</InputLabel>
            <Select
            labelId="removable_TV"
            id="removable_TV"
            value={formik.values.removable_TV}
            onChange={(e) => {
            formik.setFieldValue('removable_TV',e.target.value)}}
            error={formik.touched.removable_TV && Boolean(formik.errors.removable_TV)}
            helperText={formik.touched.removable_TV && formik.errors.removable_TV}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
       </>
  : null
    }

<br />

            <Typography variant="h6" color="textPrimary">
              cooler
            </Typography>
         
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have cooler ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="cooler">cooler</InputLabel>
            <Select
            labelId="cooler"
            id="cooler"
            value={formik.values.cooler}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('cooler',e.target.value);
            formik.setFieldValue('cost_cooler',0);
            formik.setFieldValue('removable_cooler',false);}
            else{formik.setFieldValue('cooler',e.target.value)}}}
            error={formik.touched.cooler && Boolean(formik.errors.cooler)}
            helperText={formik.touched.cooler && formik.errors.cooler}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.cooler ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of cooler facility(if not enter 0)
        </Typography>
    
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="cost_cooler"
          name="cost_cooler"
          label="Cost of cooler facility"
          value={formik.values.cost_cooler}
          onChange={(e) => {formik.setFieldValue('cost_cooler',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_cooler && Boolean(formik.errors.cost_cooler)}
          helperText={formik.touched.cost_cooler && formik.errors.cost_cooler}
        />
      </>
  : null
    }
    

{
      formik.values.cooler ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
    
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_cooler">Removable cooler facility?</InputLabel>
            <Select
            labelId="removable_cooler"
            id="removable_cooler"
            value={formik.values.removable_cooler}
            onChange={(e) => {
            formik.setFieldValue('removable_cooler',e.target.value)}}
            error={formik.touched.removable_cooler && Boolean(formik.errors.removable_cooler)}
            helperText={formik.touched.removable_cooler && formik.errors.removable_cooler}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
        </>
  : null
    }
    <br />


            <Typography variant="h6" color="textPrimary">
              AC
            </Typography>
            
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have AC ?
        </Typography>
        
        <FormControl className={classes.form}>
        
            <InputLabel id="AC">AC</InputLabel>
            <Select
            labelId="AC"
            id="AC"
            value={formik.values.AC}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('AC',e.target.value);
            formik.setFieldValue('cost_AC',0);
            }
            else{formik.setFieldValue('AC',e.target.value)}}}
            error={formik.touched.AC && Boolean(formik.errors.AC)}
            helperText={formik.touched.AC && formik.errors.AC}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.AC ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of AC facility(if not enter 0)
        </Typography>
      
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="cost_AC"
          name="cost_AC"
          label="Cost of AC facility"
          value={formik.values.cost_AC}
          onChange={(e) => {formik.setFieldValue('cost_AC',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_AC && Boolean(formik.errors.cost_AC)}
          helperText={formik.touched.cost_AC && formik.errors.cost_AC}
        />
       </>
  : null
    }


<br />


        
            <Typography variant="h6" color="textPrimary">
              Purified water
            </Typography>
           
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have purified water ?
        </Typography>
        
        <FormControl className={classes.form}>
        
            <InputLabel id="purified_water">purified water</InputLabel>
            <Select
            labelId="purified_water"
            id="purified_water"
            value={formik.values.purified_water}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('purified_water',e.target.value);
            formik.setFieldValue('cost_purified_water',0);
            formik.setFieldValue('removable_purified_water',false);}
            else{formik.setFieldValue('purified_water',e.target.value)}}}
            error={formik.touched.purified_water && Boolean(formik.errors.purified_water)}
            helperText={formik.touched.purified_water && formik.errors.purified_water}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.purified_water ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of purified water facility(if not enter 0)
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="cost_purified_water"
          name="cost_purified_water"
          label="Cost of purified water facility"
          value={formik.values.cost_purified_water}
          onChange={(e) => {formik.setFieldValue('cost_purified_water',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_purified_water && Boolean(formik.errors.cost_purified_water)}
          helperText={formik.touched.cost_purified_water && formik.errors.cost_purified_water}
        />
      </>
  : null
    }
    

{
      formik.values.purified_water ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
    
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_purified_water">Removable purified water facility?</InputLabel>
            <Select
            labelId="removable_purified_water"
            id="removable_purified_water"
            value={formik.values.removable_purified_water}
            onChange={(e) => {
            formik.setFieldValue('removable_purified_water',e.target.value)}}
            error={formik.touched.removable_purified_water && Boolean(formik.errors.removable_purified_water)}
            helperText={formik.touched.removable_purified_water && formik.errors.removable_purified_water}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
       </>
  : null
    }

<br />

       

            <Typography variant="h6" color="textPrimary">
               Shop cleaning
            </Typography>
          
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you provide Shop cleaning ?
        </Typography>
      
        <FormControl className={classes.form}>
        
            <InputLabel id="shop_cleaning">Shop cleaning</InputLabel>
            <Select
            labelId="shop_cleaning"
            id="shop_cleaning"
            value={formik.values.shop_cleaning}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('shop_cleaning',e.target.value);
            formik.setFieldValue('cost_cleaning',0);}
            else{formik.setFieldValue('shop_cleaning',e.target.value)}}}
            error={formik.touched.shop_cleaning && Boolean(formik.errors.shop_cleaning)}
            helperText={formik.touched.shop_cleaning && formik.errors.shop_cleaning}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.shop_cleaning ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of shop cleaning facility (in per cleaning)
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="cost_cleaning"
          name="cost_cleaning"
          label="Cost of cleaning facility"
          value={formik.values.cost_cleaning}
          onChange={(e) => {formik.setFieldValue('cost_cleaning',parseInt(e.target.value)); 
          }}
          onChange={formik.handleChange}
          error={formik.touched.cost_cleaning && Boolean(formik.errors.cost_cleaning)}
          helperText={formik.touched.cost_cleaning && formik.errors.cost_cleaning}
        />
       </>
  : null
    }
    <br />

        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have separate washroom in room ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="separate_washroom">separate_washroom</InputLabel>
            <Select
            labelId="separate_washroom"
            id="separate_washroom"
            value={formik.values.separate_washroom}
            onChange={(e) => {
            formik.setFieldValue('separate_washroom',e.target.value)}}
            error={formik.touched.separate_washroom && Boolean(formik.errors.separate_washroom)}
            helperText={formik.touched.separate_washroom && formik.errors.separate_washroom}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
    


    <br />

   
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have building sequrity guard ?
        </Typography>
      
        <FormControl className={classes.form}>
        
            <InputLabel id="building_guard">building_guard</InputLabel>
            <Select
            labelId="building_guard"
            id="building_guard"
            value={formik.values.building_guard}
            onChange={(e) => {
            formik.setFieldValue('building_guard',e.target.value)}}
            error={formik.touched.building_guard && Boolean(formik.errors.building_guard)}
            helperText={formik.touched.building_guard && formik.errors.building_guard}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    <br />

  
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have CCTV in building ?
        </Typography>
     
        <FormControl className={classes.form}>
        
            <InputLabel id="cctv_building">cctv_building</InputLabel>
            <Select
            labelId="cctv_building"
            id="cctv_building"
            value={formik.values.cctv_building}
            onChange={(e) => {
            formik.setFieldValue('cctv_building',e.target.value)}}
            error={formik.touched.cctv_building && Boolean(formik.errors.cctv_building)}
            helperText={formik.touched.cctv_building && formik.errors.cctv_building}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    <br />

    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have power backup in building ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="power_backup">power_backup</InputLabel>
            <Select
            labelId="power_backup"
            id="power_backup"
            value={formik.values.power_backup}
            onChange={(e) => {
            formik.setFieldValue('power_backup',e.target.value)}}
            error={formik.touched.power_backup && Boolean(formik.errors.power_backup)}
            helperText={formik.touched.power_backup && formik.errors.power_backup}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     


  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any additional facility
        </Typography>
    
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={4}
          id="facility"
          name="facility"
          label="facility"
          value={formik.values.facility}
          onChange={formik.handleChange}
        />
       </>

  <br />


           
            <Typography variant="h4" color="textPrimary">
              Pricing
            </Typography>
          
            
    

    <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any discount you want to provide (in %)
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="owner_discount"
          name="owner_discount"
          label="Discount"
          value={formik.values.owner_discount}
          onChange={(e) => {formik.setFieldValue('owner_discount',parseInt(e.target.value)); 
          }}
          error={formik.touched.owner_discount && Boolean(formik.errors.owner_discount)}
          helperText={formik.touched.owner_discount && formik.errors.owner_discount}
        />
      </>

  <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Price (excluding facilities charge and discount)
        </Typography>
     
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         
         fullWidth
          rows={1}
          id="seller_price"
          name="seller_price"
          label="Price"
          value={formik.values.seller_price}
          onChange={(e) => {formik.setFieldValue('seller_price',parseInt(e.target.value)); 
          }}
          error={formik.touched.seller_price && Boolean(formik.errors.seller_price)}
          helperText={formik.touched.seller_price && formik.errors.seller_price}
        />
        </>
<br />




            <Typography variant="h4" color="textPrimary">
              Regarding Shop
            </Typography>
          
            <br />
      

    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any shop policy or rules?
        </Typography>
    
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={5}
          id="shop_policy"
          name="shop_policy"
          label="shop policy"
          value={formik.values.shop_policy}
          onChange={formik.handleChange}
          
        />
      </>


            <Typography variant="h4" color="textPrimary">
              Location
            </Typography>
           
            <br />
            <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Full Address
        </Typography>
     
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         
         fullWidth
          rows={5}
          id="location"
          name="location"
          label="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          
        />
       </>
  <br />


    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      City name
        </Typography>
    
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="city"
          name="city"
          label="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          
        />
        </>
  <br />
  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      State name
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="state"
          name="state"
          label="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          
        />
      </>

<br />
  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Country name
        </Typography>
     
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
        </>
  <br />

  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Landmark
        </Typography>
      
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="landmark"
          name="landmark"
          label="landmark"
          value={formik.values.landmark}
          onChange={formik.handleChange}
          error={formik.touched.landmark && Boolean(formik.errors.landmark)}
          helperText={formik.touched.landmark && formik.errors.landmark}
          
        />
       </>

  <br />
  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Pincode
        </Typography>
    
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="pincode"
          name="pincode"
          label="pincode"
          value={formik.values.pincode}
          onChange={formik.handleChange}
          error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          helperText={formik.touched.pincode && formik.errors.pincode}
          
        />
        </>


  <br />

  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Address proof (pdf format)
        </Typography>
   </>  
       

{
  myroom.address_proof ? <><a href={myroom.address_proof}><p id="proof">UPLOADED ALREADY</p></a></> :  <><input type='file'  id='address' accept='application/pdf' onChange={(event) => {
    Filevalidation(event.target.files[0]);}}/> 
         <p id="proof">NOT UPLOADED</p></>
 }
        

  <br />

  






    







        
        
        

        
        <br />
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Kindly, mark the location of your shop in the map to provide better facilites and optimisation (required*).
     
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      
      Please note that if you have marked multiple time then the latest one will be used as our reference 
        </Typography>
        <MapForm value={formik.values} setvalue={formik.setFieldValue}/>
        <br />

       
            <Typography variant="h4" color="textPrimary">
              Neighborhood
            </Typography>
           
            <br />

        <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Nearby station 1
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="nearby_station1"
          name="nearby_station1"
          label="Nearby Station 1"
          value={formik.values.nearby_station1}
          onChange={formik.handleChange}
          error={formik.touched.nearby_station1 && Boolean(formik.errors.nearby_station1)}
          helperText={formik.touched.nearby_station1 && formik.errors.nearby_station1}
          
        />
        </>


  <br />

  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Distance from station 1 (in km)
        </Typography>
     
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         
         fullWidth
          rows={1}
          id="distance1"
          name="distance1"
          label="distance from station 1"
          value={formik.values.distance1}
          onChange={(e) => {formik.setFieldValue('distance1',parseFloat(e.target.value)); 
          }}
          error={formik.touched.distance1 && Boolean(formik.errors.distance1)}
          helperText={formik.touched.distance1 && formik.errors.distance1}
          
        />
       </>


  <br />


  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Nearby station 2
        </Typography>
     
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
          rows={1}
          id="nearby_station2"
          name="nearby_station2"
          label="Nearby Station 2"
          value={formik.values.nearby_station2}
          onChange={formik.handleChange}
          error={formik.touched.nearby_station1 && Boolean(formik.errors.nearby_station2)}
          helperText={formik.touched.nearby_station2 && formik.errors.nearby_station2}
          
        />
       </>


  <br />

  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Distance from station 2 (in km)
        </Typography>
     
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         
         fullWidth
          rows={1}
          id="distance2"
          name="distance2"
          label="distance from station 2"
          value={formik.values.distance2}
          onChange={(e) => {formik.setFieldValue('distance2',parseFloat(e.target.value)); 
          }}
          error={formik.touched.distance2 && Boolean(formik.errors.distance2)}
          helperText={formik.touched.distance2 && formik.errors.distance2}
          
        />
       </>

  <br />




  <Button color="default" variant="contained" fullWidth onClick={(e) => {e.preventDefault();handleOpenmodal();}}>
          View Instructions
        </Button>

        <br />
  
        
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>

        </Grid>
      </form>
      
      </div>
     
      </Paper>
      </Grid>
      
      </Grid>
    </div>
    </div>
  );
}








const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(ShopForm)
