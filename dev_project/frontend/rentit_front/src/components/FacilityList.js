import React from 'react';
import Facility from './FacilityCheckBox'


const FacilityList = ({ facility, loading }) => {

  if (loading) {
    return <h5>Loading...</h5>;
  }

  const myStlye = {
    border: '0px'
  };

  return (
    <ul className='list-group'>
      {posts.map(post => (
        <li key={post.id} style={myStlye} className='list-group-item'>
          <Facility type='Breakfast' price='price'/>
        </li>
      ))}
    </ul>
  );
};

export default FacilityList;