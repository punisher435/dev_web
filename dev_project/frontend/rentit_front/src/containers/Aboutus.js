import React from 'react'
import '../components/css/App.css'
import { fade, makeStyles } from '@material-ui/core/styles';
import { bounceInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Logo from '../logo.png';
import add1 from '../112.jpg';
import add2 from '../114.jpg';
import add3 from '../115.jpg';
import Hidden from '@material-ui/core/Hidden';

import '../components/css/aboutus.css'




const useStyles = makeStyles((theme) => ({
   myclass:{
    backgroundImage: `url(${add1})`,
    height:'1000px',
    
    backgroundSize:'cover',
    transition: 'width 5s',
    
   },
   myclass1:{
    backgroundImage:`url(${add2})`,
    height:'1000px',
    
    backgroundSize:'cover'
   },
   myclass2:{
    backgroundImage:`url(${add3})`,
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

  const loadScript11 = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };
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
          <Hidden smDown>
            <div className={`${classes.myclass}`} style={styles1.bounce}><br/><br/><br/><br/><br/><img src={Logo} className={classes.imgclass}/>
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

Rentene allows you to showcase yourproperty & connects <br /> you with the best customers all over the world.
          
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
            </Hidden>


            <Hidden mdUp>
              <div className="zoomintemp">
              <div className="bg1">
        <div style={{textAlign: 'center',}}>
            <img src="https://res.cloudinary.com/djbyqrhy9/image/upload/v1622021322/Final_logo11_guuu2a.png" className="logo" />
            <p className="tagline">Connecting customers with sellers</p>
        </div>
        <p className="head">
            Save Your Time<br />
            <span className="mid"> Rent from the comfort of your homes</span><br /><br />
        </p>
        <p className="description"> Rentene brings the best homes, shops, rooms, apartments & many more in front of your
            eyes at the comfort of your homes.
        </p>
        <p className="digital d-inline">
            <br /><br />Let's<br /> Digitalize<br /> The World<br /> Together
        </p>
    </div>
    <div className="bg2">
        <div>
            <h1 className="heading2">
                How Rentene Helps Property Owners?
            </h1>
            <p className="description2">
                Rentene allows you to showcase your property & connects you with the best customers all over the world.
            </p>
        </div>
    </div>
    <div className="bg3">
        <div>
            <h1 className="heading3">
                Rentene for Students & Achievers
            </h1>
            <p className="description3">
                Find best and affordable rooms or hostels for the time duration of your choice.<br />
                Release the pressure off your parents.
            </p>
        </div>
    </div>
    <div className="bg4">
        <h1 className="heading4">Meet The Founders</h1>
        <div className="bg5">
            <h1 className="name">Prateek Sen</h1>
            <p className="college-name">Indian Institute of Technology, Goa (2023)</p>
            <img src="https://ta-images.condecdn.net/image/e831v5XXOjb/crop/1800/f/gettyimages-961740582-square.jpg" className="image" />
            <p className="description4">
                Prateek Sen is currently a Managing Director with Shit Capital
                India and serves on the boards of BastardBucks, Fuckermaniacs, TikTok, Rentene Payments,
                ICICI Bank, HDFC Bank, Fly in Sky, BitchFuckers , KnockdownBitches, Fuckerships & GoMechanicChinmay.
                <br />
                Prior to joining Shit Capital, Prateek served as a Senior Vice President at Reliance Jio. Earlier,
                Prateek co-founded ShitNess, a mobile start-up in the US after starting his career with NASA Aeronautics Society.
            </p>
        </div>
        <div className="bg6">
            <h1 className="name">Chirag Kothari</h1>
            <p className="college-name">Indian Institute of Technology, Indore (2023)</p>
            <img src="https://ta-images.condecdn.net/image/e831v5XXOjb/crop/1800/f/gettyimages-961740582-square.jpg" className="image" />
            <p className="description4">
                Chirag Kothari is currently a Managing Director with Shit Capital
                India and serves on the boards of BastardBucks, Fuckermaniacs, TikTok, Rentene Payments,
                ICICI Bank, HDFC Bank, Fly in Sky, BitchFuckers , KnockdownBitches, Fuckerships & GoMechanicChinmay.
                <br />
                Prior to joining Shit Capital, Prateek served as a Senior Vice President at Reliance Jio. Earlier,
                Prateek co-founded ShitNess, a mobile start-up in the US after starting his career with NASA Aeronautics Society.
            </p>
        </div>
   
</div>
</div>
            </Hidden>
            
        </div>
        
    )
}

export default Aboutus
