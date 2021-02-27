import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  myclass: {
    Color:`${process.env.REACT_APP_COLOR}`,
  }
});

function valuetext(value) {
  return `₹${value}`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const value = [props.filters.min_price,props.filters.max_price];

  const handleChange = (event, newValue) => {
    console.log(newValue);
    props.setfilters({...props.filters,max_price:newValue[1],min_price:newValue[0]});
  };

  return (
    <div className={classes.root}>
      <Typography variant='body1' id="range-slider" gutterBottom>
        Min-Max Price 
      </Typography>
      <Slider
        className={classes.myclass}
        max={props.max_price}
        min={props.min_price}
        step={500}
        
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}