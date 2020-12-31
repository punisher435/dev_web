import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));



export default function SearchFields(props) {
  const classes = useStyles();
  const [value,setvalue] = useState('')

  const changehandler = event => {
      setvalue(event.target.value);
      props.setfilters({...props.filters,search:event.target.value});
  }

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <TextField id="standard-basic" label="Search" value={value} onChange={event => {changehandler(event);}}/>
    </form>
  );
}