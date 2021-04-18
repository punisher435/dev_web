import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({date,set,setbookvalues,bookvalues}) {

  const handleDateChange = (date) => {
    set(date);
    setbookvalues({...bookvalues,capacity:1})
  };

  var newDate = new Date(Date.now() + 15 * 24*60*60*1000);


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="From"
    
          parse='y-mm-dd'
          value={date}
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
