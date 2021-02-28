import React, { useState, useEffect } from 'react';
/* import Pagination from '../components/Pagination'; */
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ResponsiveDrawer from './searchlist';
import Eror from '../components/eror';
import Bookcardmodel from '../components/bookcardmodel1';

import { connect } from 'react-redux'
import { getDayOfYear } from 'date-fns';
import {Redirect} from 'react-router-dom'

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const App = ({isAuthenticated}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [totalposts, settotalPosts] = useState(0);
  const [max_price, setmax_price] = useState(0);
  const [min_price, setmin_price] = useState(0);

  const [mapview,setmap] = useState(false);

  const [error, setError] = useState('');
  const [wishlistitems,changeitemswishlist] = useState(0)
  const [cartitems,changeitemscart] = useState(0)
  const [mypost,setmypost] = useState()
  const [openmycard,setmycard] = useState(false)
  const [loginpage,setloginpage] = useState(false)

  const date = new Date(Date.now())

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

  const [filters, setfilters] = useState({
    nonveg_food:'',
    veg_food:'',
    guest_allowed:'',
    iron:'',
    laundry:'',
    cooler:'',
    AC:'',
    room_TV:'',
    power_backup:'',
    floor_filter:'',
    purified_water:'',
    min_rating:'',
    cctv_building:'',
    bed_type:'',
    building_guard:'',
    balcony:'',
    separate_washroom:'',
    category:'',
    location:'',
    city:'',
    state:'',
    wifi:'',
    breakfast:'',
    lunch:'',
    dinner:'',
    house_TV:'',
    geyser:'',
    electricity:'',
    country:'',
    min_price:'',
    max_price:'',
    capacity_filter:'',
    trust_points_filter:'',
    booked:false,
    windows:'',
    bookedtill:`${date.getFullYear()}-${x}-${y}`,
    search:'',
    room_cleaning:'',
    ordering:'-trust_points',
    gender:'Any',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      const page = currentPage
      /* const params = new URLSearchParams([page,currentPage]) */
      if(mapview===false){
      try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/`,{
        params:{
          room_cleaning:filters.room_cleaning,
          page:currentPage,
          booked:filters.booked,
          min_price:filters.min_price,
          max_price:filters.max_price,
          category:filters.category,
          nonveg_food:filters.nonveg_food,
          veg_food:filters.veg_food,
          bookedtill_filter:filters.bookedtill,
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
          balcony_filter:filters.balcony,
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
          gender:filters.gender,

        },
        config:config
      });

      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcekadwbda24/minmax_room/1/`,{
        config:config
      });

      
      setmax_price(res2.data.max_price);
      setmin_price(res2.data.min_price);
      
      setPosts(res.data.results);
      setLoading(false);
      settotalPosts(res.data.count);
      }
      catch{
        setError('An error occurred');
      }
    }
    };
   


    fetchPosts();
  }, [currentPage,filters]);


  useEffect(async () => {
    if(isAuthenticated){
    const config = {
      headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
      },
    };
    
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/souraawdgrg33w24/wishlist/rooms/1/`,config,config)
        .then(res1 => {
          changeitemswishlist(res1.data);
        })
        .catch(err => {
          
        })
        
        }
        catch{
        }
    }

  },[isAuthenticated])

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if(error!=='')
  {
    return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
        <Grid item xs={5}><Eror eror={error}/></Grid>
      </Grid>
    );
  }
  if(loginpage)
  {
    return <Redirect to='/login' />
  }

  return (
    <div>
    <Bookcardmodel open={openmycard} change={setmycard} details={mypost} loginpage={loginpage} setloginpage={setloginpage}/>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
        <Grid item lg={12} xs={12}>
        <ResponsiveDrawer mypost={mypost} setmypost={setmypost} openmycard={openmycard} setmycard={setmycard} mapview={mapview} setmap={setmap} setfilters={setfilters} max_price={max_price} min_price={min_price} filters={filters} posts={posts} loading={loading} paginate={paginate} postsPerPage={postsPerPage} currentPage={currentPage} totalposts={totalposts} wishlistitems={wishlistitems} cartitems={cartitems} changeitemswishlist={changeitemswishlist} changeitemscart={changeitemscart}/>
        

        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        /> */}
      </Grid>
      </Grid>

      </div>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  access: state.authreducers.access
});

export default connect(mapStateToProps)(App);