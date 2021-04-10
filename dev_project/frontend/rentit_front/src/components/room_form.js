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
import Hidden from '@material-ui/core/Hidden';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import './css/App.css';

import Rules from './roomrules';

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
  
  house_TV: yup
  .boolean()
  .required('You must answer this '),
  
  cost_TV: yup
  .number().integer('please enter integer'),
  
  
  removable_house_TV: yup
  .boolean()
  .required('You must answer this '),
  
  room_TV: yup
  .boolean()
  .required('You must answer this '),
  
  cost_roomTV: yup
  .number().integer('please enter integer'),
  
  
  removable_room_TV: yup
  .boolean()
  .required('You must answer this '),
  
  house_refridgerator: yup
  .boolean()
  .required('You must answer this '),
  
  room_refridgerator: yup
  .boolean()
  .required('You must answer this '),
  
  cost_roomrefridgerator: yup
  .number().integer('please enter integer'),
  
  
  removable_room_refridgerator: yup
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
  
  breakfast: yup
  .boolean()
  .required('You must answer this '),
  
  cost_breakfast: yup
  .number().integer('please enter integer'),
  
  
  removable_breakfast: yup
  .boolean()
  .required('You must answer this '),
  
  lunch: yup
  .boolean()
  .required('You must answer this '),
  
  cost_lunch: yup
  .number().integer('please enter integer'),
  
  
  removable_lunch: yup
  .boolean()
  .required('You must answer this '),
  
  dinner: yup
  .boolean()
  .required('You must answer this '),
  
  cost_dinner: yup
  .number().integer('please enter integer'),
  
  
  removable_dinner: yup
  .boolean()
  .required('You must answer this '),
  
  laundry: yup
  .boolean()
  .required('You must answer this '),
  
  cost_laundry: yup
  .number().integer('please enter integer'),
  
  
  iron: yup
  .boolean()
  .required('You must answer this '),
  
  cost_iron: yup
  .number().integer('please enter integer'),
  
  
  room_cleaning: yup
  .boolean()
  .required('You must answer this '),
  
  cost_cleaning: yup
  .number().integer('please enter integer'),
  
  
  capacity: yup
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

  gender: yup
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
  
  veg_food: yup
  .boolean()
  .required('You must answer this '),
  
  nonveg_food: yup
  .boolean()
  .required('You must answer this '),
  
  seller_price: yup
  .number().integer('please enter integer'),
  
  
  owner_discount: yup
  .number().integer('please enter integer'),
  
  guest_allowed: yup
  .boolean()
  .required('You must answer this '),
  
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

