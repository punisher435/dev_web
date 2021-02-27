import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function App(props) {
  const [readMore,setReadMore]=useState(false);
  const extraContent =
  <div>

      {
          props.details.category ? <div><Typography variant='h6'>
          Category
      </Typography>
      <Typography variant='body1'>
      {props.details.category} 
      
      </Typography></div> : null
        }

{
          props.details.balcony ? <div><Typography variant='h6'>
          No. of balcony
      </Typography>
      <Typography variant='body1'>
      {props.details.balcony} 
      
      </Typography></div> : null
        }

{
          props.details.separate_washroom ? <div><Typography variant='h6'>
          Separate Washroom
      </Typography>
      <Typography variant='body1'>
      {props.details.separate_washroom ? 'Avaiable' : 'Not avaiable'} 
      
      </Typography></div> : null
        }

      <Typography variant='h6'>
          Description
      </Typography>
          
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

        {
          props.details.capacity ? <div><Typography variant='h6'>
          Capacity
      </Typography>
      <Typography variant='body1'>
      Room of {props.details.capacity} people 
      
      </Typography></div> : null
        }

{
          props.details.BHK ? <div><Typography variant='h6'>
          BHK
      </Typography>
      <Typography variant='body1'>
      {props.details.BHK} 
      
      </Typography></div> : null
        }

{
          props.details.total_rooms ? <div><Typography variant='h6'>
          Total Rooms
      </Typography>
      <Typography variant='body1'>
      {props.details.total_rooms} 
      
      </Typography></div> : null
        }

{
          props.details.total_washroom ? <div><Typography variant='h6'>
          Total washroom
      </Typography>
      <Typography variant='body1'>
      {props.details.total_washroom} 
      
      </Typography></div> : null
        }

{
          props.details.total_beds ? <div><Typography variant='h6'>
          Total beds
      </Typography>
      <Typography variant='body1'>
      {props.details.total_beds} 
      
      </Typography></div> : null
        }

{
          props.details.bed_type ? <div><Typography variant='h6'>
          Bed Type
      </Typography>
      <Typography variant='body1'>
      {props.details.bed_type} 
      
      </Typography></div> : null
        }

{
          props.details.windows ? <div><Typography variant='h6'>
           Total windows
      </Typography>
      <Typography variant='body1'>
      {props.details.windows} 
      
      </Typography></div> : null
        }

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

{
          props.details.shop_policy ? <div><Typography variant='h6'>
          Shop policy
      </Typography>
      <Typography variant='body1'>
      {props.details.shop_policy} 
      
      </Typography></div> : null
        }

{
          props.details.apartmnt_policy ? <div><Typography variant='h6'>
          Apartmnt policy
      </Typography>
      <Typography variant='body1'>
      {props.details.apartmnt_policy} 
      
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