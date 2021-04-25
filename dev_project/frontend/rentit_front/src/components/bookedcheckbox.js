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
      
      const date = new Date(Date.now())

    var x;
    var y;
    if(parseInt(date.getMonth()+1)<10)
    {
      x = `0${date.getMonth()+1}`;
    }
    if(parseInt(date.getMonth()+1)>=10)
    {
      x = `${date.getMonth()+1}`;
    }
    if(parseInt(date.getDate())<10)
    {
      y = `0${date.getDate()}`;
    }
    if(parseInt(date.getDate())>=10)
    {
      y = `${date.getDate()}`;
    }

    var temp4=`${date.getFullYear()}-${x}-${y}`
    setfilters({...filters,booked:'',bookedtill:temp4});
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