import React,{ useState} from 'react'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Grid from '@material-ui/core/Grid';


import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


import RoomCard from './room_card'
import Load1 from './Spinner';



import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;



const drawerWidth = 240;

const StyledFabField = withStyles((theme) => ({
  root: {
    position: 'absolute',
    color:`${process.env.REACT_APP_COLOR}`,
    
    '& .MuiFab-primary':{
      backgroundColor:`${process.env.REACT_APP_COLOR}`,
    },
    '& .MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color:`${process.env.REACT_APP_COLOR}`,
    },
    '& .MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
      color:`${process.env.REACT_APP_COLOR}`,
    },
  }
}))(SpeedDial);



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
  erorclass:{
    width:'50%',
    marginLeft:'25%',
  },
  textclass:{
    float: 'left',
  },
  table: {
    width:'30%'
  },
  head: {
    fontSize:'20px'
  },
  row: {
    fontSize:'20px'
  },
  barclass: {
    width:'0%',
    display: 'block',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 100,
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    
  },
  myclass: {
   

  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  
  speedDial: {
    position: 'absolute',
    color:`${process.env.REACT_APP_COLOR}`,
    '&.MuiFab':{
      backgroundColor:`${process.env.REACT_APP_COLOR}`,
    },
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color:`${process.env.REACT_APP_COLOR}`,
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
      color:`${process.env.REACT_APP_COLOR}`,
    },
  },
}));
  

function Myrooms(props) {
  const classes = useStyles();

  const actions = [
   
    { icon: <CreateOutlinedIcon />, name: 'Add a room' },
  ];

    const [error,seterror] = useState(false)
    const [myrooms,setrooms] = useState()
    const [hidden, setHidden] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [direction, setDirection] = React.useState('up');
    const [redirect, setRedirect] = React.useState(false)

   
   

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.isAuthenticated)
              
              {
               
                try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcewdsfdaegds/my_rooms/`,config);
             
                setrooms(res.data)
                
              
              }
                catch{
      
                }
                
              
        }
    }
    
    ,[props.isAuthenticated])


    

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleredirect = () => {
      setRedirect(true);
    };

    if(props.isAuthenticated===false)
    {
      return <Redirect to="/login" />;
    }


    

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }
   
    if(redirect)
    {
      return <Redirect to={{
        pathname: `/dashboard/my_rooms/edit`,
        state: { property_id: null }
      }} style={{textDecoration:'none'}} />
    }



    if(props.isAuthenticated && myrooms){
    
    
    return (
        <div>
             <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.myclass}
            spacing={3}
            >

            {
                myrooms.map(room =>
                    {
                        return <Grid item><RoomCard myroom={room} /></Grid>;
                    })
            }
            

            </Grid>

            <div className={classes.exampleWrapper}>
        <StyledFabField
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleredirect}
            />
          ))}
        </StyledFabField>
      </div>
            

            
            </main>
        </div>
    )
}
else{
  return <div><Load1 loading={true} /></div>
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(Myrooms)
