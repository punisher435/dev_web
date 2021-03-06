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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#fff" fill-opacity="1" d="M0,160L80,181.3C160,203,320,245,480,218.7C640,192,800,96,960,64C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
</svg>
            </div>
                
            </Carousel.Item>
            
           
           
        </Carousel>
        
      
    </div>
    )
}

export default Welcome