import React,{ useState } from 'react'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



function Windowsfilter(props) {


    const [value,setvalue] = useState('Any') 
    const [value1,setvalue1] = useState('Any') 
    const [value2,setvalue2] = useState('Any') 
    const [value3,setvalue3] = useState('Any') 
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

    const handleclick3 = event => {
        if(value1==='Any'){
            setvalue1(1);
            props.setfilters({...props.filters,room_filter:1});
        } else{
            var temp=value1+1;
            setvalue1(temp);
            props.setfilters({...props.filters,room_filter:temp});
        }
    }
    const handleclick4 = event => {
        if(value1==='Any'){
            setvalue1('Any');
        }
        else if(value1===1){
                setvalue1('Any');
                props.setfilters({...props.filters,room_filter:''});
        } else{
            var temp=value1-1;
            setvalue1(temp);
            props.setfilters({...props.filters,room_filter:temp});
        }
    }

    const handleclick5 = event => {
        if(value2==='Any'){
            setvalue2(1);
            props.setfilters({...props.filters,washroom_filter:1});
        } else{
            var temp=value2+1;
            setvalue2(temp);
            props.setfilters({...props.filters,washroom_filter:temp});
        }
    }
    const handleclick6 = event => {
        if(value2==='Any'){
            setvalue2('Any');
        }
        else if(value2===1){
                setvalue2('Any');
                props.setfilters({...props.filters,washroom_filter:''});
        } else{
            var temp=value2-1;
            setvalue2(temp);
            props.setfilters({...props.filters,washroom_filter:temp});
        }
    }

    const handleclick7 = event => {
        if(value3==='Any'){
            setvalue3(1);
            props.setfilters({...props.filters,balcony_filter:1});
        } else{
            var temp=value3+1;
            setvalue3(temp);
            props.setfilters({...props.filters,balcony_filter:temp});
        }
    }
    const handleclick8 = event => {
        if(value3==='Any'){
            setvalue3('Any');
        }
        else if(value3===1){
                setvalue3('Any');
                props.setfilters({...props.filters,balcony_filter:''});
        } else{
            var temp=value3-1;
            setvalue3(temp);
            props.setfilters({...props.filters,balcony_filter:temp});
        }
    }
    return (
        <div>
        <div>   
        <Typography variant="body1">
         Min. Windows
        </Typography>
            <Button onClick={handleclick1} >
                <AddIcon />
            </Button>

            {value}

            <Button  onClick={handleclick2}>
                <RemoveIcon />
            </Button>
        </div>

        <div>   
        <Typography variant="body1">
         Min. Rooms
        </Typography>
            <Button onClick={handleclick3} >
                <AddIcon />
            </Button>

            {value1}

            <Button  onClick={handleclick4}>
                <RemoveIcon />
            </Button>
        </div>

        <div>   
        <Typography variant="body1">
         Min. washroom
        </Typography>
            <Button onClick={handleclick5} >
                <AddIcon />
            </Button>

            {value2}

            <Button  onClick={handleclick6}>
                <RemoveIcon />
            </Button>
        </div>

        <div>   
        <Typography variant="body1">
         Min. Balcony
        </Typography>
            <Button onClick={handleclick6} >
                <AddIcon />
            </Button>

            {value3}

            <Button  onClick={handleclick7}>
                <RemoveIcon />
            </Button>
        </div>
        </div>
    )
}

export default Windowsfilter;
