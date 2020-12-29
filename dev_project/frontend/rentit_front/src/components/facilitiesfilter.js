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
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color:'#f50057',
  },
}));

export default function SimpleSelect2(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setfilters({...props.filters,balcony:event.target.value});
  };
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
    props.setfilters({...props.filters,house_TV:event.target.value});
  };
  const handleChange5 = (event) => {
    props.setfilters({...props.filters,room_TV:event.target.value});
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
  const handleChange9 = (event) => {
    props.setfilters({...props.filters,iron:event.target.value});
  };
  const handleChange10 = (event) => {
    props.setfilters({...props.filters,guest_allowed:event.target.value});
  };
  const handleChange11 = (event) => {
    props.setfilters({...props.filters,power_backup:event.target.value});
  };
  const handleChange12 = (event) => {
    props.setfilters({...props.filters,geyser:event.target.value});
  };
  const handleChange13 = (event) => {
    props.setfilters({...props.filters,breakfast:event.target.value});
  };
  const handleChange14 = (event) => {
    props.setfilters({...props.filters,lunch:event.target.value});
  };
  const handleChange15 = (event) => {
    props.setfilters({...props.filters,dinner:event.target.value});
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="Balcony">Balcony</InputLabel>
        <Select
          labelId="Balcony_list"
          id="Balcony_list_id"
          value={props.filters.balcony}
          onChange={handleChange}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
        </FormControl>

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
        <InputLabel id="house_TV">House TV</InputLabel>
        <Select
          labelId="house_TV_list"
          id="house_TV_id"
          value={props.filters.house_TV}
          onChange={handleChange4}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="room_TV">Room TV</InputLabel>
        <Select
          labelId="room_TV_list"
          id="room_TV_id"
          value={props.filters.room_TV}
          onChange={handleChange5}
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
        <InputLabel id="iron">Iron</InputLabel>
        <Select
          labelId="iron_list"
          id="iron_id"
          value={props.filters.iron}
          onChange={handleChange9}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="guest_allowed">Guest allowed</InputLabel>
        <Select
          labelId="guest_allowed_list"
          id="guest_allowed_id"
          value={props.filters.guest_allowed}
          onChange={handleChange10}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="power_backup">Guest allowed</InputLabel>
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
        <InputLabel id="breakfast">Breakfast</InputLabel>
        <Select
          labelId="breakfast_list"
          id="breakfast_id"
          value={props.filters.breakfast}
          onChange={handleChange13}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="lunch">Lunch</InputLabel>
        <Select
          labelId="lunch_list"
          id="lunch_id"
          value={props.filters.lunch}
          onChange={handleChange14}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="dinner">Dinner</InputLabel>
        <Select
          labelId="dinner_list"
          id="dinner_id"
          value={props.filters.dinner}
          onChange={handleChange15}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
     
    </div>
  );
}
