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
    props.setfilters({...props.filters,cctv_building:event.target.value});
  };
  const handleChange1 = (event) => {
    props.setfilters({...props.filters,building_guard:event.target.value});
  };
  const handleChange2 = (event) => {
    props.setfilters({...props.filters,gender:event.target.value});
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="cctv_building">CCTV</InputLabel>
        <Select
          labelId="cctv_building_list"
          id="cctv_building_list_id"
          value={props.filters.cctv_building}
          onChange={handleChange}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel id="building_guard">Building Guard</InputLabel>
        <Select
          labelId="building_guard_list"
          id="building_guard_list_id"
          value={props.filters.building_guard}
          onChange={handleChange1}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="gender">Gender Specific</InputLabel>
        <Select
          labelId="gender"
          id="gender"
          value={props.filters.gender}
          onChange={handleChange2}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Both Male and Female'}>Both Male and Female</MenuItem>
          <MenuItem value={'Any'}>Any</MenuItem>
        </Select>
        </FormControl>
     
    </div>
  );
}
