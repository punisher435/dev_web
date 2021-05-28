import React,{useState,useEffect} from 'react'
import Mapview from './mapview';
import Spinner from './Spinner';
import Eror from './eror';
import Load1 from './Spinner';

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
              try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcewadjkj2i1dand/apartments/location/`,{
                params:{
                    apartment_cleaning:filters.apartment_cleaning,
              
                    booked:filters.booked,
                    min_price:filters.min_price,
                    max_price:filters.max_price,
                    category:filters.category,
                    
                    bookedtill_filter:filters.bookedtill,
                    min_rating:filters.min_rating,
                    BHK_filter:filters.BHK_filter,
                    trust_points_filter:filters.trust_points_filter,
                    windows_filter:filters.windows,
                    building_guard:filters.building_guard,
                    cctv_building:filters.cctv_building,
                    
                    laundry:filters.laundry,
                    cooler:filters.cooler,
                    AC:filters.AC,
                    TV:filters.TV,
                    power_backup:filters.power_backup,
                    purified_water:filters.purified_water,
                    balcony_filter:filters.balcony,
                    separate_washroom:filters.separate_washroom,
                    wifi:filters.wifi,
                    
                    geyser:filters.geyser,
                    floor_filter:filters.floor_filter,
                    search:filters.search,
                    ordering:filters.ordering,
          
                    floor_filter:filters.floor_filter,
                  house_refridgerator:filters.house_refridgerator,
                  washroom_filter:filters.washroom_filter,
                  beds_filter:filters.beds_filter,
                  rooms_filter:filters.rooms_filter,
                  cooler_filter:filters.cooler_filter,
                  geyser_filter:filters.geyser_filter,
                  AC_filter:filters.AC_filter,
                  TV_filter:filters.TV_filter,
                  sofa:filters.sofa,
                  apartment_type:filters.apartment_type,
                  },
                config:config
              });
          
              
            
              const points = res.data.map(room => ({
                type: "Feature",
                properties: { cluster: false, roomId: room.apartment_id, category: room.apartment_type,title: room.title },
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
    
        return <Mapview url={'housing'} point={rooms}/>
    }


    return (
        <div>
            <Load1 loading={true} />
        </div>
    )
}

export default Mapmount;