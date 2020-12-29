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

export default function SimpleSelect1(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setfilters({...props.filters,nonveg_food:event.target.value});
  };
  const handleChange1 = (event) => {
    props.setfilters({...props.filters,veg_food:event.target.value});
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="nonveg_food">Non-Veg Food</InputLabel>
        <Select
          labelId="nonveg_food_list"
          id="nonveg_food_list_id"
          value={props.filters.nonveg_food}
          onChange={handleChange}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel id="veg_food">Veg Food</InputLabel>
        <Select
          labelId="veg_food_list"
          id="veg_food_list_id"
          value={props.filters.veg_food}
          onChange={handleChange1}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
     
    </div>
  );
}
