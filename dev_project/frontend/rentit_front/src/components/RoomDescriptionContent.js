import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function App(props) {
  const [readMore,setReadMore]=useState(false);
  const extraContent =
  <div>
          {props.details.description}
        <Typography variant='body1'>
        {props.details.description}
        </Typography>
        <Typography variant='h6'>
            Location
        </Typography>
        <Typography variant='body1'>
        {props.details.location}, {props.details.city}, {props.details.state}, {props.details.country}, {props.details.pincode} 
        ({props.details.landmark})
        </Typography>

        <Typography variant='h6'>
            Furniture
        </Typography>
        <Typography variant='body1'>
        {props.details.furniture} 
        
        </Typography>

        <Typography variant='h6'>
            Additional Facility
        </Typography>
        <Typography variant='body1'>
        {props.details.facility} 
        
        </Typography>


        
        <Typography variant='h6'>
            Veg food
        </Typography>
        <Typography variant='body1'>
        {props.details.veg_food ? 'Avaiable' : 'Not avaiable'} 
        
        </Typography>

        <Typography variant='h6'>
            Non-Veg food
        </Typography>
        <Typography variant='body1'>
        {props.details.nonveg_food ? 'Avaiable' : 'Not avaiable'} 
        
        </Typography>

        {
          props.details.food_policy ? <div><Typography variant='h6'>
          Food policy
      </Typography>
      <Typography variant='body1'>
      {props.details.food_policy} 
      
      </Typography></div> : null
        }

{
          props.details.guest_policy ? <div><Typography variant='h6'>
          Guest policy
      </Typography>
      <Typography variant='body1'>
      {props.details.guest_policy} 
      
      </Typography></div> : null
        }

{
          props.details.room_policy ? <div><Typography variant='h6'>
          Room policy
      </Typography>
      <Typography variant='body1'>
      {props.details.room_policy} 
      
      </Typography></div> : null
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