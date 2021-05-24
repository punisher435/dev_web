import React from 'react'
import '../components/css/App.css'
import { fade, makeStyles } from '@material-ui/core/styles';
import { bounceInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
   myclass:{
    backgroundImage:'url(../112.jpg)',
    height:'1000px',
    
    backgroundSize:'cover',
    transition: 'width 5s',
    
   },
   myclass1:{
    backgroundImage:'url(../114.jpg)',
    height:'1000px',
    
    backgroundSize:'cover'
   },
   myclass2:{
    backgroundImage:'url(../115.jpg)',
    height:'1000px',
    
    backgroundSize:'cover'
   },
   imgclass:{
    width:'30vw',
    maxWidth:3000,
    marginLeft:'20vw',
   },
   textclass:{
    fontFamily:"'Tangerine', serif",
       fontSize:'30px',
       marginLeft:'30px',
       color:'#42413e'
   },
   textclass1:{
    fontFamily:"'Farro', serif",
    fontSize:'30px',
    
    color:'#42413e',
    marginRight:'10px',
   
},
headclass1:{
    fontFamily:"'Farro', serif",
    fontSize:'100px',
    fontWeight:'bold',
    
    color:'#42413e',
    marginRight:'40px',
    marginTop:'100px',
},
headclass2:{
    fontFamily:"'Farro', serif",
    fontSize:'100px',
    fontWeight:'bold',
    
    color:'#42413e',
    marginRight:'250px',
    marginTop:'30px',
},
headclass3:{
    fontFamily:"'Farro', serif",
    fontSize:'100px',
    fontWeight:'bold',
    
    color:'#42413e',
    marginRight:'40px',
    
},
gridclass:{
   
},
  }));


  const styles1 = {
    bounce: {
      animation: 'x 3s',
      animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft')
    }
  }
   

  

function Aboutus() {
    const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://fonts.googleapis.com/css?family=Farro";
        document.body.appendChild(script);
      };

      const loadScript1 = () => {
        const script = document.createElement("script");
        script.src = "https://fonts.googleapis.com/css?family=Tangerine";
        document.body.appendChild(script);
      };
    const classes= useStyles();
    loadScript();loadScript1();
    return (
        <div>
            <div className={`${classes.myclass}`} style={styles1.bounce}><br/><br/><br/><br/><br/><img src='/logo.png' className={classes.imgclass}/>
            <br />
            <Typography className={classes.textclass} >

            hello world
            </Typography>
            
            </div>
            <div className={`${classes.myclass1}`} style={styles1.bounce}>

            <Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
>
            <Grid item className={classes.gridclass1} >
            <Typography className={classes.headclass1} >

How Rentene helps <br />property owners?
<br />
</Typography>

</Grid></Grid>

<Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
>
            <Grid item className={classes.gridclass1} >
           
<Typography className={classes.textclass1} >

How Rentene helps property owners?
<br />
</Typography>
</Grid></Grid>
            </div>
            


            <div className={`${classes.myclass2}`}>

            <Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="flex-end"
>
            <Grid item className={classes.gridclass1} >
            <Typography className={classes.headclass2} >

Rentene for 
</Typography>
</Grid></Grid>

<Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
>
            <Grid item className={classes.gridclass1} >
            <Typography className={classes.headclass3} >

Students and Achievers
<br /></Typography>
</Grid></Grid>
            </div>
            
        </div>
    )
}

export default Aboutus
