import React, { useState, useEffect } from 'react';
/* import Pagination from '../components/Pagination'; */
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ResponsiveDrawer from './searchlist';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [totalposts, settotalPosts] = useState(0);
  const [max_price, setmax_price] = useState(0);
  const [min_price, setmin_price] = useState(0);

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
    bookedtill:'',
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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/`,{
        params:{
          page:currentPage,
          booked:filters.booked,
          min_price:filters.min_price,
          max_price:filters.max_price,
          category:filters.category,
          nonveg_food:filters.nonveg_food,
          veg_food:filters.veg_food,
          bookedtill:filters.bookedtill,
          min_rating:filters.min_rating,
        },
        config:config
      });

      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/sourcekadwbda24/minmax_room/1/`,{
        config:config
      });
      console.log(res2.data.max_price);
      setmax_price(res2.data.max_price);
      setmin_price(res2.data.min_price);


      setPosts(res.data.results);
      setLoading(false);
      settotalPosts(res.data.count);
    };

    fetchPosts();
  }, [currentPage,filters]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
      <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      >
        <Grid item lg={12} xs={12}>
        <h1 className='text-primary mb-3'>Our rooms</h1>
        <ResponsiveDrawer setfilters={setfilters} max_price={max_price} min_price={min_price} filters={filters} posts={posts} loading={loading} paginate={paginate} postsPerPage={postsPerPage} currentPage={currentPage} totalposts={totalposts}/>
        

        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        /> */}
      </Grid>
      </Grid>
  );
};

export default App;