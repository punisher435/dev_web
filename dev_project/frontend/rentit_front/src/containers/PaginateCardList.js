import React, { useState, useEffect } from 'react';
import Posts from '../components/Posts';
/* import Pagination from '../components/Pagination'; */
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PaginationOutlined from '../components/PaginationOutlined';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [totalposts, settotalPosts] = useState(0);

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
          page:currentPage
        },
        config:config
      });
      console.log(res.data);
      setPosts(res.data.results);
      setLoading(false);
      settotalPosts(res.data.count);
    };

    fetchPosts();
  }, [currentPage]);

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
        <Grid item lg={9} xs={12}>
        <h1 className='text-primary mb-3'>Our rooms</h1>
        <Posts posts={posts} loading={loading} />
        <PaginationOutlined paginate={paginate} postsPerPage={postsPerPage} currentPage={currentPage} totalposts={totalposts}/>

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