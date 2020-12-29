import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function App(props) {
  const [readMore,setReadMore]=useState(false);
  const extraContent =
  <div>
          {props.description}
        <Typography variant='body1'>
        Did you know that we’ve got 2.5 Crore bookings since March 2020? And this is all thanks to the sanitisation & safety measures followed at our properties, from disinfecting surfaces with high-quality cleaning products and maintaining social distance to using protective gear and more.
        </Typography>
        <Typography variant='h6'>
            Location
        </Typography>
        <Typography variant='body1'>
        Admire Suit Hospitality is located near Triplicane High Road in Chennai.
        </Typography>
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