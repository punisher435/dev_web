import React from 'react';
import SearchCard from './SearchCard'
import Spinner from './Spinner'


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
          <SearchCard post={post}/>
        </li>
      ))}
    </ul>
  );
};

export default Posts;