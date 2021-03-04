import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export default function SimpleSelect(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setfilters({...props.filters,category:event.target.value});
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.filters.category}
          onChange={handleChange}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'Classic room'}>Classic room</MenuItem>
          <MenuItem value={'Deluxe room'}>Deluxe room</MenuItem>
          <MenuItem value={'Single'}>Single</MenuItem>
          <MenuItem value={'Double'}>Double</MenuItem>
          <MenuItem value={'Triple'}>Triple</MenuItem>
          <MenuItem value={'Quad'}>Quad</MenuItem>
          <MenuItem value={'Queen'}>Queen</MenuItem>
          <MenuItem value={'King'}>King</MenuItem>
          <MenuItem value={'Twin'}>Twin</MenuItem>
          <MenuItem value={'Double-Double'}>Double-Double</MenuItem>
          <MenuItem value={'Studio'}>Studio</MenuItem>
          <MenuItem value={'Suite'}>Suite</MenuItem>
          <MenuItem value={'Executive suite'}>Executive suite</MenuItem>
          <MenuItem value={'Mini suite'}>Mini suite</MenuItem>
          <MenuItem value={'Presidential suite'}>Presidential suite</MenuItem>
          <MenuItem value={'Apartment'}>Apartment</MenuItem>
          <MenuItem value={'Shop'}>Shop</MenuItem>
          <MenuItem value={'Connecting rooms'}>Connecting rooms</MenuItem>
          <MenuItem value={'Murphy rooms'}>Murphy room</MenuItem>
          <MenuItem value={'Adjacent rooms'}>Adjacent rooms</MenuItem>
          <MenuItem value={'Murphy room'}>Murphy room</MenuItem>
          <MenuItem value={'Adjacent rooms'}>Adjacent rooms</MenuItem>
        </Select>
        <FormHelperText> Select the room category</FormHelperText>
      </FormControl>
     
    </div>
  );
}
