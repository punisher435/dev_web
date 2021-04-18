import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function SimpleSelect5(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setfilters({...props.filters,bed_type:event.target.value});
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="bed-type-select-label">Bed Type</InputLabel>
        <Select
          labelId="bed-type-select-label2"
          id="bed-type-select"
          value={props.filters.bed_type}
          onChange={handleChange}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'Single Bed'}>Single Bed</MenuItem>
          <MenuItem value={'Double Bed'}>Double Bed</MenuItem>
          
        </Select>
      </FormControl>
     
    </div>
  );
}
