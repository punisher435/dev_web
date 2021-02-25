import React, { useState, useEffect } from 'react';
/* import Pagination from '../components/Pagination'; */
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ResponsiveDrawer from './searchlist_apartment';
import Eror from '../components/eror';

import { connect } from 'react-redux'
import { getDayOfYear } from 'date-fns';

axios.defaults.xsrfHeaderName = `${process.env.XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.CSRF_COOKIE}`;

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
    
    laundry:'',
    cooler:'',
    AC:'',
    
    power_backup:'',

    floor_filter:'',
    house_refridgerator:'',
    washroom_filter:'',
    beds_filter:'',
    rooms_filter:'',
    cooler_filter:'',
    geyser_filter:'',
    AC_filter:'',
    TV_filter:'',
    sofa:'',
    apartment_type:'',

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
    
    TV:'',
    geyser:'',
    electricity:'',
    country:'',
    min_price:'',
    max_price:'',
    BHK_filter:'',
    trust_points_filter:'',
    booked:false,
    windows:'',
    bookedtill:`${date.getFullYear()}-${x}-${y}`,
    search:'',
    apartment_cleaning:'',
    ordering:'-trust_points',
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
      try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcebvdfesl2746/apartments/`,{
        params:{
          apartment_cleaning:filters.apartment_cleaning,
          page:currentPage,
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

      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcghfhf4/minmax_apartment/1/`,{
        config:config
      });

      
      setmax_price(res2.data.max_price);
      setmin_price(res2.data.min_price);
      console.log(res.data.results)
      setPosts(res.data.results);
      setLoading(false);
      settotalPosts(res.data.count);
      }
      catch{
        setError('An error occurred');
      }
    }
    };
    console.log('hy')


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
        await axios.put(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/1/`,config,config)
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

  return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
        <Grid item lg={12} xs={12}>
        <ResponsiveDrawer mapview={mapview} setmap={setmap} setfilters={setfilters} max_price={max_price} min_price={min_price} filters={filters} posts={posts} loading={loading} paginate={paginate} postsPerPage={postsPerPage} currentPage={currentPage} totalposts={totalposts} wishlistitems={wishlistitems} cartitems={cartitems} changeitemswishlist={changeitemswishlist} changeitemscart={changeitemscart}/>
        

        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        /> */}
      </Grid>
      </Grid>
  );
};


const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  access: state.authreducers.access
});

export default connect(mapStateToProps)(App);