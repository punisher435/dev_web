import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box'

export default function Facility(props){
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
        <Grid container alignItems='center'>
            
            <Grid item xs={3}>
            <Typography variant='subtitle1'>
                {props.type}
                </Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant='subtitle1'>
                ({props.price})
                </Typography>
            </Grid>
            <Grid item>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </Grid>
        </Grid>
    )
}