function RoomForm (props){
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

      house_TV:'',
      cost_TV:'',
      removable_house_TV:false,

      room_TV:'',
      cost_roomTV:'',
      removable_room_TV:false,

      house_refridgerator:'',
      cost_refridgerator:'',
      removable_house_refridgerator:false,

      room_refridgerator:'',
      cost_roomrefridgerator:'',
      removable_room_refridgerator:false,

      purified_water:'',
      cost_purified_water:'',
      removable_purified_water:false,

      AC:'',
      cost_AC:'',
      removable_AC:'',

      iron:'',
      cost_iron:0,

      laundry:'',
      cost_laundry:0,

      gender:'Both Male and Female',

      geyser:'',
      cost_geyser:'',
      removable_geyser:false,

      cooler:'',
      cost_cooler:'',
      removable_cooler:false,

      breakfast:'',
      cost_breakfast:'',
      removable_breakfast:false,

      lunch:'',
      cost_lunch:'',
      removable_lunch:false,

      dinner:'',
      cost_dinner:'',
      removable_dinner:false,

      cost_electricity:'',
      cost_water:'',

      room_cleaning:'',
      cost_cleaning:'',

      capacity:'',
      balcony:0,
      separate_washroom:'',
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


      veg_food:'',
      nonveg_food:'',
      food_policy:'',

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

      guest_allowed:'',
      guest_policy:'',

      room_policy:'',

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
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcewdsfdaegds/my_rooms/${roomid}/`,config);
               
                setroom({
                  wifi:res.data.wifi,
                  cost_wifi:res.data.cost_wifi,
                  removable_wifi:res.data.removable_wifi,

                  house_TV:res.data.house_TV,
                  cost_TV:res.data.cost_TV,
                  removable_house_TV:res.data.removable_house_TV,

                  room_TV:res.data.room_TV,
                  cost_roomTV:res.data.cost_roomTV,
                  removable_room_TV:res.data.removable_room_TV,

                  house_refridgerator:res.data.house_refridgerator,
                  cost_refridgerator:res.data.cost_refridgerator,
                  removable_house_refridgerator:res.data.removable_house_refridgerator,

                  room_refridgerator:res.data.room_refridgerator,
                  cost_roomrefridgerator:res.data.cost_roomrefridgerator,
                  removable_room_refridgerator:res.data.removable_room_refridgerator,

                  purified_water:res.data.purified_water,
                  cost_purified_water:res.data.cost_purified_water,
                  removable_purified_water:res.data.removable_purified_water,

                  AC:res.data.AC,
                  cost_AC:res.data.cost_AC,
                  removable_AC:res.data.removable_AC,

                  gender:res.data.gender,

                  iron:res.data.iron,
                  cost_iron:res.data.cost_iron,

                  laundry:res.data.laundry,
                  cost_laundry:res.data.cost_laundry,

                  geyser:res.data.geyser,
                  cost_geyser:res.data.cost_geyser,
                  removable_geyser:res.data.removable_geyser,

                  cooler:res.data.cooler,
                  cost_cooler:res.data.cost_cooler,
                  removable_cooler:res.data.removable_cooler,

                  breakfast:res.data.breakfast,
                  cost_breakfast:res.data.cost_breakfast,
                  removable_breakfast:res.data.removable_breakfast,

                  lunch:res.data.lunch,
                  cost_lunch:res.data.cost_lunch,
                  removable_lunch:res.data.removable_lunch,

                  dinner:res.data.dinner,
                  cost_dinner:res.data.cost_dinner,
                  removable_dinner:res.data.removable_dinner,

                  cost_electricity:res.data.cost_electricity,
                  cost_water:res.data.cost_water,

                  room_cleaning:res.data.room_cleaning,
                  cost_cleaning:res.data.cost_cleaning,

                  capacity:res.data.capacity,
                  balcony:res.data.balcony,
                  separate_washroom:res.data.separate_washroom,
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


                  veg_food:res.data.veg_food,
                  nonveg_food:res.data.nonveg_food,
                  food_policy:res.data.food_policy,

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

                  guest_allowed:res.data.guest_allowed,
                  guest_policy:res.data.guest_policy,

                  room_policy:res.data.room_policy,

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

      house_TV:myroom.house_TV,
      cost_TV:myroom.cost_TV,
      removable_house_TV:myroom.removable_house_TV,

      gender:myroom.gender,

      room_TV:myroom.room_TV,
      cost_roomTV:myroom.cost_roomTV,
      removable_room_TV:myroom.removable_room_TV,

      house_refridgerator:myroom.house_refridgerator,
      cost_refridgerator:myroom.cost_refridgerator,
      removable_house_refridgerator:myroom.removable_house_refridgerator,

      room_refridgerator:myroom.room_refridgerator,
      cost_roomrefridgerator:myroom.cost_roomrefridgerator,
      removable_room_refridgerator:myroom.removable_room_refridgerator,

      purified_water:myroom.purified_water,
      cost_purified_water:myroom.cost_purified_water,
      removable_purified_water:myroom.removable_purified_water,

      AC:myroom.AC,
      cost_AC:myroom.cost_AC,
      removable_AC:myroom.removable_AC,

      iron:myroom.iron,
      cost_iron:myroom.cost_iron,

      laundry:myroom.laundry,
      cost_laundry:myroom.cost_laundry,

      geyser:myroom.geyser,
      cost_geyser:myroom.cost_geyser,
      removable_geyser:myroom.removable_geyser,

      cooler:myroom.cooler,
      cost_cooler:myroom.cost_cooler,
      removable_cooler:myroom.removable_cooler,

      breakfast:myroom.breakfast,
      cost_breakfast:myroom.cost_breakfast,
      removable_breakfast:myroom.removable_breakfast,

      lunch:myroom.lunch,
      cost_lunch:myroom.cost_lunch,
      removable_lunch:myroom.removable_lunch,

      dinner:myroom.dinner,
      cost_dinner:myroom.cost_dinner,
      removable_dinner:myroom.removable_dinner,

      cost_electricity:myroom.cost_electricity,
      cost_water:myroom.cost_water,

      room_cleaning:myroom.room_cleaning,
      cost_cleaning:myroom.cost_cleaning,

      capacity:myroom.capacity,
      balcony:myroom.balcony,
      separate_washroom:myroom.separate_washroom,
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


      veg_food:myroom.veg_food,
      nonveg_food:myroom.nonveg_food,
      food_policy:myroom.food_policy,

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

      guest_allowed:myroom.guest_allowed,
      guest_policy:myroom.guest_policy,

      room_policy:myroom.room_policy,

      

      

      
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let form_data = new FormData();

      
      
      setload(true)
      form_data.append('title',values.title)
      form_data.append('wifi',values.wifi)
      form_data.append('cost_wifi',values.cost_wifi)
      form_data.append('removable_wifi',values.removable_wifi)

      form_data.append('gender',values.gender)

      form_data.append('house_TV',values.house_TV)
      form_data.append('cost_TV',values.cost_TV)
      form_data.append('removable_house_TV',values.removable_house_TV)

      form_data.append('room_TV',values.room_TV)
      form_data.append('cost_roomTV',values.cost_roomTV)
      form_data.append('removable_room_TV',values.removable_room_TV)

      form_data.append('house_refridgerator',values.house_refridgerator)
      form_data.append('cost_refridgerator',values.cost_refridgerator)
      form_data.append('removable_house_refridgerator',values.removable_house_refridgerator)

      form_data.append('room_refridgerator',values.room_refridgerator)
      form_data.append('cost_roomrefridgerator',values.cost_roomrefridgerator)
      form_data.append('removable_room_refridgerator',values.removable_room_refridgerator)

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

      form_data.append('breakfast',values.breakfast)
      form_data.append('cost_breakfast',values.cost_breakfast)
      form_data.append('removable_breakfast',values.removable_breakfast)

      form_data.append('lunch',values.lunch)
      form_data.append('cost_lunch',values.cost_cooler)
      form_data.append('removable_lunch',values.removable_lunch)

      form_data.append('dinner',values.dinner)
      form_data.append('cost_dinner',values.cost_dinner)
      form_data.append('removable_dinner',values.removable_dinner)

      form_data.append('laundry',values.laundry)
      form_data.append('cost_laundry',values.cost_laundry)

      form_data.append('iron',values.iron)
      form_data.append('cost_iron',values.cost_iron)

      form_data.append('room_cleaning',values.room_cleaning)
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

      form_data.append('veg_food',values.veg_food)
      form_data.append('nonveg_food',values.nonveg_food)

      form_data.append('photo1',values.photo1)
      form_data.append('photo2',values.photo2)
      form_data.append('photo3',values.photo3)
      form_data.append('photo4',values.photo4)
      form_data.append('photo5',values.photo5)

      form_data.append('address_proof',values.address_proof)

      form_data.append('capacity',values.capacity)
      form_data.append('windows',values.windows)
      form_data.append('fans',values.fans)
      form_data.append('floor_no',values.floor_no)
      form_data.append('balcony',values.balcony)
      form_data.append('separate_washroom',values.separate_washroom)
      form_data.append('cctv_building',values.cctv_building)
      form_data.append('building_guard',values.building_guard)
      form_data.append('guest_allowed',values.guest_allowed)
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

      if(values.food_policy!='')
      {
        form_data.append('food_policy',values.food_policy)
      }
      else{
        form_data.append('food_policy','None')
      }


      if(values.room_policy!='')
      {
        form_data.append('room_policy',values.room_policy)
      }
      else{
        form_data.append('room_policy','None')
      }

      if(values.guest_policy!='')
      {
        form_data.append('guest_policy',values.guest_policy)
      }
      else{
        form_data.append('guest_policy','None')
      }

      if(values.facility!='')
      {
        form_data.append('facility',values.facility)
      }
      else{
        form_data.append('facility','None')
      }







   
      
     
      const config = {
        headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      
      if(edit===true)
      {
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcewdsfdaegds/my_rooms/${roomid}/`,form_data,config);
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
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcewdsfdaegds/my_rooms/`,form_data,config);
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
    if(formik.values.cost_roomrefridgerator!==formik.values.cost_roomrefridgerator){formik.setFieldValue('cost_roomrefridgerator',0);}
    
  
  }
,[formik.values.cost_refridgerator,formik.values.cost_roomrefridgerator])


useEffect(
  () => {
    
    if(formik.values.cost_TV!==formik.values.cost_TV){formik.setFieldValue('cost_TV',0);}
    if(formik.values.cost_roomTV!==formik.values.cost_roomTV){formik.setFieldValue('cost_roomTV',0);}
    
  
  }
,[formik.values.cost_TV,formik.values.cost_roomTV])


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
    if(formik.values.cost_breakfast!==formik.values.cost_breakfast){formik.setFieldValue('cost_breakfast',0);}
    if(formik.values.cost_lunch!==formik.values.cost_lunch){formik.setFieldValue('cost_lunch',0);}
    if(formik.values.cost_dinner!==formik.values.cost_dinner){formik.setFieldValue('cost_dinner',0);}
    if(formik.values.cost_laundry!==formik.values.cost_laundry){formik.setFieldValue('cost_laundry',0);}
    if(formik.values.cost_iron!==formik.values.cost_iron){formik.setFieldValue('cost_iron',0);}
    if(formik.values.cost_cleaning!==formik.values.cost_cleaning){formik.setFieldValue('cost_cleaning',0);}
  
  }
,[formik.values.distance1,formik.values.distance2,formik.values.cost_breakfast,formik.values.cost_laundry,formik.values.cost_lunch,formik.values.cost_dinner,formik.values.cost_cleaning,formik.values.cost_iron])



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
    return <Redirect to='/dashboard/my_rooms' />
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

        
        <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >
        
        
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Capacity of your room
          </Typography>
          
       
        <FormControl className={classes.form}>
        
            <InputLabel id="capacity">Capacity</InputLabel>
            <Select
            labelId="capacity"
            id="capacity"
            value={formik.values.capacity}
            onChange={(e) => formik.setFieldValue('capacity',e.target.value)}
            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
            helperText={formik.touched.capacity && formik.errors.capacity}
            >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            </Select>
        </FormControl>

        </Grid>
     
  

    <br />
    <br />

    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >

    

    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Who you want this room to rent?
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

        </Grid>
     

        <br />
    <br />

    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >

       
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of windows in the room
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

        </Grid>
   

        <br />

        <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >
  

   
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            No. of balcony in the room
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

        </Grid>
     

    <br />

    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >


   
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

        </Grid>
      
          
          <br />

          <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >

    
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

        </Grid>
     
    <br />

    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >

    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Category of the room
          </Typography>
         
       
        <FormControl className={classes.form}>
        
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

    <br />
    <br />

    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >

    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Bed type provided in the room
          </Typography>
        
       
        <FormControl className={classes.form}>
        
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
     

    <div><br />
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
       </div>

  <div>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Breadth of the room
        </Typography>
        <div className={classes.form}>
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
        /></div>
       </div>

  <div>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Height of the room
        </Typography>

        <div className={classes.form}>
     
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
       </div></div>

  <div>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Furniture in the room
        </Typography>
        <div className={classes.form}>
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
      </div></div>

  <div>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Description of the room
        </Typography>
        <div className={classes.form}>
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
       </div></div>




            <br />
            
            <Typography variant="h4" color="textPrimary">
              Facilities
            </Typography>
            
            <br />

           
            <Typography variant="h6" color="textPrimary">
              Electricity charge
            </Typography>
            

<div>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of electricity facility (if not any, enter 0)
        </Typography>
        <div className={classes.form}>
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
        </div></div>

  <br />

  
            <Typography variant="h6" color="textPrimary">
              Water charge
            </Typography>
           

<div>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of Water facility (if not any, enter 0)
        </Typography>
        <div className={classes.form}>
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
       </div></div>

  <br />


           
            <Typography variant="h6" color="textPrimary">
              WIFI
            </Typography>
            
            <br />
            <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >
        
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
      
      <br />

    


    {
      formik.values.wifi ? <>
      
     
      <Typography variant="body1" color="textSecondary">
      Cost of wifi facility (if not enter 0)
        </Typography>
        <div className={classes.form}>
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
        /></div>
        </>
      
  : null
    }
    
<br />
{
      formik.values.wifi ? <>
     
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

    </Grid>
    <br />

    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >

            
            <Typography variant="h6" color="textPrimary">
              TV in the house
            </Typography>
            
            <br />
      
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have house TV ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="house_TV">House TV</InputLabel>
            <Select
            labelId="house_TV"
            id="house_TV"
            value={formik.values.house_TV}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('house_TV',e.target.value);
            formik.setFieldValue('cost_TV',0);
            formik.setFieldValue('removable_house_TV',false);}
            else{formik.setFieldValue('house_TV',e.target.value)}}}
            error={formik.touched.house_TV && Boolean(formik.errors.house_TV)}
            helperText={formik.touched.house_TV && formik.errors.house_TV}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      

    


    {
      formik.values.house_TV ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of house TV facility(if not enter 0)
        </Typography>
    <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          
          fullWidth
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
        </div>
        </>
  : null
    }
    

{
      formik.values.house_TV ? <><br />
      
     
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove house TV facility?
        </Typography>
     
        <FormControl className={classes.form}>
        
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
        </>
  : null
    }


           <br />
            <Typography variant="h6" color="textPrimary">
              TV in the room
            </Typography>
           
            <br />
    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you provide TV in the room ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="room_TV">Room TV</InputLabel>
            <Select
            labelId="room_TV"
            id="room_TV"
            value={formik.values.room_TV}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('room_TV',e.target.value);
            formik.setFieldValue('cost_roomTV',0);
            formik.setFieldValue('removable_room_TV',false);}
            else{formik.setFieldValue('room_TV',e.target.value)}}}
            error={formik.touched.room_TV && Boolean(formik.errors.room_TV)}
            helperText={formik.touched.room_TV && formik.errors.room_TV}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      
    


    {
      formik.values.room_TV ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of room TV facility(if not enter 0)
        </Typography>
     <div className={classes.form}>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           
           fullWidth
          rows={1}
          id="cost_roomTV"
          name="cost_roomTV"
          label="Cost of room TV facility"
          value={formik.values.cost_roomTV}
          onChange={(e) => {formik.setFieldValue('cost_roomTV',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_roomTV && Boolean(formik.errors.cost_roomTV)}
          helperText={formik.touched.cost_roomTV && formik.errors.cost_roomTV}
        /></div>
        </>
  : null
    }
    

{
      formik.values.room_TV ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove room TV facility?
        </Typography>
      
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_room_TV">Removable room TV facility?</InputLabel>
            <Select
            labelId="removable_room_TV"
            id="removable_room_TV"
            value={formik.values.removable_room_TV}
            onChange={(e) => {
            formik.setFieldValue('removable_room_TV',e.target.value)}}
            error={formik.touched.removable_room_TV && Boolean(formik.errors.removable_room_TV)}
            helperText={formik.touched.removable_room_TV && formik.errors.removable_room_TV}
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
            Refridgerator in the house
          </Typography>
          
          <br />
   
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
          Do you have house refridgerator ?
      </Typography>
      
      <FormControl className={classes.form}>
      
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
   

  


  {
    formik.values.house_refridgerator ? <><br />
    <Typography variant="body1" color="textSecondary" className={classes.textclass}>
    Cost of house refridgerator facility(if not enter 0)
      </Typography>
    <div className={classes.form}>
      <TextField
          multiline
           variant="outlined"
           margin="normal"
           fullWidth
        rows={1}
        id="cost_refridgerator"
        name="cost_refridgerator"
        label="Cost of house refridgerator facility"
        value={formik.values.cost_refridgerator}
        onChange={(e) => {formik.setFieldValue('cost_refridgerator',parseInt(e.target.value)); 
          }}
        error={formik.touched.cost_refridgerator && Boolean(formik.errors.cost_refridgerator)}
        helperText={formik.touched.cost_refridgerator && formik.errors.cost_refridgerator}
      /></div>
     </>
: null
  }
  

{
    formik.values.house_refridgerator ? <><br />
    <Typography variant="body1" color="textSecondary" className={classes.textclass}>
    Can customers remove house refridgerator facility?
      </Typography>
   
      <FormControl className={classes.form}>
      
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
     </>
: null
  }

<br />
          
          <Typography variant="h6" color="textPrimary">
            Refridgerator in the room
          </Typography>
          
          <br />
    
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
          Do you provide refridgerator in the room ?
      </Typography>
      
      <FormControl className={classes.form}>
      
          <InputLabel id="room_refridgerator">Room refridgerator</InputLabel>
          <Select
          labelId="room_refridgerator"
          id="room_refridgerator"
          value={formik.values.room_refridgerator}
          onChange={(e) => {if(e.target.value===false){formik.setFieldValue('room_refridgerator',e.target.value);
          formik.setFieldValue('cost_roomrefridgerator',0);
          formik.setFieldValue('removable_room_refridgerator',false);}
          else{formik.setFieldValue('room_refridgerator',e.target.value)}}}
          error={formik.touched.room_refridgerator && Boolean(formik.errors.room_refridgerator)}
          helperText={formik.touched.room_refridgerator && formik.errors.room_refridgerator}
          >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
          </Select>
      </FormControl>
   

  


  {
    formik.values.room_refridgerator ? <><br />
    <Typography variant="body1" color="textSecondary" className={classes.textclass}>
    Cost of room refridgerator facility(if not enter 0)
      </Typography>
   <div className={classes.form}>
      <TextField
         multiline
         variant="outlined"
         margin="normal"
         fullWidth
        rows={1}
        id="cost_roomrefridgerator"
        name="cost_roomrefridgerator"
        label="Cost of room refridgerator facility"
        value={formik.values.cost_roomrefridgerator}
        onChange={(e) => {formik.setFieldValue('cost_roomrefridgerator',parseInt(e.target.value)); 
          }}
        error={formik.touched.cost_roomrefridgerator && Boolean(formik.errors.cost_roomrefridgerator)}
        helperText={formik.touched.cost_roomrefridgerator && formik.errors.cost_roomrefridgerator}
      /></div>
      </>
: null
  }
  

{
    formik.values.room_refridgerator ? <><br />
    <Typography variant="body1" color="textSecondary" className={classes.textclass}>
    Can customers remove room refridgerator facility?
      </Typography>
    
      <FormControl className={classes.form}>
      
          <InputLabel id="removable_room_refridgerator">Removable room refridgerator facility?</InputLabel>
          <Select
          labelId="removable_room_refridgerator"
          id="removable_room_refridgerator"
          value={formik.values.removable_room_refridgerator}
          onChange={(e) => {
          formik.setFieldValue('removable_room_refridgerator',e.target.value)}}
          error={formik.touched.removable_room_refridgerator && Boolean(formik.errors.removable_room_refridgerator)}
          helperText={formik.touched.removable_room_refridgerator && formik.errors.removable_room_refridgerator}
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
      Cost of purified water facility (if not enter 0)
        </Typography>
     <div className={classes.form}>
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
        /></div>
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
            formik.setFieldValue('removable_AC',false);}
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
      Cost of AC facility (if not enter 0)
        </Typography>
     <div className={classes.form}>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
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
        /></div>
        </>
  : null
    }
    

{
      formik.values.AC ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
      
        <FormControl className={classes.form}>
        
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
       </>
  : null
    }
    <br />


            <Typography variant="h6" color="textPrimary">
              Geyser
            </Typography>
           
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have geyser ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="geyser">Geyser</InputLabel>
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
     
    


    {
      formik.values.geyser ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of geyser facility(if not enter 0)
        </Typography>
     <div className={classes.form}>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
          rows={1}
          id="cost_geyser"
          name="cost_geyser"
          label="Cost of geyser geyser"
          value={formik.values.cost_geyser}
          onChange={(e) => {formik.setFieldValue('cost_geyser',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_geyser && Boolean(formik.errors.cost_geyser)}
          helperText={formik.touched.cost_geyser && formik.errors.cost_geyser}
        /></div>
       </>
  : null
    }
    

{
      formik.values.geyser ? <><br />
      
      
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this geyser?
        </Typography>
     
        <FormControl className={classes.form}>
        
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
        </>
  : null
    }
    <br />

            <Typography variant="h6" color="textPrimary">
              Cooler
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
      <div className={classes.form}>
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
        /></div>
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
              Breakfast
            </Typography>
            
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have breakfast ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="breakfast">breakfast</InputLabel>
            <Select
            labelId="breakfast"
            id="breakfast"
            value={formik.values.breakfast}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('breakfast',e.target.value);
            formik.setFieldValue('cost_breakfast',0);
            formik.setFieldValue('removable_breakfast',false);}
            else{formik.setFieldValue('breakfast',e.target.value)}}}
            error={formik.touched.breakfast && Boolean(formik.errors.breakfast)}
            helperText={formik.touched.breakfast && formik.errors.breakfast}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.breakfast ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of breakfast facility(if not enter 0)
        </Typography>
     <div className={classes.form}>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
          rows={1}
          id="cost_breakfast"
          name="cost_breakfast"
          label="Cost of breakfast facility"
          value={formik.values.cost_breakfast}
          onChange={(e) => {formik.setFieldValue('cost_breakfast',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_breakfast && Boolean(formik.errors.cost_breakfast)}
          helperText={formik.touched.cost_breakfast && formik.errors.cost_breakfast}
        /></div>
       </>
  : null
    }
    

{
      formik.values.breakfast ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
     
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_breakfast">Removable breakfast facility?</InputLabel>
            <Select
            labelId="removable_breakfast"
            id="removable_breakfast"
            value={formik.values.removable_breakfast}
            onChange={(e) => {
            formik.setFieldValue('removable_breakfast',e.target.value)}}
            error={formik.touched.removable_breakfast && Boolean(formik.errors.removable_breakfast)}
            helperText={formik.touched.removable_breakfast && formik.errors.removable_breakfast}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
       </>
  : null
    }

            <Typography variant="h6" color="textPrimary">
              Lunch
            </Typography>
         
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have lunch ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="lunch">lunch</InputLabel>
            <Select
            labelId="lunch"
            id="lunch"
            value={formik.values.lunch}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('lunch',e.target.value);
            formik.setFieldValue('cost_lunch',0);
            formik.setFieldValue('removable_lunch',false);}
            else{formik.setFieldValue('lunch',e.target.value)}}}
            error={formik.touched.lunch && Boolean(formik.errors.lunch)}
            helperText={formik.touched.lunch && formik.errors.lunch}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.lunch ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of lunch facility(if not enter 0)
        </Typography>
      <div className={classes.form}>
        <TextField
         multiline
         variant="outlined"
         margin="normal"
         fullWidth
          rows={1}
          id="cost_lunch"
          name="cost_lunch"
          label="Cost of lunch facility"
          value={formik.values.cost_lunch}
          onChange={(e) => {formik.setFieldValue('cost_lunch',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_lunch && Boolean(formik.errors.cost_lunch)}
          helperText={formik.touched.cost_lunch && formik.errors.cost_lunch}
        /></div>
        </>
  : null
    }
    

{
      formik.values.lunch ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
     
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_lunch">Removable lunch facility?</InputLabel>
            <Select
            labelId="removable_lunch"
            id="removable_lunch"
            value={formik.values.removable_lunch}
            onChange={(e) => {
            formik.setFieldValue('removable_lunch',e.target.value)}}
            error={formik.touched.removable_lunch && Boolean(formik.errors.removable_lunch)}
            helperText={formik.touched.removable_lunch && formik.errors.removable_lunch}
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
              Dinner
            </Typography>
            
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have dinner ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="dinner">dinner</InputLabel>
            <Select
            labelId="dinner"
            id="dinner"
            value={formik.values.dinner}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('dinner',e.target.value);
            formik.setFieldValue('cost_dinner',0);
            formik.setFieldValue('removable_dinner',false);}
            else{formik.setFieldValue('dinner',e.target.value)}}}
            error={formik.touched.dinner && Boolean(formik.errors.dinner)}
            helperText={formik.touched.dinner && formik.errors.dinner}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
   

    


    {
      formik.values.dinner ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of dinner facility (if not enter 0)
        </Typography>
      <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          fullWidth
          rows={1}
          id="cost_dinner"
          name="cost_dinner"
          label="Cost of dinner facility"
          value={formik.values.cost_dinner}
          onChange={(e) => {formik.setFieldValue('cost_dinner',parseInt(e.target.value)); 
          }}
          error={formik.touched.cost_dinner && Boolean(formik.errors.cost_dinner)}
          helperText={formik.touched.cost_dinner && formik.errors.cost_dinner}
        /></div>
      </>
  : null
    }
    

{
      formik.values.dinner ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Can customers remove this facility?
        </Typography>
     
        <FormControl className={classes.form}>
        
            <InputLabel id="removable_dinner">Removable dinner facility?</InputLabel>
            <Select
            labelId="removable_dinner"
            id="removable_dinner"
            value={formik.values.removable_dinner}
            onChange={(e) => {
            formik.setFieldValue('removable_dinner',e.target.value)}}
            error={formik.touched.removable_dinner && Boolean(formik.errors.removable_dinner)}
            helperText={formik.touched.removable_dinner && formik.errors.removable_dinner}
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
              Laundry
            </Typography>
        
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have laundry ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="laundry">laundry</InputLabel>
            <Select
            labelId="laundry"
            id="laundry"
            value={formik.values.laundry}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('laundry',e.target.value);
            formik.setFieldValue('cost_laundry',0);}
            else{formik.setFieldValue('laundry',e.target.value)}}}
            error={formik.touched.laundry && Boolean(formik.errors.laundry)}
            helperText={formik.touched.laundry && formik.errors.laundry}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     
    


    {
      formik.values.laundry ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of laundry facility (in /kg/use)
        </Typography>
     <div className={classes.form}>
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
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
        /></div>
      </>
  : null
    }
<br />
            <Typography variant="h6" color="textPrimary">
              Iron
            </Typography>
            
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you have iron ?
        </Typography>
        
        <FormControl className={classes.form}>
        
            <InputLabel id="iron">iron</InputLabel>
            <Select
            labelId="iron"
            id="iron"
            value={formik.values.iron}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('iron',e.target.value);
            formik.setFieldValue('cost_iron',0);}
            else{formik.setFieldValue('iron',e.target.value)}}}
            error={formik.touched.iron && Boolean(formik.errors.iron)}
            helperText={formik.touched.iron && formik.errors.iron}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.iron ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of iron facility (in /kg/use)
        </Typography>
      <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          fullWidth
          rows={1}
          id="cost_iron"
          name="cost_iron"
          label="Cost of iron facility"
          value={formik.values.cost_iron}
          onChange={(e) => {formik.setFieldValue('cost_iron',parseInt(e.target.value)); 
          }}
          onChange={formik.handleChange}
          error={formik.touched.cost_iron && Boolean(formik.errors.cost_iron)}
          helperText={formik.touched.cost_iron && formik.errors.cost_iron}
        /></div>
      </>
  : null
    }
    <br />


            <Typography variant="h6" color="textPrimary">
               Room cleaning
            </Typography>
           
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you provide room cleaning ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="room_cleaning">Room cleaning</InputLabel>
            <Select
            labelId="room_cleaning"
            id="room_cleaning"
            value={formik.values.room_cleaning}
            onChange={(e) => {if(e.target.value===false){formik.setFieldValue('room_cleaning',e.target.value);
            formik.setFieldValue('cost_cleaning',0);}
            else{formik.setFieldValue('room_cleaning',e.target.value)}}}
            error={formik.touched.room_cleaning && Boolean(formik.errors.room_cleaning)}
            helperText={formik.touched.room_cleaning && formik.errors.room_cleaning}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

    


    {
      formik.values.room_cleaning ? <><br />
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Cost of room cleaning facility (in per cleaning)
        </Typography>
     <div className={classes.form}>
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
        /></div>
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
        
            <InputLabel id="building_guard">Building Guard</InputLabel>
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
     

 <br />
      
 <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any additional facility
        </Typography>
    <div className={classes.form}>
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
        /></div>
        </>

  <br />


            <Typography variant="h4" color="textPrimary">
              Pricing
            </Typography>
           
            
    
            <br />
    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any discount you want to provide (in %)
        </Typography>
     <div className={classes.form}>
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
        /></div>
      </>
      <br />
  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Price (excluding facilities charge and discount)
        </Typography>
     <div className={classes.form}>
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
        /></div>
       </>
<br />

  
            <Typography variant="h4" color="textPrimary">
              Food
            </Typography>
            
            <br />
     
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you provide Veg food ?
        </Typography>
        
        <FormControl className={classes.form}>
        
            <InputLabel id="veg_food">Veg Food</InputLabel>
            <Select
            labelId="veg_food"
            id="veg_food"
            value={formik.values.veg_food}
            onChange={(e) => {
            formik.setFieldValue('veg_food',e.target.value)}}
            error={formik.touched.veg_food && Boolean(formik.errors.veg_food)}
            helperText={formik.touched.veg_food && formik.errors.veg_food}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
     

   
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you provide Non-Veg food ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="nonveg_food">Non-veg Food</InputLabel>
            <Select
            labelId="nonveg_food"
            id="nonveg_food"
            value={formik.values.nonveg_food}
            onChange={(e) => {
            formik.setFieldValue('nonveg_food',e.target.value)}}
            error={formik.touched.nonveg_food && Boolean(formik.errors.nonveg_food)}
            helperText={formik.touched.nonveg_food && formik.errors.nonveg_food}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      
        <br />
    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any food policy or schedule or rules
        </Typography>
     <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          fullWidth
          rows={5}
          id="food_policy"
          name="food_policy"
          label="Food policy"
          value={formik.values.food_policy}
          onChange={formik.handleChange}
          
        /></div>
        </>

<br />
  
            <Typography variant="h4" color="textPrimary">
              Guest
            </Typography>
           
            <br />
    
        <Typography variant="body1" color="textSecondary" className={classes.textclass}>
            Do you allow guest in the room ?
        </Typography>
       
        <FormControl className={classes.form}>
        
            <InputLabel id="guest_allowed">Guest allowed</InputLabel>
            <Select
            labelId="guest_allowed"
            id="guest_allowed"
            value={formik.values.guest_allowed}
            onChange={(e) => {
            formik.setFieldValue('guest_allowed',e.target.value)}}
            error={formik.touched.guest_allowed && Boolean(formik.errors.guest_allowed)}
            helperText={formik.touched.guest_allowed && formik.errors.guest_allowed}
            >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
      
        <br />
    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any guest policy or rules?
        </Typography>
              <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          fullWidth
          rows={5}
          id="guest_policy"
          name="guest_policy"
          label="Guest policy"
          value={formik.values.guest_policy}
          onChange={formik.handleChange}
          
        /></div>
     </>

  <br />


            <Typography variant="h4" color="textPrimary">
              Regarding room
            </Typography>
       
            <br />
      

    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Any room policy or rules?
        </Typography>
     <div className={classes.form}>
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          fullWidth
          rows={5}
          id="room_policy"
          name="room_policy"
          label="room policy"
          value={formik.values.room_policy}
          onChange={formik.handleChange}
          
        /></div>
       </>

<br />
            <Typography variant="h4" color="textPrimary">
              Location
            </Typography>
            
            <br />
            <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Full Address
        </Typography>
      <div className={classes.form}>
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
          
        /></div>
       </>
  <br />


    <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      City name
        </Typography>
      <div className={classes.form}>
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
          
        /></div>
        </>
  <br />
  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      State name
        </Typography>
     <div className={classes.form}>
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
          
        /></div>
        </>

<br />
  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Country name
        </Typography>
     <div className={classes.form}>
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
          
        /></div>
       </>
  <br />

  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Landmark
        </Typography>
      <div className={classes.form}>
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
          
        /></div>
        </>

  <br />
  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Pincode
        </Typography>
      <div className={classes.form}>
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
          
        /></div>
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
      Kindly, mark the location of your house in the map to provide better facilites and optimisation (required*).
     
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
    <div className={classes.form}>
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
          
        /></div>
       </>


  <br />

  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Distance from station 1 (in km)
        </Typography>
      <div className={classes.form}>
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
          
        /></div>
       </>


  <br />


  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Nearby station 2
        </Typography>
      <div className={classes.form}>
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
          
        /></div>
       </>


  <br />

  <>
      <Typography variant="body1" color="textSecondary" className={classes.textclass}>
      Distance from station 2 (in km)
        </Typography>
      <div className={classes.form}>
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
          
        /></div>
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

export default connect(mapStateToProps)(RoomForm)
