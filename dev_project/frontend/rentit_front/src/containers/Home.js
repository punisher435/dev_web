import React from 'react'
import Welcome from './Welcome'
import CardList from './CardList'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import axios from 'axios'
import RecipeReviewCard from '../components/newcardroom';
import Grid from '@material-ui/core/Grid';
import Scrollroom from '../components/scrollroom';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

const useStyles = makeStyles((theme) => ({
    myclass: {
        marginLeft:'4%'
    },
  
  }));


function Home() {
    const classes = useStyles();
    const [luxrooms,setluxrooms] = React.useState([])

    React.useEffect(async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
          };
          try{const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourceaxcnfrudadv34/rooms/`,{
            params:{
             page:1,
             category: 'Deluxe room',
    
            },
            config:config
          });
          
          setluxrooms(res.data.results);
          
          }
          catch{
            
          }
    },[])

    
    return (
        <div>
           
            <Welcome/>
            <br />
            <div
            className={classes.myclass}
            >
            <Typography variant='h6'>
                <Link to='/rooms/?category=Deluxe+room' style={{textDecoration:'none',color:'black'}}>Our Deluxe Rooms...</Link>
            </Typography>
            </div>
            <br />
            
            
           
            <Scrollroom rooms={luxrooms}/>
            
                        
        </div>
    )
}

export default Home
