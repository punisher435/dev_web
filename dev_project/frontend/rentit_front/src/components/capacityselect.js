import React,{ useState } from 'react'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';



function Capacityselect({post,bookvalues,setbookvalues,capacity}) {



const handleclick1 = () => {
    if(bookvalues.capacity<capacity)
    {
        setbookvalues({...bookvalues,capacity:bookvalues.capacity+1,price:bookvalues.month_price*bookvalues.duration*(bookvalues.capacity+1),savings:bookvalues.monthsavings*bookvalues.duration*(bookvalues.capacity+1)})

    }
}
const handleclick2 = () => {

    if(bookvalues.capacity>1)
    {
        setbookvalues({...bookvalues,capacity:bookvalues.capacity-1,price:bookvalues.month_price*bookvalues.duration*(bookvalues.capacity-1),savings:bookvalues.monthsavings*bookvalues.duration*(bookvalues.capacity-1)})
    }
    
}
    return (
        <div>   
            <Button onClick={handleclick1} >
                <AddIcon />
            </Button>

            {bookvalues.capacity}

            <Button  onClick={handleclick2}>
                <RemoveIcon />
            </Button>
        </div>
    )
}

export default Capacityselect;
