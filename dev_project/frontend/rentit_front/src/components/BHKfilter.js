import React,{ useState } from 'react'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



function Windowsfilter(props) {


    const [value,setvalue] = useState('Any') 
   
    const handleclick1 = event => {
        if(value==='Any'){
            setvalue(1);
            props.setfilters({...props.filters,BHK_filter:1});
        } else{
            var temp=value+1;
            setvalue(temp);
            props.setfilters({...props.filters,BHK_filter:temp});
        }
    }
    const handleclick2 = event => {
        if(value==='Any'){
            setvalue('Any');
        }
        else if(value===1){
                setvalue('Any');
                props.setfilters({...props.filters,BHK_filter:''});
        } else{
            var temp=value-1;
            setvalue(temp);
            props.setfilters({...props.filters,BHK_filter:temp});
        }
    }
  
    return (
        <div>  
            <div>
             <Typography variant="body1">
                BHK
            </Typography> 
            <Button onClick={handleclick1} >
                <AddIcon />
            </Button>

            {value}

            <Button  onClick={handleclick2}>
                <RemoveIcon />
            </Button>
            </div>

           
        </div>
    )
}

export default Windowsfilter;
