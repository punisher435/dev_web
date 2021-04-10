import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes({ filters,setfilters,checked,setChecked }) {

  const handleChange = (event) => {
    setChecked(event.target.checked);
    

    if(event.target.checked===true){
      setfilters({...filters,booked:'',bookedtill:''});
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