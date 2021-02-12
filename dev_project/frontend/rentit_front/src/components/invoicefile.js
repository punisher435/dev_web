import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import html2pdf from 'html2pdf.js'

import MyDocument from '../containers/invoice';

const Example = () => {
 

  const handleclick = () => {
    var element = document.getElementById('invoice');
    html2pdf(element);  
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