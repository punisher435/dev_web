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

export default function SimpleSelectfinal(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setfilters({...props.filters,ordering:event.target.value});
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="ordering-select-label">Sort</InputLabel>
        <Select
          labelId="ordering-simple-select-label"
          id="ordering-simple-select"
          value={props.filters.ordering}
          onChange={handleChange}
        >
          <MenuItem value={'-trust_points'}>Featured</MenuItem>
          <MenuItem value={'-final_price'}>Price: High to Low</MenuItem>
          <MenuItem value={'final_price'}>Price: Low to High</MenuItem>
          <MenuItem value={'-avg_rating'}>Rating: High to Low</MenuItem>
          <MenuItem value={'avg_rating'}>Rating: Low to High</MenuItem>
          
        </Select>
        <FormHelperText> Choose ordering</FormHelperText>
      </FormControl>
     
    </div>
  );
}
