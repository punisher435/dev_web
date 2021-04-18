import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  var newDate = new Date(Date.now() + 15 * 24*60*60*1000);


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="From"
          // format="MM/dd/yyyy"
          parse='dd-mm-y'
          value={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          
          maxDate={newDate}

          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
