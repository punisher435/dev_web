import React,{ useState} from 'react'
import {makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Load1 from './Spinner';




import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;






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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    
  },
}));
  

function ConfirmDelete(props) {

    const [error,seterror] = useState(false)
    const [loading,setloading] = useState(false)
    const [redirect,setredirect] = useState(false)

    const roomid = props.location.state.property_id;
    const url = props.location.state.url;
    const url1 = props.location.state.url1;
   

   


    const classes = useStyles();

    const handledelete = async (e) => {
        e.preventDefault();
        setloading(true)

        const config = {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
          };
          
          if(props.isAuthenticated)
          {
            try{const res = await axios.delete(`${process.env.REACT_APP_API_URL}/${url}/${roomid}/`,config);
            setloading(false)
            setredirect(true)
            
            
          
          }
            catch{
                setloading(false)
                seterror(true)
  
            }

    }
}

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error while deleting!' /></div>
    }
    if(redirect===true)
    {
        return <Redirect to={`/dashboard/${url1}`} />;
    }

    if(props.profile){
    
    
    return (
        <div>
             <Dashboarddrawer/>
             <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <Typography gutterBottom variant="h5" component="h2">
            Confirm delete ?
          </Typography>

          <Button color="error" onClick={e => {handledelete(e)}}>
              Delete
          </Button>
          <Link to={`/dashboard/${url1}`} >
              <Button>
                  Cancel
              </Button>
          </Link>
            
            

            
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

export default connect(mapStateToProps)(ConfirmDelete)
