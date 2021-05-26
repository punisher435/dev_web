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
  const handleChange8 = (event) => {
    props.setfilters({...props.filters,laundry:event.target.value});
  };
 
 
  const handleChange11 = (event) => {
    props.setfilters({...props.filters,power_backup:event.target.value});
  };
  const handleChange12 = (event) => {
    props.setfilters({...props.filters,geyser:event.target.value});
  };
 
 
  const handleChange16 = (event) => {
    props.setfilters({...props.filters,apartment_cleaning:event.target.value});
  };
  const handleChange17 = (event) => {
    props.setfilters({...props.filters,sofa:event.target.value});
  };

  const handleChange18 = (event) => {
    props.setfilters({...props.filters,house_refridgerator:event.target.value});
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
        <InputLabel id="sofa">sofa</InputLabel>
        <Select
          labelId="sofa"
          id="sofa"
          value={props.filters.sofa}
          onChange={handleChange17}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="sofa">Refridgerator</InputLabel>
        <Select
          labelId="sofa"
          id="sofa"
          value={props.filters.house_refridgerator}
          onChange={handleChange18}
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
          labelId="house_TV_list"
          id="houid"
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
        <InputLabel id="laundry">Laundry</InputLabel>
        <Select
          labelId="laundry_list"
          id="laundry_id"
          value={props.filters.laundry}
          onChange={handleChange8}
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
        <InputLabel id="geyser">Geyser</InputLabel>
        <Select
          labelId="geyser_list"
          id="geyser_id"
          value={props.filters.geyser}
          onChange={handleChange12}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>


      <FormControl className={classes.formControl}>
        <InputLabel id="room_cleaning">House cleaning</InputLabel>
        <Select
          labelId="room_cleaning_list"
          id="room_cleaning_id"
          value={props.filters.apartment_cleaning}
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
