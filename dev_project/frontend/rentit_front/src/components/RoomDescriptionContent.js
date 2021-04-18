import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Description from './descriptiontable';
import Descriptionshop from './descriptiontableshop';
import Descriptionapartment from './descriptiontableapartment';



function App(props) {
  const [readMore,setReadMore]=useState(false);
  const extraContent =
  <div>

    <br />
      {
        props.type === 'room' ? <Description room={props.details} /> :null
      }
      {
        props.type === 'shop' ? <Descriptionshop room={props.details} /> :null
      }
      {
        props.type === 'apartment' ? <Descriptionapartment room={props.details} /> :null
      }
      
  </div>
  const linkName=readMore?'Read Less':'Read More'
  return (
    <div className="App">
        <Typography variant='body1'>
        {readMore && extraContent}
        </Typography>
      
      <Button
        color="secondary"
        onClick={()=>{setReadMore(!readMore)}}
        >
      {linkName}
      </Button>
    </div>
  );
}

export default App;