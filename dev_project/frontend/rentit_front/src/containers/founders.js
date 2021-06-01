import React from 'react'
import { Carousel } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Seachbox from './Serachbox';
import Grid from '@material-ui/core/Grid';
import '../components/css/App.css'
import Hidden from '@material-ui/core/Hidden';
import bg from '../bg1.jpg';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor:'#000000',
        backgroundSize:'cover',
    },
    myclass12:{
        backgroundColor:'white',
        backgroundSize:'cover',
        height: '50vw',
   
  
    borderRadius:'10%',
    },
   imgclass:{
    
    height: '50vw',
    objectFit:'cover',
  
    borderRadius:'10%',
  
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
   height: '50vw',

   width:'80vw',
   marginTop:'20px',
   borderRadius:'10%',
   marginBottom:'50px',
   },
   txt:{
    fontSize:'40px',
    textAlign:'center',
    fontFamily: "Bree Serif",
    paddingTop:'20px',
    color:'white',
   },
  }));
  

function Welcome(){
    const classes = useStyles();
    return(
    <div className={classes.root}>
            <Typography className={classes.txt}> Meet the Founders</Typography>



            <Grid
  container
  direction="column"
  justify="center"
  alignItems="center"
>
        <Carousel className={classes.myclass} fade={true}>
            <Carousel.Item>
                
               <div className={classes.myclass12}>
               <img
                className={classes.imgclass}
                src="https://image.freepik.com/free-photo/living-room-arrangement-with-yoga-mat_23-2148741917.jpg"
                alt="Rent=ene"
                />
               </div>

          
            </Carousel.Item>

            <Carousel.Item>
                
                <img
                className={classes.imgclass}
                src="https://image.freepik.com/free-photo/living-room-arrangement-with-yoga-mat_23-2148741917.jpg"
                alt="Rent=ene"
                />

          
            </Carousel.Item>
            
           
           
        </Carousel>
      </Grid>  
      
    </div>
    )
}

export default Welcome