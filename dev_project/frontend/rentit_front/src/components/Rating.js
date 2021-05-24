import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import StarRoundedIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  root: {
    width: 75,
    alignItems: 'center',
  },
  pos: {
    alignItems:'center',
  },
  yy: {
    backgroundColor: '#ff4545',
  },
  yg: {
    backgroundColor: '#ffa534',
  },
  gg: {
    backgroundColor: '#ffe234',
  },
  gr: {
    backgroundColor: '#b7dd29 ',
  },
  rr: {
    backgroundColor: '#57e32c',
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const isBackgroundRed = true;
    
// B4DA55

  return (
    <Card className={classes.root}>
                <Typography 
                  variant="h5" 
                  component="h2"
                  className={props.rating<1 && props.rating>0 ? classes.yy : 
                  props.rating<2 && props.rating>0? classes.yg :
                  props.rating<3 && props.rating>0? classes.gg :
                  props.rating<4 && props.rating>0? classes.gr :
                  classes.rr
                } >
                  <Box textAlign="center">
                  {props.rating ? props.rating : 0}
                  <StarRoundedIcon/>
                  </Box>
                </Typography>
                {/* {props.rating? props.rating+1: props.rating} */}
                <h6>
                <Box textAlign="center">
                    {props.no} rating
                  </Box>
                </h6>
    </Card>
  );
}
