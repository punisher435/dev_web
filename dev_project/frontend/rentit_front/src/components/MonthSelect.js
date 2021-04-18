import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  


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

export default function ControlledOpenSelect({bookvalues,setbookvalues}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
   
    if(event.target.value=='')
    {
      setbookvalues({...bookvalues,duration:'',coupon:'',price:bookvalues.month_price});
    }
    else{setbookvalues({...bookvalues,coupon:'',duration:event.target.value,price:bookvalues.month_price*bookvalues.capacity*event.target.value,savings:bookvalues.monthsavings*event.target.value*bookvalues.capacity});}
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
      <>
      <FormControl className={classes.formControl} >
        <InputLabel id="demo-controlled-open-select-label">Duration</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={bookvalues.duration}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
         
          <MenuItem value={1}>1 month</MenuItem>
          <MenuItem value={2}>2 months</MenuItem>
          <MenuItem value={3}>3 months</MenuItem>
          <MenuItem value={4}>4 months</MenuItem>
          <MenuItem value={5}>5 months</MenuItem>
          <MenuItem value={6}>6 months</MenuItem>
          <MenuItem value={7}>7 months</MenuItem>
          <MenuItem value={8}>8 months</MenuItem>
          <MenuItem value={9}>9 months</MenuItem>
          <MenuItem value={10}>10 months</MenuItem>
          <MenuItem value={11}>11 months</MenuItem>
          <MenuItem value={12}>1 year</MenuItem>
          <MenuItem value={13}>1    year 1 month</MenuItem>
          <MenuItem value={14}>1 year 2 months</MenuItem>
          <MenuItem value={15}>1 year 3 months</MenuItem>
          <MenuItem value={16}>1 year 4 months</MenuItem>
          <MenuItem value={17}>1 year 5 months</MenuItem>
          <MenuItem value={18}>1 year 6 months</MenuItem>
          <MenuItem value={19}>1 year 7 months</MenuItem>
          <MenuItem value={20}>1 year 8 months</MenuItem>
          <MenuItem value={21}>1 year 9 months</MenuItem>
          <MenuItem value={22}>1 year 10 months</MenuItem>
          <MenuItem value={23}>1 year 11 months</MenuItem>
          <MenuItem value={24}>2 years</MenuItem>
        </Select>
      </FormControl>
      </>
  );
}
