import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Icon from '@material-ui/core/Icon';
import Description from './descriptiontable';



function App(props) {
  const [readMore,setReadMore]=useState(false);
  const extraContent =
  <div>

    

      <Description room={props.details} />
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