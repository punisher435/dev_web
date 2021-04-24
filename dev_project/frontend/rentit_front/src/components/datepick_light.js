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
          width: '23ch',
         
         
          padding:5,
         
       
      },
  
  }));


  const StyledTextField = withStyles((theme) => ({
    root: {
      margin: theme.spacing(2),
      width: 300,
      "& .MuiOutlinedInput-notchedOutline":{
        borderColor: 'black',
        borderWidth: 2,
      },
      "& .MuiOutlinedInput-root":{
        borderColor: 'black',
        borderWidth: 2,
      },
      "& .MuiOutlinedInput-root":{
        borderColor: 'black',
        borderWidth: 2,
      },
      "& .Mui-focused": {
        color: 'black',
        borderColor: 'black',
        borderWidth: 2,
        fontWeight: 'bold',

        
        
        height: 60,
        "& input": {
          textAlign: "center",
          borderColor: 'black',
        borderWidth: 2,
        fontWeight: 'bold',

        }
      },

      '& input:valid + fieldset': {
        borderColor: 'black',
        borderWidth: 2,
        fontWeight: 'bold',

        
      },
      '& input:invalid + fieldset': {
        borderColor: 'black',
        borderWidth: 2,
        fontWeight: 'bold',

      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        borderColor: 'black',
        padding: '4px !important', // override inline-style
        fontWeight: 'bold',

      },
      "& .MuiFormLabel-root": {
        color: 'black',
        fontWeight: 'bold',
       
      }
    }
  }))( KeyboardDatePicker);

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
    
    setvalue({...value,[name]:`${date.getFullYear()}-${x}-${y}`})


  };

  var newDate = new Date(Date.now() + 14 * 24*60*60*1000);


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.root12}>
        <KeyboardDatePicker
        variant="inline"
        inputVariant="outlined"
        className={classes.root12}
          margin="normal"
          id="date-picker-dialog"
          label="select date"
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
