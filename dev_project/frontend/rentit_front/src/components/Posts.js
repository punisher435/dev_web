import React from 'react';
import SearchCard from './SearchCard'
import Spinner from './Spinner'

const Posts = ({ posts, loading }) => {

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          {/* {post.title} */}
          <SearchCard/>
        </li>
      ))}
    </ul>
  );
};

export default Posts;