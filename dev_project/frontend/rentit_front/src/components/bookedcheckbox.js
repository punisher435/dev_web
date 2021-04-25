import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    
    '&$checked': {
      color: `${process.env.REACT_APP_COLOR}`,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Checkboxes({ filters,setfilters,checked,setChecked }) {

  const handleChange = (event) => {
    setChecked(event.target.checked);
    

    if(event.target.checked===true){
      setfilters({...filters,booked:'',bookedtill:''});
    }
    if(event.target.checked===false){
      setfilters({...filters,booked:''});
    }
    
  };

  return (
    <div>
      <GreenCheckbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        color="secondary"
       
      />
    </div>
  );
}