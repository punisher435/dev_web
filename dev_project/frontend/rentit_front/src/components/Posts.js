import React from 'react';
import SearchCard from './SearchCard'
import Spinner from './Spinner'
import Grid from '@material-ui/core/Grid'

const Posts = ({ posts, loading }) => {

  if (loading) {
    return <Spinner loading={loading} />;
  }

  const myStlye = {
    height : '100%',
    width : '100%'
  };

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} style={myStlye}>
          {/* {post.title} */}
          <SearchCard/>
        </li>
      ))}
    </ul>
  );
};

export default Posts;