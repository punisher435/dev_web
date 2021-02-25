import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BarChart from './barchart';
import Hidden from '@material-ui/core/Hidden';

import PieChart from './piechart'
import Multicolor_chart from './multicolor_chart';
import PieChart2 from './piechart2'
import PieChart3 from './piechart3'
import LineGraph from './linegraph'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    paperclass: {
        width:'200px',
        height:'150px',
      
    
    },
    paraclass:{
        textAlign: 'center',
        marginTop:'20px'
    },
    paraclass1:{
        textAlign: 'center',
        marginTop:'20px',
        color:'red',
    },
    graphclass:{
        width:'80vw',
        [theme.breakpoints.up('sm')]: {
            width:'80vw',
            maxWidth:440,
          },
          [theme.breakpoints.up('md')]: {
            width:'40vw',
            maxWidth:440,
          },
    }
  }));

function Customeranalytics({roombookings,shopbookings,apartmentbookings}) {

    var earning = 0;

    roombookings.map((booking) => {
        if(booking.cancelled===false)
        {
            earning = earning + booking.savings
        }
    })

    shopbookings.map((booking1) => {
        if(booking1.cancelled===false)
        {
            earning = earning + booking1.savings
        }
    })

    apartmentbookings.map((booking2) => {
        if(booking2.cancelled===false)
        {
            earning = earning + booking2.savings
        }
    })


    const classes = useStyles();
    return (
        <div>
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            >
                <Grid item>
        <div className={classes.root}>
        <Paper elevation={3} className={classes.paperclass}>

            <Typography variant='h6' className={classes.paraclass}>
                Your Savings :
            </Typography>
            <Typography variant='body1' className={classes.paraclass1}>
                 {earning}
            </Typography>

        </Paper>
        </div>
        </Grid>

        

        </Grid>
        

        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
            >
                
            </Grid>

            
        </div>
    )
}

export default Customeranalytics
