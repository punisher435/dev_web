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

export default function SimpleSelect3(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setfilters({...props.filters,country:event.target.value});
  };
  const handleChange2 = (event) => {
    props.setfilters({...props.filters,state:event.target.value});
  };
  const handleChange3 = (event) => {
    props.setfilters({...props.filters,city:event.target.value});
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="country-label"
          id="country-select"
          value={props.filters.country}
          onChange={handleChange}
        >
          <MenuItem value={''}>None</MenuItem>
          
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="state">State</InputLabel>
        <Select
          labelId="state-label"
          id="state-select"
          value={props.filters.state}
          onChange={handleChange2}
        >
          <MenuItem value={''}>None</MenuItem>
          
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="city">City</InputLabel>
        <Select
          labelId="city-label"
          id="city-select"
          value={props.filters.city}
          onChange={handleChange3}
        >
          <MenuItem value={''}>None</MenuItem>
          
        </Select>
      </FormControl>
     
    </div>
  );
}
