import React,{ useState } from 'react'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';



function Windowsfilter(props) {


    const [value,setvalue] = useState('Any') 
    const handleclick1 = event => {
        if(value==='Any'){
            setvalue(1);
            props.setfilters({...props.filters,windows:1});
        } else{
            var temp=value+1;
            setvalue(temp);
            props.setfilters({...props.filters,windows:temp});
        }
    }
    const handleclick2 = event => {
        if(value==='Any'){
            setvalue('Any');
        }
        else if(value===1){
                setvalue('Any');
                props.setfilters({...props.filters,windows:''});
        } else{
            var temp=value-1;
            setvalue(temp);
            props.setfilters({...props.filters,windows:temp});
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

export default Windowsfilter;
