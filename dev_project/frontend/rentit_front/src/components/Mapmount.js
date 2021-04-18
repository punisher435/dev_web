import React,{useState,useEffect} from 'react'
import Mapview from './mapview';
import Spinner from './Spinner';
import Eror from './eror';

import axios from 'axios';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

function Mapmount({filters,setfilters}) {

    const [loading,setloading] = useState(false);
    const [error,seterror] = useState('');
    const [rooms,setrooms] = useState({});
    useEffect(
        async () => {
            setloading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
              };
              try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceadbeios287y19/rooms/location/`,{
                params:{
                  room_cleaning:filters.room_cleaning,
                  booked:filters.booked,
                  min_price:filters.min_price,
                  max_price:filters.max_price,
                  category:filters.category,
                  nonveg_food:filters.nonveg_food,
                  veg_food:filters.veg_food,
                  bookedtill:filters.bookedtill,
                  min_rating:filters.min_rating,
                  capacity_filter:filters.capacity_filter,
                  trust_points_filter:filters.trust_points_filter,
                  windows_filter:filters.windows,
                  building_guard:filters.building_guard,
                  cctv_building:filters.cctv_building,
                  iron:filters.iron,
                  laundry:filters.laundry,
                  cooler:filters.cooler,
                  AC:filters.AC,
                  room_TV:filters.room_TV,
                  power_backup:filters.power_backup,
                  purified_water:filters.purified_water,
                  balcony:filters.balcony,
                  separate_washroom:filters.separate_washroom,
                  wifi:filters.wifi,
                  breakfast:filters.breakfast,
                  lunch:filters.lunch,
                  dinner:filters.dinner,
                  house_TV:filters.house_TV,
                  geyser:filters.geyser,
                  guest_allowed:filters.guest_allowed,
                  floor_filter:filters.floor_filter,
                  search:filters.search,
                  ordering:filters.ordering,
                },
                config:config
              });
          
              
             
              const points = res.data.map(room => ({
                type: "Feature",
                properties: { cluster: false, roomId: room.room_id, category: room.category,title: room.title },
                geometry: {
                  type: "Point",
                  lng:parseFloat(room.longitude),
                  lat:parseFloat(room.latitude),
                }
              }));
              setrooms(points);
              
            }
              
              catch{
                seterror('Error');
              }
            
            setloading(false);
            

        }
    ,[filters])


    if(loading===true)
    {
        return <Spinner loading={loading} />
    }
    if(error!=='')
    {
        return <Eror eror={error}/>
    }

    if(rooms!=={})
    {
        
        return <Mapview url={'rooms'} point={rooms}/>
    }


    return (
        <div>
            
        </div>
    )
}

export default Mapmount;