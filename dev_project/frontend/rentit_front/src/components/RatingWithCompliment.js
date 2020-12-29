import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import StarRoundedIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import Box from '@material-ui/core/Box'

import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  root: {
    borderRadius: 25,
    width: 60,
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
  const [compliment, setCompliment] = useState('');

  useEffect(() => {
    if(props.rating<=1){
        setCompliment('bad');
    }
    else if(props.rating<=2){
        setCompliment=('Not Good');
    }
    else if(props.rating<=3){
        setCompliment('Good');
    }
    else if(props.rating<=4){
        setCompliment('Very Good');
    }
    else if(props.rating<=5){
        setCompliment('Awesome');
    }
  }, []);


    
// B4DA55

  return (
      <>
      <Grid container
      direction='column'
      justify="center"
      
      >
          <Grid item >
                <Box mb={1} mt={1}>
                <Rating name="read-only" value={props.rating} readOnly precision={0.5} size="large"  />
                </Box>
                
              
          </Grid>
          <Grid item>
          <Grid container
      direction='row'
      alignItems='center' 
      spacing={0}>
          <Grid item >
              <Box mr={1}>
                <Card className={classes.root}>
                            <Typography 
                            variant="h6" 
                            component="h2"
                            className={props.rating<1 ? classes.yy : 
                            props.rating<2? classes.yg :
                            props.rating<3? classes.gg :
                            props.rating<4? classes.gr :
                            classes.rr
                            } >
                            <Box textAlign="center">
                            {props.rating}
                            </Box>
                            </Typography>
                </Card>
              </Box>
          </Grid>
          <Grid item>
              <Typography variant='subtitle1'>
                  <Box fontWeight="fontWeightMedium" ml={1} mr={1}>
                    {compliment}
                  </Box>
              </Typography>
          </Grid>
          <Grid item>
              <Typography variant='subtitle1'>
              <Box fontSize={14}>
                    (255) reviews
                </Box>
              </Typography>
          </Grid>
      </Grid>
          </Grid>
      

      </Grid>
      
      </>
  );
}
