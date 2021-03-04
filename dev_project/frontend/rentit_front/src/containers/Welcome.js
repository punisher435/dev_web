import React from 'react'
import { Carousel } from 'react-bootstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap'

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
        <Carousel className={classes.myclass}>
            <Carousel.Item>
                <img
                className={classes.imgclass}
                src="https://cdn.suwalls.com/wallpapers/photography/hotel-room-27502-1920x1200.jpg"
                alt="Rent=ene"
                />
                <Carousel.Caption>
                <h3>Welcome!</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
           
           
        </Carousel>
      
    </div>
    )
}

export default Welcome