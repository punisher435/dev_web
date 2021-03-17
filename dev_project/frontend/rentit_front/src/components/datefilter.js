import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers1(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

  React.useEffect(
    () => {
      var date1 = new Date(Date.now());
      if(props.filters)
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


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="From"
          format="yyyy-MM-dd"
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          
          maxDate={newDate}

          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
