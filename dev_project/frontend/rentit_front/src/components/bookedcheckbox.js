import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes({ filters,setfilters }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event);

    if(event.target.checked===true){
      setfilters({...filters,booked:''});
    }
    if(event.target.checked===false){
      setfilters({...filters,booked:false});
    }
    
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
       
      />
    </div>
  );
}