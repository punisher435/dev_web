import React from 'react'
import Dashboarddrawer from '../hocs/layout2'
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    
  
 
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft:drawerWidth,
    },
  },
}));




function Dashboard() {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>
        <Dashboarddrawer/>

        <main className={classes.content}>
        <div className={classes.toolbar} />

        <h3>Analytics</h3>

        

        </main>

            
        </div>
    )
}

export default Dashboard
