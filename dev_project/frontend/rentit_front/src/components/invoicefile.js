import React, { useRef } from 'react';

import MyDocument from '../containers/invoice';

const Example = () => {
 

  const handleclick = () => {
    var element = document.getElementById('invoice');
  }

  return (
    <div>
    <button onClick={() => {handleclick();}}>print</button>
    <div id='invoice'>
      
      <MyDocument/>
    </div>
    </div>
  );
};

export default Example;