import React from 'react'
import { Carousel } from 'react-bootstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap'
import '../components/css/App.css'

const useStyles = makeStyles((theme) => ({
   imgclass:{
    filter: 'brightness(50%)',
    height: '80vh',
    objectFit:'cover',
  
   
  
   },
   myclass:{
   height: '80vh',

   
   
   },
  }));
  

function Welcome(){
    const classes = useStyles();
    return(
    <div>
        <Carousel className={classes.myclass} controls={false} indicators={false} fade={true}>
            <Carousel.Item>
                <img
                className={classes.imgclass}
                src="https://cdn.suwalls.com/wallpapers/photography/hotel-room-27502-1920x1200.jpg"
                alt="Rent=ene"
                />
                <div className="container_class">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg_me">
            <path fill="#fff" fill-opacity="1" d="M0,256L21.8,224C43.6,192,87,128,131,122.7C174.5,117,218,171,262,208C305.5,245,349,267,393,266.7C436.4,267,480,245,524,202.7C567.3,160,611,96,655,112C698.2,128,742,224,785,245.3C829.1,267,873,213,916,181.3C960,149,1004,139,1047,160C1090.9,181,1135,235,1178,256C1221.8,277,1265,267,1309,224C1352.7,181,1396,107,1418,69.3L1440,32L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
            </svg>
            </div>
                
            </Carousel.Item>
            
           
           
        </Carousel>
        
      
    </div>
    )
}

export default Welcome