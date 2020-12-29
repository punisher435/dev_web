import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import StarRoundedIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
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
    backgroundColor: '#B4DA55',
  },
  yg: {
    backgroundColor: '#B4DA55',
  },
  gg: {
    backgroundColor: '#B4DA55',
  },
  gr: {
    backgroundColor: '#B4DA55',
  },
  rr: {
    backgroundColor: '#B4DA55',
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
                  className={props.rating<1 ? classes.yy : 
                  props.rating<2? classes.yg :
                  props.rating<3? classes.gg :
                  props.rating<4? classes.gr :
                  classes.rr
                } >
                  <Box textAlign="center">
                  {props.rating}
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
