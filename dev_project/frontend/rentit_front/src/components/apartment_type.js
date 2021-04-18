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
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color:'#f50057',
  },
}));

export default function SimpleSelect2(props) {
  const classes = useStyles();

  
  const handleChange19 = (event) => {
    props.setfilters({...props.filters,apartment_type:event.target.value});
  };
  return (
    <div>
      

       

      <FormControl className={classes.formControl}>
        <InputLabel id="sofa">Housing Type</InputLabel>
        <Select
          labelId="sofa"
          id="sofa"
          value={props.filters.apartment_type}
          onChange={handleChange19}
        >
          <MenuItem value={''}>Any</MenuItem>
          <MenuItem value={'Flat'}>Flat</MenuItem>
          <MenuItem value={'Bunglow'}>Bunglow</MenuItem>
          <MenuItem value={'Villa'}>Villa</MenuItem>
          <MenuItem value={'Mansion'}>Mansion</MenuItem>
          <MenuItem value={'Farm House'}>Farm House</MenuItem>
        </Select>
      </FormControl>

     
     
    </div>
  );
}
