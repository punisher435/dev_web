import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
 
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export default function MaterialUIPickers1(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

  React.useEffect(
    () => {
      var date1 = new Date(Date.now());
      if(props.filters.bookedtill!='')
      {
        date1.setYear(parseInt(props.filters.bookedtill.slice(0,4)))
        date1.setMonth(parseInt(props.filters.bookedtill.slice(5,7))-1)
        date1.setDate(parseInt(props.filters.bookedtill.slice(8,)))

        setSelectedDate(date1);
      }
    }
    ,[props.filters])
  

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
    props.setfilters({...props.filters,booked:'',bookedtill:`${date.getFullYear()}-${x}-${y}`});
    props.setChecked(false)
  };

  var newDate = new Date(Date.now() + 14 * 24*60*60*1000);

  const StyledTextField = withStyles((theme) => ({
    root: {
     margin:0,
     padding:0,
      width:180,
      "& .MuiOutlinedInput-notchedOutline":{
        width:180,
      },
      "& .MuiOutlinedInput-root":{
        width:180,
      },
      "& .MuiOutlinedInput-root":{
        width:180,
      },
      "& .Mui-focused": {
        width:180,

        
       
        "& input": {
          width:180,
        }
      },

      '& input:valid + fieldset': {
        width:180,
        
        
      },
      '& input:invalid + fieldset': {
        width:180,
        
      },
      '& input:valid:focus + fieldset': {
       
        width:180,
        
      },
      "& .MuiFormLabel-root": {
      
        width:180,
      }
    }
  }))( KeyboardDatePicker);


  return (
    < MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <StyledTextField
          margin="normal"
          id="date-picker-dialog"
          label="From"
          
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          
          maxDate={newDate}

          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </ MuiPickersUtilsProvider>
  );
}
