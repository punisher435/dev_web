import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StarRateIcon from '@material-ui/icons/StarRate';



function LinearProgressWithLabel(props) {

  
  return (
    <Box display="flex" alignItems="center">
      <Box minWidth={40}>
        <Typography variant="body2" color="textSecondary">
            {props.tag} <StarRateIcon/> 
        </Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>

      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">({`${Math.round(
          props.value,
        )}`})</Typography>
      </Box>

    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
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

export default function LinearWithValueLabel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={props.value} tag={props.star} className={props.star<=1 ? classes.yy : 
                  props.star<2? classes.yg :
                  props.star<3? classes.gg :
                  props.star<4? classes.gr :
                  classes.rr
                } />
    </div>
  );
}
