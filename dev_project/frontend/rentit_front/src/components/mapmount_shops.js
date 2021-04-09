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
              try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaklneqns83bdz/shops/location/`,{
                params:{
                    shop_cleaning:filters.shop_cleaning,
                    booked:filters.booked,
                    min_price:filters.min_price,
                    max_price:filters.max_price,
                    category:filters.category,
          
                    room_filter:filters.room_filter,
                    washroom_filter:filters.washroom_filter,
                    
                    bookedtill_filter:filters.bookedtill,
                    min_rating:filters.min_rating,
                   
                    trust_points_filter:filters.trust_points_filter,
                    windows_filter:filters.windows,
                    building_guard:filters.building_guard,
                    cctv_building:filters.cctv_building,
          
                    cooler:filters.cooler,
                    AC:filters.AC,
                    TV:filters.TV,
                    power_backup:filters.power_backup,
                    purified_water:filters.purified_water,
                    balcony_filter:filters.balcony_filter,
                    separate_washroom:filters.separate_washroom,
                    wifi:filters.wifi,
                
                    floor_filter:filters.floor_filter,
                    search:filters.search,
                    ordering:filters.ordering,
                  },
                config:config
              });
          
              
              console.log(res.data)
              const points = res.data.map(room => ({
                type: "Feature",
                properties: { cluster: false, roomId: room.shop_id, category: room.category,title: room.title },
                geometry: {
                  type: "Point",
                  lng:parseFloat(room.longitude),
                  lat:parseFloat(room.latitude),
                }
              }));
              setrooms(points);
              console.log(rooms);
              console.log(points);
            }
              
              catch{
                seterror('Error');
              }
            
            setloading(false);
            console.log(rooms);

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
        console.log('hy');
        return <Mapview url={'shops'} point={rooms}/>
    }


    return (
        <div>
            
        </div>
    )
}

export default Mapmount;