import React from 'react'
import { Carousel } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,128L60,112C120,96,240,64,360,58.7C480,53,600,75,720,101.3C840,128,960,160,1080,170.7C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </div>
          
            </Carousel.Item>
            
           
           
        </Carousel>
        
      
    </div>
    )
}

export default Welcome