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
    width: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color:'#f50057',
  },
}));

export default function SimpleSelect2(props) {
  const classes = useStyles();

  const handleChange1 = (event) => {
    props.setfilters({...props.filters,separate_washroom:event.target.value});
  };
  const handleChange2 = (event) => {
    props.setfilters({...props.filters,purified_water:event.target.value});
  };
  const handleChange3 = (event) => {
    props.setfilters({...props.filters,wifi:event.target.value});
  };
  const handleChange4 = (event) => {
    props.setfilters({...props.filters,TV:event.target.value});
  };
  
  const handleChange6 = (event) => {
    props.setfilters({...props.filters,AC:event.target.value});
  };
  const handleChange7 = (event) => {
    props.setfilters({...props.filters,cooler:event.target.value});
  };

  const handleChange11 = (event) => {
    props.setfilters({...props.filters,power_backup:event.target.value});
  };
 
  const handleChange16 = (event) => {
    props.setfilters({...props.filters,shop_cleaning:event.target.value});
  };


  return (
    <div>
      

        <FormControl className={classes.formControl}>
        <InputLabel id="Separate_Washroom">Separate Washroom</InputLabel>
        <Select
          labelId="Separate_Washroom"
          id="Separate_Washroom"
          value={props.filters.separate_washroom}
          onChange={handleChange1}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="purified_water">Purified water</InputLabel>
        <Select
          labelId="purified_water_list"
          id="purified_water_id"
          value={props.filters.purified_water}
          onChange={handleChange2}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="wifi">WIFI</InputLabel>
        <Select
          labelId="wifi_list"
          id="wifi_id"
          value={props.filters.wifi}
          onChange={handleChange3}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="TV">TV</InputLabel>
        <Select
          labelId="TV_list"
          id="house_TV_id"
          value={props.filters.TV}
          onChange={handleChange4}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

     

      <FormControl className={classes.formControl}>
        <InputLabel id="AC">AC</InputLabel>
        <Select
          labelId="AC_list"
          id="AC_id"
          value={props.filters.AC}
          onChange={handleChange6}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>



      <FormControl className={classes.formControl}>
        <InputLabel id="cooler">Cooler</InputLabel>
        <Select
          labelId="cooler_list"
          id="cooler_id"
          value={props.filters.cooler}
          onChange={handleChange7}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

    
      <FormControl className={classes.formControl}>
        <InputLabel id="power_backup">Power Backup</InputLabel>
        <Select
          labelId="power_backup_list"
          id="power_backup_id"
          value={props.filters.power_backup}
          onChange={handleChange11}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="shop_cleaning">shop cleaning</InputLabel>
        <Select
          labelId="shop_cleaning_list"
          id="shop_cleaning_id"
          value={props.filters.shop_cleaning}
          onChange={handleChange16}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
     
    </div>
  );
}
