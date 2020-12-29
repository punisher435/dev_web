import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';


const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      
    },
  })(() => null);


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 85,
  },
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [duration, setDuration] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
      <>
    <GlobalCss />
      <FormControl className={classes.formControl} >
        <InputLabel id="demo-controlled-open-select-label">Duration</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={duration}
          onChange={handleChange}
        >
          <MenuItem value="" >
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1 month</MenuItem>
          <MenuItem value={20}>2 months</MenuItem>
          <MenuItem value={30}>3 months</MenuItem>
          <MenuItem value={30}>4 months</MenuItem>
          <MenuItem value={30}>5 months</MenuItem>
          <MenuItem value={30}>6 months</MenuItem>
          <MenuItem value={30}>7 months</MenuItem>
          <MenuItem value={30}>8 months</MenuItem>
          <MenuItem value={30}>9 months</MenuItem>
          <MenuItem value={30}>10 months</MenuItem>
          <MenuItem value={30}>11 months</MenuItem>
          <MenuItem value={30}>1 year</MenuItem>
          <MenuItem value={30}>1    year 1 month</MenuItem>
          <MenuItem value={30}>1 year 2 months</MenuItem>
          <MenuItem value={30}>1 year 3 months</MenuItem>
          <MenuItem value={30}>1 year 4 months</MenuItem>
          <MenuItem value={30}>1 year 5 months</MenuItem>
          <MenuItem value={30}>1 year 6 months</MenuItem>
          <MenuItem value={30}>1 year 7 months</MenuItem>
          <MenuItem value={30}>1 year 8 months</MenuItem>
          <MenuItem value={30}>1 year 9 months</MenuItem>
          <MenuItem value={30}>1 year 10 months</MenuItem>
          <MenuItem value={30}>1 year 11 months</MenuItem>
          <MenuItem value={30}>2 years</MenuItem>
        </Select>
      </FormControl>
      </>
  );
}
