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
import Eror from './eror'
import MapForm from './map_form'

const validationSchema = yup.object({
  

    title: yup
    .string('Enter yourRoom name')
    .required('Room name is required'),

    

    
});

const useStyles = makeStyles({
    myclass: {
        marginTop:'10%'
    },
    imageclass: {
      width:'350px',
      borderRadius:'35%',
    },
    erorclass: {
      width:'50%',
      marginLeft:'25%',
  },
  buttonclass:{
    padding:0,
    borderRadius:'35%',
    
    }
  });

function RoomForm (props){
    const classes = useStyles();
    const hiddenFileInput1 = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const hiddenFileInput3 = React.useRef(null);
    const hiddenFileInput4 = React.useRef(null);
    const hiddenFileInput5 = React.useRef(null);
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
      removable_AC:false,

      iron:'',
      cost_iron:'',

      laundry:'',
      cost_laundry:'',

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
      balcony:'',
      separate_washroom:'',
      title:'',
      seller_price:'',
      owner_discount:'',
      bed_type:'',
      length:'',
      breadth:'',
      height:'',
      building_guard:'',
      category:'',
      cctv_building:'',
      windows:'',
      power_backup:'',
      furniture:'',
      facility:'',
      description:'',
      fans:'',
      floor_no:'',


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
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/${roomid}/`,config);
                console.log(res.data)
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
      
                }
        }
    }
    
    ,[props.profile])

  

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      wifi:myroom.wifi,
      cost_wifi:myroom.cost_wifi,
      removable_wifi:myroom.removable_wifi,

      house_TV:myroom.house_TV,
      cost_TV:myroom.cost_TV,
      removable_house_TV:myroom.removable_house_TV,

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
      bed_type:myroom.bed_type,
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

      guest_allowed:myroom.guest_allowed,
      guest_policy:myroom.guest_policy,

      room_policy:myroom.room_policy,

      address_proof:myroom.address_proof,

      photo1:myroom.photo1,
      photo2:myroom.photo2,
      photo3:myroom.photo3,
      photo4:myroom.photo4,
      photo5:myroom.photo5,
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let form_data = new FormData();
      
      console.log(form_data.entries())
      const config = {
        headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };

      
      if(edit===true)
      {
        try{const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/${props.profile.id}/`,form_data,config);
              
          setredirect(true)
              
              }
                catch{
                  console.log('error')
                  seterror(true)
                }
      }
      else{
        try{const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/`,form_data,config);
              
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
        
        <input type='file'  ref={hiddenFileInput1} style={{display:'none'}}  id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file1: URL.createObjectURL(event.target.files[0]),photo1:event.target.files[0]})}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput2.current.click();}}>
          <img src={myroom.file2} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput2} style={{display:'none'}}  id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file2: URL.createObjectURL(event.target.files[0]),photo2:event.target.files[0]})}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput3.current.click();}}>
          <img src={myroom.file3} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput3} style={{display:'none'}}  id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file3: URL.createObjectURL(event.target.files[0]),photo3:event.target.files[0]})}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput4.current.click();}}>
          <img src={myroom.file4} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput4} style={{display:'none'}}  id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file4: URL.createObjectURL(event.target.files[0]),photo4:event.target.files[0]})}}/> 
        
        </Grid>

        <Grid item className={classes.imageclass}>

        <Button variant='contained' className={classes.buttonclass} onClick={(e) => {hiddenFileInput5.current.click();}}>
          <img src={myroom.file5} className={classes.imageclass}/>
          </Button>
        
        <input type='file'  ref={hiddenFileInput5} style={{display:'none'}}  id='photo' accept='image/png,image/jpeg,image/jpg' onChange={(event) => {console.log(event.currentTarget.files[0]);
  setroom({...myroom,file5: URL.createObjectURL(event.target.files[0]),photo5:event.target.files[0]})}}/> 
        
        </Grid>


      </Grid>


        <br />
        <br />
          <Grid item>
        <TextField
          multiline
          rows={1}
          id="title"
          name="title"
          label="Room name"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        </Grid>
        
        

        
        <br />
        <MapForm />
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

export default connect(mapStateToProps)(RoomForm)
