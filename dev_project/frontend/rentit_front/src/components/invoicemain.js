


import React, {  Fragment } from 'react';
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from './invoice'


function InvoiceMe(props) {

  const invoiceData = props.location.state.property_id;

  if(invoiceData){
  return (
    <div id="invoice">
        <Fragment>
            <PDFViewer width={window.innerWidth} height={window.innerHeight} >
                <Invoice invoice={invoiceData}/>
            </PDFViewer>
        </Fragment>


        
        </div>
  )
}
else{
  return <></>;
}
}

export default InvoiceMe
