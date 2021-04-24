import React from 'react'
import { Carousel } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Seachbox from './Serachbox';
import Grid from '@material-ui/core/Grid';
import '../components/css/App.css'

const useStyles = makeStyles((theme) => ({
   imgclass:{
    
    height: 800,
    objectFit:'cover',
  
   
  
   },

   imageclass1: {
    overflow: 'hidden',
      width: '140px',
      height: '140px',
      position:'relative',
    borderRadius:'30%',
    [theme.breakpoints.up('sm')]: {
      borderRadius:'30%',
      overflow: 'hidden',
      width: '170px',
      height: '170px',
      position:'relative',
    },
    [theme.breakpoints.up('md')]: {
      borderRadius:'30%',
      overflow: 'hidden',
      width: '200px',
      height: '200px',
      position:'relative',
    },
    marginRight:'1%',
    marginLeft:'1%',
  
  },
   myclass:{
   height: 800,

   
   
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
                src="https://image.freepik.com/free-photo/living-room-arrangement-with-yoga-mat_23-2148741917.jpg"
                alt="Rent=ene"
                />
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="searchbox2"
                >
                <div className="searchbox1"><Seachbox /></div>

                </Grid>
                
                
                <div className="container_class1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,128L60,112C120,96,240,64,360,58.7C480,53,600,75,720,101.3C840,128,960,160,1080,170.7C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </div>
          
            </Carousel.Item>
            
           
           
        </Carousel>
        
      
    </div>
    )
}

export default Welcome