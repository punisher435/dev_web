import React,{ useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dashboarddrawer from '../hocs/layout2'
import axios from 'axios'
import Eror from '../components/eror'
import Grid from '@material-ui/core/Grid';


import {connect} from 'react-redux'



import SellerReviews from './seller_rating_and_reviews'

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
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft:drawerWidth,
      padding: theme.spacing(3),
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
  myclass: {
      
      width:'90vw',
      [theme.breakpoints.up('sm')]: {
        width:'60vw',
      },
  },
}));
  

function MyReviews(props) {

    const [error,seterror] = useState(false)
    const [myreviews,setreviews] = useState()

    const [params1,setparams] = useState({
        page:1,
        ordering:'-rating'
      })
    
   

    React.useEffect(
        async () => {
            const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
              };
              
              if(props.isAuthenticated && props.profile)
              
              {
               
                try{
                    const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/sourceuserjcnssjwhd9329hdw/seller/reviews/`,{
                      params:{
                        seller_id:props.profile.id,
                        page:params1.page,
                        ordering:params1.ordering,
                      },
                      config:config
                    });
                    
                   
                      
                        setreviews(res1.data.results);
                        
                        
                    }  catch (err) {
                      // Handle Error Here
                      console.error(err);
                  }
                
              
        }
    }
    
    ,[props.isAuthenticated,props.profile,params1])


    const classes = useStyles();

    

    if(error==true)
    {
      return <div className={classes.erorclass}><Eror error='Error' /></div>
    }

    if(props.isAuthenticated && myreviews){
    
    
    return (
        <div>
             <Dashboarddrawer/>
            <main className={classes.content}>
            <div className={classes.toolbar} />

            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
            <Grid item>
            <div className={classes.myclass}>
            <SellerReviews reviews={myreviews} params={params1} setparams={setparams}/>
            </div>
            </Grid>

            </Grid>

            
            </main>
        </div>
    )
}
else{
  return <div></div>
}
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  profile : state.authreducers.user
});

export default connect(mapStateToProps)(MyReviews)
