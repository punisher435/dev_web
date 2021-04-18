import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   
  root12: {
    
      margin: theme.spacing(1),
      width: '100%',
     
   
  },

}));

export default function DateSelect({value,setvalue,name}) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState();
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    var x;
    var y;
    if(parseInt(date.getMonth()+1)<10)
    {
      x = `0${date.getMonth()+1}`;
    }
    if(parseInt(date.getMonth()+1)>=10)
    {
      x = `${date.getMonth()+1}`;
    }
    if(parseInt(date.getDate())<10)
    {
      y = `0${date.getDate()}`;
    }
    if(parseInt(date.getDate())>=10)
    {
      y = `${date.getDate()}`;
    }
    setvalue(name,`${date.getFullYear()}-${x}-${y}`)
  };

  React.useEffect(
    () => {
      var date1 = new Date(Date.now());
      if(value)
      {
        date1.setYear(parseInt(value.slice(0,4)))
        date1.setMonth(parseInt(value.slice(5,7))-1)
        date1.setDate(parseInt(value.slice(8,)))

        setSelectedDate(date1);
      }
    }
    ,[value])


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.root12}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Valid from"
          // format="MM/dd/yyyy"
          parse='dd-mm-y'
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          className={classes.root12}
          

          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
