import React,{ useState } from 'react'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';



function Trustpointsfilter(props) {


    const [value,setvalue] = useState('Any') 
    const [value1,setvalue1] = useState('Any') 
    const handleclick1 = event => {
        if(value==='Any'){
            setvalue(100);
            props.setfilters({...props.filters,trust_points_filter:1});
        } else{
            var temp=value+100;
            setvalue(temp);
            props.setfilters({...props.filters,trust_points_filter:temp});
        }
    }
    const handleclick2 = event => {
        if(value==='Any'){
            setvalue('Any');
        }
        else if(value===100){
                setvalue('Any');
                props.setfilters({...props.filters,trust_points_filter:''});
        } else{
            var temp=value-100;
            setvalue(temp);
            props.setfilters({...props.filters,trust_points_filter:temp});
        }
    }

   const handleclick3 = event => {
        if(value1==='Any'){
            setvalue1(10);
            props.setfilters({...props.filters,discount:1});
        } else{
            var temp=value1+10;
            setvalue1(temp);
            props.setfilters({...props.filters,discount:temp});
        }
    }
    const handleclick4 = event => {
        if(value1==='Any'){
            setvalue1('Any');
        }
        else if(value1===10){
                setvalue1('Any');
                props.setfilters({...props.filters,discount:''});
        } else{
            var temp=value1-10;
            setvalue1(temp);
            props.setfilters({...props.filters,discount:temp});
        }
    }
    return (
        <div>   
            <Button onClick={handleclick1} >
                <AddIcon />
            </Button>

            {value}

            <Button  onClick={handleclick2}>
                <RemoveIcon />
            </Button>

            <Typography variant='h6'>
                Discount filter
            </Typography>

            <Button onClick={handleclick3} >
                <AddIcon />
            </Button>

            {value1}

            <Button  onClick={handleclick4}>
                <RemoveIcon />
            </Button>
        </div>
    )
}

export default Trustpointsfilter;
