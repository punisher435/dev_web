import React, { useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'




function Calendar(){
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <DatePicker
            closeOnScroll={true}
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat='MMMM d, yyyy'
            />
    )
}

export default Calendar;