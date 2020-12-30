import React,{ useState } from 'react'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';



function Trustpointsfilter(props) {


    const [value,setvalue] = useState('Any') 
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
    return (
        <div>   
            <Button onClick={handleclick1} >
                <AddIcon />
            </Button>

            {value}

            <Button  onClick={handleclick2}>
                <RemoveIcon />
            </Button>
        </div>
    )
}

export default Trustpointsfilter;
