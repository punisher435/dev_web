import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    color:'#f50057',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color:'#f50057',
  },
}));

export default function SimpleSelect3({filters,setfilters}) {
  const classes = useStyles();

  const handleChange = (e) => {
    setfilters({...filters,[e.target.name]:e.target.value});
  };
 

  return (
    <div>
     
      <TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
          rows={1}
          id="city"
          name="city"
          label="city"
          value={filters.city}
          onInput={e => handleChange(e)}
         
          
        />

<TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
          rows={1}
          id="state"
          name="state"
          label="state"
          value={filters.state}
          onInput={e => handleChange(e)}
         
          
        />

<TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
          rows={1}
          id="country"
          name="country"
          label="country"
          value={filters.country}
          onInput={e => handleChange(e)}
         
          
        />
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
          rows={1}
          id="landmark"
          name="landmark"
          label="landmark"
          value={filters.landmark}
          onInput={e => handleChange(e)}
         
          
        />
        <TextField
           multiline
           variant="outlined"
           margin="normal"
           fullWidth
          rows={1}
          id="pincode"
          name="pincode"
          label="pincode"
          value={filters.pincode}
          onInput={e => handleChange(e)}
         
          
        />
    </div>
  );
}
