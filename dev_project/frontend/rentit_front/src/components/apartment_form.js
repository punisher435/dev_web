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

axios.defaults.xsrfHeaderName = `${process.env.XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.CSRF_COOKIE}`;

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

  BHK: yup
  .number().integer('please enter integer'),

  total_beds: yup
  .number().integer('please enter integer'),

  total_AC: yup
  .number().integer('please enter integer'),

  total_TV: yup
  .number().integer('please enter integer'),

  total_cooler: yup
  .number().integer('please enter integer'),

  total_geyser: yup
  .number().integer('please enter integer'),

  total_rooms: yup
  .number().integer('please enter integer'),

  total_floors: yup
  .number().integer('please enter integer'),

  washroom: yup
  .number().integer('please enter integer'),

  sofa: yup
  .boolean()
  .required('You must answer this '),
  
  
  removable_house_TV: yup
  .boolean()
  .required('You must answer this '),
  
  house_refridgerator: yup
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
  
  
  removable_AC: yup
  .boolean()
  .required('You must answer this '),
  
  geyser: yup
  .boolean()
  .required('You must answer this '),
  
  cost_geyser: yup
  .number().integer('please enter integer'),
  
  
  removable_geyser: yup
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
  
 
  
  laundry: yup
  .boolean()
  .required('You must answer this '),
  
  cost_laundry: yup
  .number().integer('please enter integer'),

  removable_laundry: yup
  .boolean()
  .required('You must answer this '),
  
  
  
  apartment_cleaning: yup
  .boolean()
  .required('You must answer this '),
  
  cost_cleaning: yup
  .number().integer('please enter integer'),
  
  
  BHK: yup
  .number().integer('please enter integer'),
  
  windows: yup
  .number().integer('please enter integer'),
  
  floor_no: yup
  .number().integer('please enter integer'),
  
  cost_electricity: yup
  .number().integer('please enter integer'),
  
  
  cost_water: yup
  .number().integer('please enter integer'),
  
  
  category: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),

  apartment_type: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  city: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  state: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
  country: yup
  .string('Please, provide the appropriate answer')
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
  
  
  fans: yup
  .number().integer('please enter integer'),
  
  bed_type: yup
  .string('Please, provide the appropriate answer')
  .required('You must answer this '),
  
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
  
  photo1: yup.mixed().when("edit", {
      is: false,
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
  
  
  
    photo2: yup.mixed().when("edit", {
      is: false,
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
  
    photo3: yup.mixed().when("edit", {
      is: false,
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
  
    photo4: yup.mixed().when("edit", {
      is: false,
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
  
    photo4: yup.mixed().when("input4", {
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
  
    photo5: yup.mixed().when("edit", {
      is: false,
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
  
    photo5: yup.mixed().when("input5", {
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

    photo6: yup.mixed().when("input6", {
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

      photo6: yup.mixed().when("edit", {
        is: false,
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
  
  address_proof: yup.mixed().when("edit", {
      is: false,
      then: yup.mixed().required("A file is required")
      .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS1.includes(value.type)
      ),
    }),
  
    address_proof: yup.mixed().when("newfile", {
      is: true,
      then: yup.mixed().required("A file is required")
      .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS1.includes(value.type)
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
    textclass:{
      float: 'left',
      marginRight:'3%',
      
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      
      
    },
  }));

function ApartmentForm (props){
  const theme = useTheme();
    const classes = useStyles();
    const hiddenFileInput1 = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const hiddenFileInput3 = React.useRef(null);
    const hiddenFileInput4 = React.useRef(null);
    const hiddenFileInput5 = React.useRef(null);
    const hiddenFileInput6 = React.useRef(null);

    const [input1,setinput1] = React.useState(false);
    const [input2,setinput2] = React.useState(false);
    const [input3,setinput3] = React.useState(false);
    const [input4,setinput4] = React.useState(false);
    const [input5,setinput5] = React.useState(false);
    const [input6,setinput6] = React.useState(false);
    const [newfile,setnewfile] = React.useState(false);
    const [myroom,setroom] = useState({
      wifi:'',
      cost_wifi:'',
      removable_wifi:false,

      TV:'',
      cost_TV:'',
      removable_house_TV:false,

      house_refridgerator:'',
      cost_refridgerator:'',
      removable_house_refridgerator:false,

      purified_water:'',
      cost_purified_water:'',
      removable_purified_water:false,

      AC:'',
      cost_AC:'',
      removable_AC:'',

      laundry:'',
      cost_laundry:0,
      removable_laundry:false,

      geyser:'',
      cost_geyser:'',
      removable_geyser:false,

      cooler:'',
      cost_cooler:'',
      removable_cooler:false,

      cost_electricity:'',
      cost_water:'',

      apartment_cleaning:'',
      cost_cleaning:'',

      BHK:0,
      balcony:0,
    
      title:'',
      seller_price:'',
      owner_discount:0,
      bed_type:'',
      length:'',
      breadth:'',
      height:'',
      building_guard:'',
      category:'',
      cctv_building:'',
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

      apartment_policy:'',

      address_proof:'',

      photo1:'',
      photo2:'',
      photo3:'',
      photo4:'',
      photo5:'',
      photo6:'',
      file1:"/addroom.png",
      file2:"/addroom.png",
      file3:"/addroom.png",
      file4:"/addroom.png",
      file5:"/addroom.png",
      file6:"/addroom.png",

      total_rooms:1,
      total_floors:1,
      total_beds:1,
      sofa:false,
      total_AC:0,
      total_TV:0,
      total_cooler:0,
      total_geyser:0,
      apartment_type:'',
      washroom:0,

    })

    const [edit,setedit] = useState(false)
    const [redirect,setredirect] = useState(false)
    const [error,seterror] = useState(false)
    const roomid = props.location.state.property_id;
    const [load,setload] = useState(false)
   const [newredirect,setnewredirect] = useState(false);

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
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceddnvslf54d/my_apartments/${roomid}/`,config);
                console.log(res.data)
                setroom({
                  wifi:res.data.wifi,
                  cost_wifi:res.data.cost_wifi,
                  removable_wifi:res.data.removable_wifi,

                  TV:res.data.TV,
                  cost_TV:res.data.cost_TV,
                  removable_house_TV:res.data.removable_house_TV,

                  house_refridgerator:res.data.house_refridgerator,
                  cost_refridgerator:res.data.cost_refridgerator,
                  removable_house_refridgerator:res.data.removable_house_refridgerator,

                  purified_water:res.data.purified_water,
                  cost_purified_water:res.data.cost_purified_water,
                  removable_purified_water:res.data.removable_purified_water,

                  AC:res.data.AC,
                  cost_AC:res.data.cost_AC,
                  removable_AC:res.data.removable_AC,

                  laundry:res.data.laundry,
                  cost_laundry:res.data.cost_laundry,
                  removable_laundry:res.data.removable_laundry,

                  geyser:res.data.geyser,
                  cost_geyser:res.data.cost_geyser,
                  removable_geyser:res.data.removable_geyser,

                  cooler:res.data.cooler,
                  cost_cooler:res.data.cost_cooler,
                  removable_cooler:res.data.removable_cooler,

                  cost_electricity:res.data.cost_electricity,
                  cost_water:res.data.cost_water,

                  apartment_cleaning:res.data.apartment_cleaning,
                  cost_cleaning:res.data.cost_cleaning,

                  BHK:res.data.BHK,
                  balcony:res.data.balcony,
                  
                  title:res.data.title,
                  seller_price:res.data.seller_price,
                  owner_discount:res.data.owner_discount,
                  bed_type:res.data.bed_type,
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

                  apartment_policy:res.data.apartment_policy,

                  address_proof:res.data.address_proof,

                  photo1:res.data.photo1,
                  photo2:res.data.photo2,
                  photo3:res.data.photo3,
                  photo4:res.data.photo4,
                  photo5:res.data.photo5,
                  photo6:res.data.photo6,

                  file1:res.data.photo1,
                  file2:res.data.photo2,
                  file3:res.data.photo3,
                  file4:res.data.photo4,
                  file5:res.data.photo5,
                  file6:res.data.photo6,

                  total_rooms:res.data.total_rooms,
                    total_floors:res.data.total_floors,
                    total_beds:res.data.total_beds,
                    sofa:res.data.sofa,
                    total_AC:res.data.total_AC,
                    total_TV:res.data.total_TV,
                    total_cooler:res.data.total_cooler,
                    total_geyser:res.data.total_geyser,
                    apartment_type:res.data.apartment_type,
                    washroom:res.data.washroom,
                })
                setedit(true);
                
              
              }
                catch{

                  seterror(true)
      
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
      removable_house_TV:myroom.removable_house_TV,

      house_refridgerator:myroom.house_refridgerator,
      cost_refridgerator:myroom.cost_refridgerator,
      removable_house_refridgerator:myroom.removable_house_refridgerator,

      purified_water:myroom.purified_water,
      cost_purified_water:myroom.cost_purified_water,
      removable_purified_water:myroom.removable_purified_water,

      AC:myroom.AC,
      cost_AC:myroom.cost_AC,
      removable_AC:myroom.removable_AC,

      laundry:myroom.laundry,
      cost_laundry:myroom.cost_laundry,
      removable_laundry:myroom.removable_laundry,

      geyser:myroom.geyser,
      cost_geyser:myroom.cost_geyser,
      removable_geyser:myroom.removable_geyser,

      cooler:myroom.cooler,
      cost_cooler:myroom.cost_cooler,
      removable_cooler:myroom.removable_cooler,


      cost_electricity:myroom.cost_electricity,
      cost_water:myroom.cost_water,

      apartment_cleaning:myroom.apartment_cleaning,
      cost_cleaning:myroom.cost_cleaning,

      BHK:myroom.BHK,
      balcony:myroom.balcony,
      
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

      bed_type:myroom.bed_type,

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

      apartment_policy:myroom.apartment_policy,

      total_rooms:myroom.total_rooms,
    total_floors:myroom.total_floors,
    total_beds:myroom.total_beds,
    sofa:myroom.sofa,
    total_AC:myroom.total_AC,
    total_TV:myroom.total_TV,
    total_cooler:myroom.total_cooler,
    total_geyser:myroom.total_geyser,
    apartment_type:myroom.apartment_type,
    washroom:myroom.washroom,

    address_proof:myroom.address_proof,


      
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let form_data = new FormData();
      console.log(values)
      setload(true)
      form_data.append('title',values.title)
      form_data.append('wifi',values.wifi)
      form_data.append('cost_wifi',values.cost_wifi)
      form_data.append('removable_wifi',values.removable_wifi)

      form_data.append('TV',values.TV)
      form_data.append('cost_TV',values.cost_TV)
      form_data.append('removable_house_TV',values.removable_house_TV)

      form_data.append('house_refridgerator',values.house_refridgerator)
      form_data.append('cost_refridgerator',values.cost_refridgerator)
      form_data.append('removable_house_refridgerator',values.removable_house_refridgerator)

      form_data.append('AC',values.AC)
      form_data.append('cost_AC',values.cost_AC)
      form_data.append('removable_AC',values.removable_AC)

      form_data.append('purified_water',values.purified_water)
      form_data.append('cost_purified_water',values.cost_purified_water)
      form_data.append('removable_purified_water',values.removable_purified_water)

      form_data.append('geyser',values.geyser)
      form_data.append('cost_geyser',values.cost_geyser)
      form_data.append('removable_geyser',values.removable_geyser)

      form_data.append('cooler',values.cooler)
      form_data.append('cost_cooler',values.cost_cooler)
      form_data.append('removable_cooler',values.removable_cooler)

      form_data.append('laundry',values.laundry)
      form_data.append('cost_laundry',values.cost_laundry)
      form_data.append('removable_laundry',values.removable_laundry)

      form_data.append('apartment_cleaning',values.apartment_cleaning)
      form_data.append('cost_cleaning',values.cost_cleaning)

      form_data.append('cost_electricity',values.cost_electricity)

      form_data.append('cost_water',values.cost_water)

      form_data.append('location',values.location)

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
      form_data.append('photo6',values.photo6)

      form_data.append('address_proof',values.address_proof)

      form_data.append('BHK',values.BHK)
      form_data.append('windows',values.windows)
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
      form_data.append('bed_type',values.bed_type)


      form_data.append('breadth',values.breadth)

      form_data.append('height',values.height)

      form_data.append('washroom',values.washroom)
      form_data.append('total_rooms',values.total_rooms)
      form_data.append('total_floors',values.total_floors)
      form_data.append('total_beds',values.total_beds)
      form_data.append('sofa',values.sofa)
      form_data.append('total_AC',values.total_AC)
      form_data.append('total_TV',values.total_TV)
      form_data.append('total_cooler',values.total_cooler)
      form_data.append('total_geyser',values.total_geyser)
      form_data.append('apartment_type',values.apartment_type)

      if(values.apartment_policy!='')
      {
        form_data.append('apartment_policy',values.apartment_policy)
      }
      else{
        form_data.append('apartment_policy','None')
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
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourceddnvslf54d/my_apartments/${roomid}/`,form_data,config);
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
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourceddnvslf54d/my_apartments/`,form_data,config);
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
    
    if(formik.values.cost_refridgerator!==formik.values.cost_refridgerator){formik.setFieldValue('cost_refridgerator',0);}
   
    
  
  }
,[formik.values.cost_refridgerator])


useEffect(
  () => {
    
    if(formik.values.cost_TV!==formik.values.cost_TV){formik.setFieldValue('cost_TV',0);}
  
    
  
  }
,[formik.values.cost_TV])


useEffect(
  () => {
    
    if(formik.values.cost_AC!==formik.values.cost_AC){formik.setFieldValue('cost_AC',0);}
    if(formik.values.cost_purified_water!==formik.values.cost_purified_water){formik.setFieldValue('cost_purified_water',0);}
    if(formik.values.cost_geyser!==formik.values.cost_geyser){formik.setFieldValue('cost_geyser',0);}
    
  
  }
,[formik.values.cost_AC,formik.values.cost_purified_water,formik.values.cost_geyser])


useEffect(
  () => {
    
    if(formik.values.cost_cooler!==formik.values.cost_cooler){formik.setFieldValue('cost_cooler',0);}
    if(formik.values.cost_electricity!==formik.values.cost_electricity){formik.setFieldValue('cost_electricity',0);}
    if(formik.values.cost_water!==formik.values.cost_water){formik.setFieldValue('cost_water',0);}
    
  
  }
,[formik.values.cost_cooler,formik.values.cost_electricity,formik.values.cost_water])


useEffect(
  () => {
    
    if(formik.values.distance1!==formik.values.distance1){formik.setFieldValue('distance1',0);}
    if(formik.values.distance2!==formik.values.distance2){formik.setFieldValue('distance2',0);}
    
    if(formik.values.cost_laundry!==formik.values.cost_laundry){formik.setFieldValue('cost_laundry',0);}
   
    if(formik.values.cost_cleaning!==formik.values.cost_cleaning){formik.setFieldValue('cost_cleaning',0);}
  
  }
,[formik.values.distance1,formik.values.distance2,formik.values.cost_laundry,formik.values.cost_cleaning])


if(newredirect==true)
{
  return <Redirect to='/dashboard/profile' />
}


  if(redirect==true)
  {
    return <Redirect to='/dashboard/my_apartments' />
  }
  if(error===true)
  {
    return <div className={classes.erorclass}><Eror error={'Cannot process request!'} /></div>;
  }

  return (
    <div className={classes.myclass}>

      <Backdrop className={classes.backdrop} open={load}>
        <CircularProgress color="inherit" />
      </Backdrop>
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
      <form onSubmit={formik.handleSubmit}>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput1.current.click();}}>
          <img src={myroom.file1} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput1} style={{display:'none'}}  id='photo1' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file1: URL.createObjectURL(event.target.files[0]),photo1:event.target.files[0]}); formik.setFieldValue('photo1',event.target.files[0]); setinput1(true)}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput2.current.click();}}>
          <img src={myroom.file2} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput2} style={{display:'none'}}  id='photo2' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file2: URL.createObjectURL(event.target.files[0]),photo2:event.target.files[0]});  formik.setFieldValue('photo2',event.target.files[0]);  setinput2(true)}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput3.current.click();}}>
          <img src={myroom.file3} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput3} style={{display:'none'}}  id='photo3' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file3: URL.createObjectURL(event.target.files[0]),photo3:event.target.files[0]});  formik.setFieldValue('photo3',event.target.files[0]);  setinput3(true)}}/> 
        
        </Grid>

        


      </Grid>

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

          <input type='file'  ref={hiddenFileInput4} style={{display:'none'}}  id='photo4' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
          setroom({...myroom,file4: URL.createObjectURL(event.target.files[0]),photo4:event.target.files[0]});  formik.setFieldValue('photo4',event.target.files[0]);  setinput4(true)}}/> 

          </Grid>

          <Grid item className={classes.imageclass}>

          <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput5.current.click();}}>
            <img src={myroom.file5} className={classes.imageclass}/>
            </Button>

          <input type='file'  ref={hiddenFileInput5} style={{display:'none'}}  id='photo5' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
          setroom({...myroom,file5: URL.createObjectURL(event.target.files[0]),photo5:event.target.files[0]});  formik.setFieldValue('photo5',event.target.files[0]);  setinput5(true)}}/> 

          </Grid>

          <Grid item className={classes.imageclass}>

            <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput6.current.click();}}>
            <img src={myroom.file6} className={classes.imageclass}/>
            </Button>

            <input type='file'  ref={hiddenFileInput6} style={{display:'none'}}  id='photo6' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
            setroom({...myroom,file6: URL.createObjectURL(event.target.files[0]),photo6:event.target.files[0]});  formik.setFieldValue('photo6',event.target.files[0]);  setinput6(true)}}/> 

        </Grid>
         
      </Grid>


        <br />
        <br />
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="title"
          name="title"
          label="Apartment name"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of windows in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('windows',formik.values.windows,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.windows}

            <Button  onClick={() => handleclick2('windows',formik.values.windows,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of balcony in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('balcony',formik.values.balcony,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.balcony}

            <Button  onClick={() => handleclick2('balcony',formik.values.balcony,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of fans in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('fans',formik.values.fans,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.fans}

            <Button  onClick={() => handleclick2('fans',formik.values.fans,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Apartment type
          </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="apartment_type">Apartment type</InputLabel>
            <Select
            labelId="apartment_type"
            id="apartment_type"
            value={formik.values.apartment_type}
            onChange={(e) => formik.setFieldValue('apartment_type',e.target.value)}
            error={formik.touched.apartment_type && Boolean(formik.errors.apartment_type)}
            helperText={formik.touched.apartment_type && formik.errors.apartment_type}
            >
          
          <MenuItem value={'Flat'}>Flat</MenuItem>
          <MenuItem value={'Bunglow'}>Bunglow</MenuItem>
            </Select>
        </FormControl>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Floor no. of apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('floor_no',formik.values.floor_no,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.floor_no}

            <Button  onClick={() => handleclick2('floor_no',formik.values.floor_no,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of washrooms in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('washroom',formik.values.washroom,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.washroom}

            <Button  onClick={() => handleclick2('washroom',formik.values.washroom,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of rooms in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('total_rooms',formik.values.total_rooms,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_rooms}

            <Button  onClick={() => handleclick2('total_rooms',formik.values.total_rooms,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of floors in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('total_floors',formik.values.total_floors,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_floors}

            <Button  onClick={() => handleclick2('total_floors',formik.values.total_floors,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            BHK of the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('BHK',formik.values.BHK,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.BHK}

            <Button  onClick={() => handleclick2('BHK',formik.values.BHK,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Category of the apartment
          </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="category">Category</InputLabel>
            <Select
            labelId="category"
            id="category"
            value={formik.values.category}
            onChange={(e) => formik.setFieldValue('category',e.target.value)}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'Classic room'}>Classic room</MenuItem>
          <MenuItem value={'Deluxe room'}>Deluxe room</MenuItem>
          <MenuItem value={'Single'}>Single</MenuItem>
          <MenuItem value={'Double'}>Double</MenuItem>
          <MenuItem value={'Triple'}>Triple</MenuItem>
          <MenuItem value={'Quad'}>Quad</MenuItem>
          <MenuItem value={'Queen'}>Queen</MenuItem>
          <MenuItem value={'King'}>King</MenuItem>
          <MenuItem value={'Twin'}>Twin</MenuItem>
          <MenuItem value={'Double-Double'}>Double-Double</MenuItem>
          <MenuItem value={'Studio'}>Studio</MenuItem>
          <MenuItem value={'Suite'}>Suite</MenuItem>
          <MenuItem value={'Executive suite'}>Executive suite</MenuItem>
          <MenuItem value={'Mini suite'}>Mini suite</MenuItem>
          <MenuItem value={'Presidential suite'}>Presidential suite</MenuItem>
          <MenuItem value={'Apartment'}>Apartment</MenuItem>
          <MenuItem value={'Connecting rooms'}>Connecting rooms</MenuItem>
          <MenuItem value={'Murphy rooms'}>Murphy room</MenuItem>
          <MenuItem value={'Adjacent rooms'}>Adjacent rooms</MenuItem>
          <MenuItem value={'Murphy room'}>Murphy room</MenuItem>
          <MenuItem value={'Adjacent rooms'}>Adjacent rooms</MenuItem>
            </Select>
        </FormControl>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Bed type provided in the apartment
          </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="bed_type">Bed type</InputLabel>
            <Select
            labelId="bed_type"
            id="bed_type"
            value={formik.values.bed_type}
            onChange={(e) => formik.setFieldValue('bed_type',e.target.value)}
            error={formik.touched.bed_type && Boolean(formik.errors.bed_type)}
            helperText={formik.touched.bed_type && formik.errors.bed_type}
            >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'Single Bed'}>Single Bed</MenuItem>
          <MenuItem value={'Double Bed'}>Double Bed</MenuItem>
            </Select>
        </FormControl>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of beds in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('total_beds',formik.values.total_beds,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_beds}

            <Button  onClick={() => handleclick2('total_beds',formik.values.total_beds,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of TV in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('total_TV',formik.values.total_TV,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_TV}

            <Button  onClick={() => handleclick2('total_TV',formik.values.total_TV,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of AC in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('total_AC',formik.values.total_AC,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_AC}

            <Button  onClick={() => handleclick2('total_AC',formik.values.total_AC,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of cooler in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('total_cooler',formik.values.total_cooler,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_cooler}

            <Button  onClick={() => handleclick2('total_cooler',formik.values.total_cooler,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of geyser in the apartment
          </Typography>
        </Grid>
          <Grid item>
          <div>   
            <Button onClick={() => handleclick1('total_geyser',formik.values.total_geyser,formik.setFieldValue)} >
                <AddIcon />
            </Button>

            {formik.values.total_geyser}

            <Button  onClick={() => handleclick2('total_geyser',formik.values.total_geyser,formik.setFieldValue)}>
                <RemoveIcon />
            </Button>
        </div>
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
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              Sofa
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have Sofa ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="sofa">Sofa</InputLabel>
            <Select
            labelId="sofa"
            id="sofa"
            value={formik.values.sofa}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('sofa',e.target.value);}
            else{formik.setFieldValue('sofa',e.target.value)}}}
            error={formik.touched.sofa && Boolean(formik.errors.sofa)}
            helperText={formik.touched.sofa && formik.errors.sofa}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      </Grid>
    </Grid>

    <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Length of the apartment
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="length"
          name="length"
          label="length"
          value={formik.values.length}
          onChange={(e) => {formik.setFieldValue('length',parseInt(e.target.value)); 
          }}
          error={formik.touched.length && Boolean(formik.errors.length)}
          helperText={formik.touched.length && formik.errors.length}
        />
        </Grid>
  </Grid></div>

  <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Breadth of the apartment
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>

  <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Height of the apartment
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>

  <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Furniture in the apartment
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={4}
          id="furniture"
          name="furniture"
          label="furniture"
          value={formik.values.furniture}
          onChange={formik.handleChange}
          error={formik.touched.furniture && Boolean(formik.errors.furniture)}
          helperText={formik.touched.furniture && formik.errors.furniture}
        />
        </Grid>
  </Grid></div>

  <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Description of the apartment
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={4}
          id="description"
          name="description"
          label="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        </Grid>
  </Grid></div>




            <br />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h4" color="textPrimary">
              Facilities
            </Typography>
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
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              Electricity charge
            </Typography>
            </Grid>
            </Grid>

<div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of electricity facility(if not any, enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>

  <br />

  <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              Water charge
            </Typography>
            </Grid>
            </Grid>

<div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of Water facility(if not any, enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>

  <br />


            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              WIFI
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have WIFI ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
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
      </Grid>
    </Grid>

    


    {
      formik.values.wifi ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of wifi facility(if not enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>
  : null
    }
    

{
      formik.values.wifi ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
      </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        
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
        </Grid>
  </Grid></div>
  : null
    }


            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              TV in the house
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have house TV ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="TV">House TV</InputLabel>
            <Select
            labelId="TV"
            id="TV"
            value={formik.values.TV}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('TV',e.target.value);
            formik.setFieldValue('cost_TV',0);
            formik.setFieldValue('removable_house_TV',false);}
            else{formik.setFieldValue('TV',e.target.value)}}}
            error={formik.touched.TV && Boolean(formik.errors.TV)}
            helperText={formik.touched.TV && formik.errors.TV}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      </Grid>
    </Grid>

    


    {
      formik.values.TV ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of house TV facility(if not enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="cost_TV"
          name="cost_TV"
          label="Cost of house TV facility"
          value={formik.values.cost_TV}
          onChange={(e) => {formik.setFieldValue('cost_TV',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_TV && Boolean(formik.errors.cost_TV)}
          helperText={formik.touched.cost_TV && formik.errors.cost_TV}
        />
        </Grid>
  </Grid></div>
  : null
    }
    

{
      formik.values.TV ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove house TV facility?
        </Typography>
      </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="removable_house_TV">Removable house TV facility?</InputLabel>
            <Select
            labelId="removable_house_TV"
            id="removable_house_TV"
            value={formik.values.removable_house_TV}
            onChange={(e) => {
            formik.setFieldValue('removable_house_TV',e.target.value)}}
            error={formik.touched.removable_house_TV && Boolean(formik.errors.removable_house_TV)}
            helperText={formik.touched.removable_house_TV && formik.errors.removable_house_TV}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
        </Grid>
  </Grid></div>
  : null
    }


       

<Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
          <Grid item>
          <Typography variant="h6" color="textPrimary">
            Refridgerator in the house
          </Typography>
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
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
          Do you have house refridgerator ?
      </Typography>
      </Grid>
        <Grid item>
      <FormControl className={classes.formControl}>
      
          <InputLabel id="house_refridgerator">House refridgerator</InputLabel>
          <Select
          labelId="house_refridgerator"
          id="house_refridgerator"
          value={formik.values.house_refridgerator}
          onChange={(e) => {if(e.target.value===false){formik.setFieldValue('house_refridgerator',e.target.value);
          formik.setFieldValue('cost_refridgerator',0);
          formik.setFieldValue('removable_house_refridgerator',false);}
          else{formik.setFieldValue('house_refridgerator',e.target.value)}}}
          error={formik.touched.house_refridgerator && Boolean(formik.errors.house_refridgerator)}
          helperText={formik.touched.house_refridgerator && formik.errors.house_refridgerator}
          >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
          </Select>
      </FormControl>
    </Grid>
  </Grid>

  


  {
    formik.values.house_refridgerator ? <div><br /><Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    spacing={1}
  >
    
    <Grid item>
    <Typography variant="body1" color="textSecondary" className={classes.textclass}>
    Cost of house refridgerator facility(if not enter 0)
      </Typography>
    </Grid>
      <Grid item>
      <TextField
        multiline
        rows={1}
        id="cost_refridgerator"
        name="cost_refridgerator"
        label="Cost of house refridgerator facility"
        value={formik.values.cost_refridgerator}
        onChange={(e) => {formik.setFieldValue('cost_refridgerator',parseInt(e.target.value)); 
          }}
        error={formik.touched.cost_refridgerator && Boolean(formik.errors.cost_refridgerator)}
        helperText={formik.touched.cost_refridgerator && formik.errors.cost_refridgerator}
      />
      </Grid>
</Grid></div>
: null
  }
  

{
    formik.values.house_refridgerator ? <div><br /><Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    spacing={1}
  >
    
    <Grid item>
    <Typography variant="body1" color="textSecondary" className={classes.textclass}>
    Can customers remove house refridgerator facility?
      </Typography>
    </Grid>
      <Grid item>
      <FormControl className={classes.formControl}>
      
          <InputLabel id="removable_house_refridgerator">Removable house refridgerator facility?</InputLabel>
          <Select
          labelId="removable_house_refridgerator"
          id="removable_house_refridgerator"
          value={formik.values.removable_house_refridgerator}
          onChange={(e) => {
          formik.setFieldValue('removable_house_refridgerator',e.target.value)}}
          error={formik.touched.removable_house_refridgerator && Boolean(formik.errors.removable_house_refridgerator)}
          helperText={formik.touched.removable_house_refridgerator && formik.errors.removable_house_refridgerator}
          >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
          </Select>
      </FormControl>
      </Grid>
</Grid></div>
: null
  }

        <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              Purified water
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have purified water ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
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
      </Grid>
    </Grid>

    


    {
      formik.values.purified_water ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of purified water facility(if not enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>
  : null
    }
    

{
      formik.values.purified_water ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
      </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        
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
        </Grid>
  </Grid></div>
  : null
    }


<Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              AC
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have AC ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="AC">AC</InputLabel>
            <Select
            labelId="AC"
            id="AC"
            value={formik.values.AC}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('AC',e.target.value);
            formik.setFieldValue('cost_AC',0);
            formik.setFieldValue('removable_AC',false);}
            else{formik.setFieldValue('AC',e.target.value)}}}
            error={formik.touched.AC && Boolean(formik.errors.AC)}
            helperText={formik.touched.AC && formik.errors.AC}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      </Grid>
    </Grid>

    


    {
      formik.values.AC ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of AC facility(if not enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>
  : null
    }
    

{
      formik.values.AC ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
      </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="removable_AC">Removable AC facility?</InputLabel>
            <Select
            labelId="removable_AC"
            id="removable_AC"
            value={formik.values.removable_AC}
            onChange={(e) => {
            formik.setFieldValue('removable_AC',e.target.value)}}
            error={formik.touched.removable_AC && Boolean(formik.errors.removable_AC)}
            helperText={formik.touched.removable_AC && formik.errors.removable_AC}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
        </Grid>
  </Grid></div>
  : null
    }

<Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spgeysering={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              Geyser
            </Typography>
            </Grid>
            </Grid>
            <br />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spgeysering={1}
      >
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have geyser ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="geyser">geyser</InputLabel>
            <Select
            labelId="geyser"
            id="geyser"
            value={formik.values.geyser}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('geyser',e.target.value);
            formik.setFieldValue('cost_geyser',0);
            formik.setFieldValue('removable_geyser',false);}
            else{formik.setFieldValue('geyser',e.target.value)}}}
            error={formik.touched.geyser && Boolean(formik.errors.geyser)}
            helperText={formik.touched.geyser && formik.errors.geyser}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      </Grid>
    </Grid>

    


    {
      formik.values.geyser ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spgeysering={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of geyser geyser(if not enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="cost_geyser"
          name="cost_geyser"
          label="Cost of geyser geyser"
          value={formik.values.cost_geyser}
          onChange={(e) => {formik.setFieldValue('cost_geyser',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_geyser && Boolean(formik.errors.cost_geyser)}
          helperText={formik.touched.cost_geyser && formik.errors.cost_geyser}
        />
        </Grid>
  </Grid></div>
  : null
    }
    

{
      formik.values.geyser ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spgeysering={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this geyser?
        </Typography>
      </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="removable_geyser">Removable geyser geyser?</InputLabel>
            <Select
            labelId="removable_geyser"
            id="removable_geyser"
            value={formik.values.removable_geyser}
            onChange={(e) => {
            formik.setFieldValue('removable_geyser',e.target.value)}}
            error={formik.touched.removable_geyser && Boolean(formik.errors.removable_geyser)}
            helperText={formik.touched.removable_geyser && formik.errors.removable_geyser}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
        </Grid>
  </Grid></div>
  : null
    }

<Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              Cooler
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have cooler ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
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
      </Grid>
    </Grid>

    


    {
      formik.values.cooler ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of cooler facility(if not enter 0)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>
  : null
    }
    

{
      formik.values.cooler ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
      </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        
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
        </Grid>
  </Grid></div>
  : null
    }



        <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
              Laundry
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have laundry ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="laundry">laundry</InputLabel>
            <Select
            labelId="laundry"
            id="laundry"
            value={formik.values.laundry}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('laundry',e.target.value);
            formik.setFieldValue('cost_laundry',0);
            formik.setFieldValue('removable_laundry',false);}
            else{formik.setFieldValue('laundry',e.target.value)}}}
            error={formik.touched.laundry && Boolean(formik.errors.laundry)}
            helperText={formik.touched.laundry && formik.errors.laundry}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      </Grid>
    </Grid>

    


    {
      formik.values.laundry ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of laundry facility
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="cost_laundry"
          name="cost_laundry"
          label="Cost of laundry facility"
          value={formik.values.cost_laundry}
          onChange={(e) => {formik.setFieldValue('cost_laundry',parseInt(e.target.value)); 
          }}
          onChange={formik.handleChange}
          error={formik.touched.cost_laundry && Boolean(formik.errors.cost_laundry)}
          helperText={formik.touched.cost_laundry && formik.errors.cost_laundry}
        />
        </Grid>
  </Grid></div>
  : null
    }


{
      formik.values.laundry ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spgeysering={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this laundry?
        </Typography>
      </Grid>
        <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="removable_laundry">Removable laundry ?</InputLabel>
            <Select
            labelId="removable_laundry"
            id="removable_laundry"
            value={formik.values.removable_laundry}
            onChange={(e) => {
            formik.setFieldValue('removable_laundry',e.target.value)}}
            error={formik.touched.removable_laundry && Boolean(formik.errors.removable_laundry)}
            helperText={formik.touched.removable_laundry && formik.errors.removable_laundry}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
        </Grid>
  </Grid></div>
  : null
    }


<Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h6" color="textPrimary">
               Apartment cleaning
            </Typography>
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you provide Apartment cleaning ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
            <InputLabel id="apartment_cleaning">Apartment cleaning</InputLabel>
            <Select
            labelId="apartment_cleaning"
            id="apartment_cleaning"
            value={formik.values.apartment_cleaning}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('apartment_cleaning',e.target.value);
            formik.setFieldValue('cost_cleaning',0);}
            else{formik.setFieldValue('apartment_cleaning',e.target.value)}}}
            error={formik.touched.apartment_cleaning && Boolean(formik.errors.apartment_cleaning)}
            helperText={formik.touched.apartment_cleaning && formik.errors.apartment_cleaning}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      </Grid>
    </Grid>

    


    {
      formik.values.apartment_cleaning ? <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of apartment cleaning facility (in per cleaning)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>
  : null
    }
    <br />


    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have building sequrity guard ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have CCTV in building ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
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
        <Grid item>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have power backup in building ?
        </Typography>
        </Grid>
          <Grid item>
        <FormControl className={classes.formControl}>
        
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
      </Grid>
    </Grid>


  <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any additional facility
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={4}
          id="facility"
          name="facility"
          label="facility"
          value={formik.values.facility}
          onChange={formik.handleChange}
        />
        </Grid>
  </Grid></div>

  <br />


            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h4" color="textPrimary">
              Pricing
            </Typography>
            </Grid>
            </Grid>
            
    

    <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any discount you want to provide (in %)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>

  <div><br /><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Price (excluding facilities charge and discount)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>
<br />



  <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h4" color="textPrimary">
              Regarding apartment
            </Typography>
            </Grid>
            </Grid>
            <br />
      

    <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any apartment policy or rules?
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={5}
          id="apartment_policy"
          name="apartment_policy"
          label="apartment policy"
          value={formik.values.apartment_policy}
          onChange={formik.handleChange}
          
        />
        </Grid>
  </Grid></div>


  <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h4" color="textPrimary">
              Location
            </Typography>
            </Grid>
            </Grid>
            <br />
            <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Full Address
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={5}
          id="location"
          name="location"
          label="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          
        />
        </Grid>
  </Grid></div>
  <br />


    <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      City name
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="city"
          name="city"
          label="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          
        />
        </Grid>
  </Grid></div>
  <br />
  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      State name
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="state"
          name="state"
          label="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          
        />
        </Grid>
  </Grid></div>

<br />
  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Country name
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
  </Grid></div>
  <br />

  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Landmark
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="landmark"
          name="landmark"
          label="landmark"
          value={formik.values.landmark}
          onChange={formik.handleChange}
          error={formik.touched.landmark && Boolean(formik.errors.landmark)}
          helperText={formik.touched.landmark && formik.errors.landmark}
          
        />
        </Grid>
  </Grid></div>

  <br />
  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Pincode
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="pincode"
          name="pincode"
          label="pincode"
          value={formik.values.pincode}
          onChange={formik.handleChange}
          error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          helperText={formik.touched.pincode && formik.errors.pincode}
          
        />
        </Grid>
  </Grid></div>


  <br />

  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Address proof (pdf format)
        </Typography>
      </Grid>
        <Grid item>
        <input type='file'  id='address_proof' accept='file.pdf' onChange={(event) => {console.log(event.currentTarget.files[0]);
  formik.setFieldValue('address_proof',event.target.files[0]); setnewfile(true);}}/> 
        </Grid>
  </Grid></div>

  <br />

  






    







        
        
        

        
        <br />
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Kindly, mark the location of your house in the map to provide better facilites and optimisation (required*).
     
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      
      Please note that if you have marked multiple time then the latest one will be used as our reference 
        </Typography>
        <MapForm value={formik.values} setvalue={formik.setFieldValue}/>
        <br />

        <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
            <Grid item>
            <Typography variant="h4" color="textPrimary">
              Neighborhood
            </Typography>
            </Grid>
            </Grid>
            <br />

        <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Nearby station 1
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="nearby_station1"
          name="nearby_station1"
          label="Nearby Station 1"
          value={formik.values.nearby_station1}
          onChange={formik.handleChange}
          error={formik.touched.nearby_station1 && Boolean(formik.errors.nearby_station1)}
          helperText={formik.touched.nearby_station1 && formik.errors.nearby_station1}
          
        />
        </Grid>
  </Grid></div>


  <br />

  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Distance from station 1 (in km)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>


  <br />


  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Nearby station 2
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
          rows={1}
          id="nearby_station2"
          name="nearby_station2"
          label="Nearby Station 2"
          value={formik.values.nearby_station2}
          onChange={formik.handleChange}
          error={formik.touched.nearby_station1 && Boolean(formik.errors.nearby_station2)}
          helperText={formik.touched.nearby_station2 && formik.errors.nearby_station2}
          
        />
        </Grid>
  </Grid></div>


  <br />

  <div><Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      
      <Grid item>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Distance from station 2 (in km)
        </Typography>
      </Grid>
        <Grid item>
        <TextField
          multiline
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
        </Grid>
  </Grid></div>

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

export default connect(mapStateToProps)(ApartmentForm)
