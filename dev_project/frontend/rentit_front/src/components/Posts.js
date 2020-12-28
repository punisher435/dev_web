import React from 'react';
import SearchCard from './SearchCard'
import Spinner from './Spinner'
import RecipeReviewCard from './card_1';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const Posts = ({ posts, loading }) => {

  if (loading) {
    return <Spinner loading={loading} />;
  }

  const myStlye = {
    border: '0px'
  };

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.room_id} style={myStlye} className='list-group-item'>
          {/* {post.title} */}
          <Hidden smDown>
        <Grid item md={12}>
          <SearchCard post={post}/>
          </Grid>
          </Hidden>
        <Hidden smUp>
        <Grid item md={12}>
        <RecipeReviewCard post={post}/>
        </Grid>
        </Hidden>
        </li>
      ))}
    </ul>
  );
};

export default Posts;