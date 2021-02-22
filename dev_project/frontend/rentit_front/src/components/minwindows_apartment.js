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
    const [value4,setvalue4] = useState('Any') 
    const [value5,setvalue5] = useState('Any') 
    const [value6,setvalue6] = useState('Any') 
    const [value7,setvalue7] = useState('Any') 
    const [value8,setvalue8] = useState('Any') 
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

    const handleclick9 = event => {
        if(value5==='Any'){
            setvalue5(1);
            props.setfilters({...props.filters,AC_filter:1});
        } else{
            var temp=value5+1;
            setvalue5(temp);
            props.setfilters({...props.filters,AC_filter:temp});
        }
      }
      const handleclick10 = event => {
        if(value5==='Any'){
            setvalue5('Any');
        }
        else if(value5===1){
                setvalue5('Any');
                props.setfilters({...props.filters,AC_filter:''});
        } else{
            var temp=value5-1;
            setvalue5(temp);
            props.setfilters({...props.filters,AC_filter:temp});
        }
      }

      const handleclick11 = event => {
        if(value6==='Any'){
            setvalue6(1);
            props.setfilters({...props.filters,TV_filter:1});
        } else{
            var temp=value6+1;
            setvalue6(temp);
            props.setfilters({...props.filters,TV_filter:temp});
        }
      }
      const handleclick12 = event => {
        if(value6==='Any'){
            setvalue6('Any');
        }
        else if(value6===1){
                setvalue6('Any');
                props.setfilters({...props.filters,TV_filter:''});
        } else{
            var temp=value6-1;
            setvalue6(temp);
            props.setfilters({...props.filters,TV_filter:temp});
        }
      }

      const handleclick13 = event => {
        if(value7==='Any'){
            setvalue7(1);
            props.setfilters({...props.filters,geyser_filter:1});
        } else{
            var temp=value7+1;
            setvalue7(temp);
            props.setfilters({...props.filters,geyser_filter:temp});
        }
      }
      const handleclick14 = event => {
        if(value7==='Any'){
            setvalue7('Any');
        }
        else if(value7===1){
                setvalue7('Any');
                props.setfilters({...props.filters,geyser_filter:''});
        } else{
            var temp=value7-1;
            setvalue7(temp);
            props.setfilters({...props.filters,geyser_filter:temp});
        }
      }

      const handleclick15 = event => {
        if(value8==='Any'){
            setvalue8(1);
            props.setfilters({...props.filters,cooler_filter:1});
        } else{
            var temp=value8+1;
            setvalue8(temp);
            props.setfilters({...props.filters,cooler_filter:temp});
        }
      }
      const handleclick16 = event => {
        if(value8==='Any'){
            setvalue8('Any');
        }
        else if(value8===1){
                setvalue8('Any');
                props.setfilters({...props.filters,cooler_filter:''});
        } else{
            var temp=value8-1;
            setvalue8(temp);
            props.setfilters({...props.filters,cooler_filter:temp});
        }
      }

      const handleclick17 = event => {
        if(value4==='Any'){
            setvalue4(1);
            props.setfilters({...props.filters,beds_filter:1});
        } else{
            var temp=value4+1;
            setvalue4(temp);
            props.setfilters({...props.filters,beds_filter:temp});
        }
      }
      const handleclick18 = event => {
        if(value4==='Any'){
            setvalue4('Any');
        }
        else if(value4===1){
                setvalue4('Any');
                props.setfilters({...props.filters,beds_filter:''});
        } else{
            var temp=value4-1;
            setvalue4(temp);
            props.setfilters({...props.filters,beds_filter:temp});
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

        <div>   
        <Typography variant="body1">
         Min. Beds
        </Typography>
            <Button onClick={handleclick17} >
                <AddIcon />
            </Button>

            {value4}

            <Button  onClick={handleclick18}>
                <RemoveIcon />
            </Button>
        </div>

        <div>   
        <Typography variant="body1">
         Min. AC
        </Typography>
            <Button onClick={handleclick9} >
                <AddIcon />
            </Button>

            {value5}

            <Button  onClick={handleclick10}>
                <RemoveIcon />
            </Button>
        </div>

        <div>   
        <Typography variant="body1">
         Min. TV
        </Typography>
            <Button onClick={handleclick11} >
                <AddIcon />
            </Button>

            {value6}

            <Button  onClick={handleclick12}>
                <RemoveIcon />
            </Button>
        </div>

        <div>   
        <Typography variant="body1">
         Min. Geyser
        </Typography>
            <Button onClick={handleclick13} >
                <AddIcon />
            </Button>

            {value7}

            <Button  onClick={handleclick14}>
                <RemoveIcon />
            </Button>
        </div>

        <div>   
        <Typography variant="body1">
         Min. Cooler
        </Typography>
            <Button onClick={handleclick15} >
                <AddIcon />
            </Button>

            {value8}

            <Button  onClick={handleclick16}>
                <RemoveIcon />
            </Button>
        </div>

        
        </div>
    )
}

export default Windowsfilter;
