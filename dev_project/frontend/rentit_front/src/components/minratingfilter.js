import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {

  const handleChange = (event) => {
    props.setfilters({...props.filters,min_rating:event.target.value});
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Min. rating</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={props.filters.min_rating} onChange={handleChange}>
        <FormControlLabel value="5" control={<Radio />} label="5" /> 
        <FormControlLabel value="4" control={<Radio />} label="4+" />
        <FormControlLabel value="3" control={<Radio />} label="3+" />
        <FormControlLabel value="2" control={<Radio />} label="2+" />
        <FormControlLabel value="" control={<Radio />} label="Any" />
      </RadioGroup>
    </FormControl>
  );
}