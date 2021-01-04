import React ,{ useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Icon from '@material-ui/core/Icon'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';
import RoomIcon from '@material-ui/icons/Room';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import TvOffOutlinedIcon from '@material-ui/icons/TvOffOutlined';
import { IoWaterOutline } from 'react-icons/io5';
import HotTubIcon from '@material-ui/icons/HotTub';
import ToysIcon from '@material-ui/icons/Toys';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { BiFoodMenu } from "react-icons/bi"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { BiCctv } from "react-icons/bi";
import { GiGuards } from "react-icons/gi";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BathtubIcon from '@material-ui/icons/Bathtub';
import { grey } from '@material-ui/core/colors';
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

import CustomizedRatings from './rating_meter';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(1),
    height: 400,
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary, 
  },


  root1: {
    maxWidth: 500,
    height: 300,
    textAlign: 'center',

    borderLeft: 2,
    borderLeftColor: grey,
    // display: 'flex',
    // alignItems: 'center',
  },

  root2: {
    maxWidth: '100%',
    height: '100%',
    textAlign: 'left',
    padding : '10px 0 0 20px',


    // display: 'flex',
    // alignItems: 'center',
  },
  root3: {
    maxWidth: 100,
    height: 100,
    textAlign: 'center',


    borderLeft: 2,
    borderLeftColor: grey,
    // display: 'flex',
    // alignItems: 'center',
  },


  media: {
    height: 300,
  },

  media2: {
    height: 100,
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },

  textroot: {
    marginLeft:'2px',
    fontWeight:'bold',
    fontSize:'25px',
    display: 'inline',
    
    // display: 'flex',
    // alignItems: 'center',
  },
  textroot1: {
    marginLeft:'2px',
    fontWeight:'1rem',
    fontSize:'18px',
    display: 'inline',
    marginLeft:'10px',
    color:'#877f7f'
    
    // display: 'flex',
    // alignItems: 'center',
  },
  textroot2: {
    fontWeight:'bold',
    fontSize:'20px',
    display: 'inline',
    marginLeft:'10px',
    color:'#dea300'
    
    // display: 'flex',
    // alignItems: 'center',
  },

  textroot4: {
    fontWeight:'bold',
    fontSize:'22px',
    display: 'inline',
    marginLeft:'6px',
    marginBottom:'10px',
    color:'#dea300'
    
    // display: 'flex',
    // alignItems: 'center',
  },
  textroot5: {
    color:'#f44336',
    fontSize:'16px',
    
    marginTop:'5px',
    
    // display: 'flex',
    // alignItems: 'center',
  },
  iconroot: {
    display: 'inline',
  },

  buttonroot: {
    
    color:'green'
    
    // display: 'flex',
    // alignItems: 'center',
  },
  mystyle2 :{
    fontSize:'25px',
  },

}));

export default function NestedGrid({post}) {
  const classes = useStyles();

  function MediaCard() {
    const [photos,changephotos] = useState({
      a:post.photo1,
      b:post.photo2,
      c:post.photo3,
      d:post.photo4,
    })

  
    return (
      <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  spacing = {1}
>
<Grid item md={10} xs={12}>
<Card className={classes.root1}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={photos.a}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
</Grid>
<Grid item md={2}>
<Grid
  container
  direction="column"
  justify="flex-start"
  spacing = {1}
>
<Grid item>
<Card className={classes.root3}>
        <CardActionArea>
          <CardMedia
            className={classes.media2}
            image={photos.b}
            title="Contemplative Reptile" 
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  a:photos.b,
                  b:temp,
                  c:photos.c,
                  d:photos.d,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
</Grid>
<Grid item>
<Card className={classes.root3}>
        <CardActionArea>
          <CardMedia
            className={classes.media2}
            image={photos.c}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  a:photos.c,
                  b:photos.b,
                  c:temp,
                  d:photos.d,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
</Grid>
<Grid item>
<Card className={classes.root3}>
        <CardActionArea>
          <CardMedia
            className={classes.media2}
            image={photos.d}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  a:photos.d,
                  b:photos.b,
                  c:photos.c,
                  d:temp,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
</Grid>

</Grid>

</Grid>
</Grid>
    );
  }

  function NameCard(){
    const mystyle = {
      fontSize:'13px',
    }
    
    const mystyle3 = {
      display: 'inline',
    }
    
    const y=post.owner_discount+post.company_discount;
    return (
      <Card className={classes.root2} raised={true}>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        >
        <Grid item md={10}>
        <Typography variant="h4" component="h3" className={classes.mystyle2}>
          {post.title}
        </Typography>
        </Grid>
        <Grid item md={1}>
        { 
        post.wishlist ? <Grid item md={1}><Icon color='error' className={classes.iconroot}><FavoriteIcon /></Icon></Grid> : <Grid item md={1}><Icon color='error' className={classes.iconroot}><FavoriteBorderOutlinedIcon /></Icon></Grid>
        }
        </Grid>
        <Grid item md={1}>
        { 
        post.cart ? <Grid item md={1}><Icon className={classes.iconroot}><ShoppingCartIcon /></Icon></Grid> : <Grid item md={1}><Icon className={classes.iconroot}><ShoppingCartOutlinedIcon /></Icon></Grid>
        }
        </Grid>
        </Grid>
        <Typography variant="h4" component="h3" className={classes.textroot4}>
          {post.category}
        </Typography>
        <Typography variant="body1" component="h2">
        <Icon color="error"><RoomIcon /></Icon>
          {post.location},{post.city},{post.state}
        </Typography>
        <Typography variant="body2" component="h2">
            -   near {post.landmark}
        </Typography>
        <CustomizedRatings rating={post.avg_rating}/>
        <Typography variant="body2" component="h6">
            Room of {post.capacity} people
        </Typography>
        <div style={mystyle}>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        >
        <IconContext.Provider value={{ size: "1.5em",}}>
        { 
        post.wifi ? <Grid item md={1}><div><Icon fontSize='small'><WifiIcon /></Icon><p style={mystyle}>Wifi Facility</p></div></Grid> : <Grid item md={1}><div><WifiOffIcon /><p>no Wifi</p></div></Grid>
        }
        
        { 
        post.room_TV ?  <Grid item md={1}><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>Room TV</p></div> </Grid> : <p></p>
        }
        { 
        post.house_TV ? <Grid item md={1}><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>House TV</p></div></Grid> : <div><TvOffOutlinedIcon /><p>No TV</p></div>
        }
        { 
        post.balcony ? <Grid item md={1}><div><Icon fontSize='small'><MeetingRoomOutlinedIcon /></Icon><p>Balcony</p></div></Grid> : <></>
        }
        { 
        post.separate_washroom ? <Grid item md={1}><div><Icon fontSize='small'><BathtubIcon /></Icon><p>Separate washroom</p></div></Grid> : <></>
        }
        { 
        post.purified_water ? <Grid item md={1}><div><IoWaterOutline /><p>Pure Water</p></div></Grid> : <></>
        }
        { 
        post.geyser ? <Grid item md={1}><div><HotTubIcon /><p>  Hot Water</p></div></Grid> : <></>
        }
        { 
        post.AC ? <Grid item md={1}><div><AcUnitIcon /><p>AC</p></div></Grid> : <></>
        }
        { 
        post.cooler ? <Grid item md={1}><div><ToysIcon /><p>Cooler</p></div></Grid> : <></>
        }
        { 
        post.laundry ? <Grid item md={1}><div><LocalLaundryServiceIcon /><p>Laundry</p></div></Grid> : <></>
        }
        { 
        post.iron ? <Grid item md={1}><div><WhatshotIcon /><p>Iron</p></div></Grid> : <></>
        }
        { 
        post.guest_allowed ? <Grid item md={1}><div><AccessibilityIcon /><p>Guest Allowed</p></div></Grid> : <></>
        }
        { 
        post.breakfast ? <Grid item md={1}><div><FreeBreakfastIcon /><p>Breakfast</p></div></Grid> : <></>
        }
        { 
        post.lunch ? <Grid item md={1}><div><FastfoodIcon /><p>lunch</p></div></Grid> : <></>
        }
        { 
        post.dinner ? <Grid item md={1}><div><BiFoodMenu /><p>dinner</p></div></Grid> : <></>
        }
        { 
        post.cctv_building ? <Grid item md={1}><div><BiCctv /><p>CCTV</p></div></Grid> : <></>
        }
        { 
        post.building_guard ? <Grid item md={1}><div><GiGuards /><p>Sequrity guard</p></div></Grid> : <></>
        }
        </IconContext.Provider>
        </Grid>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        >
    
        <Grid item md={8}>
          <Typography color='error' variant='h6' className={classes.textroot}>
          {post.currency}{post.final_price}
          </Typography>
          <Typography variant='h6' className={classes.textroot1}>
          <s>{post.currency}{post.price}</s>
          </Typography>
          <Typography variant='h6' className={classes.textroot2}>
            {y}% off
          </Typography>
        </Grid>
        <Grid item md={1}>
          { 
          post.booked ? <></> :<p className={classes.textroot5}>Hurry! </p>
        }
        </Grid>
        <Grid item md={3}>
          { 
          post.booked ? <Button variant="outlined" color="secondary">
          Not Avaiable
        </Button> :<Button variant="contained" color="secondary">
            Book Now
        </Button>
        }
        
          
        </Grid> 


        </Grid>
        </div>
        
      </Card>
    );
  }

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item md={5} xs={12}>
          <MediaCard/>
        </Grid>
        
        <Grid item md={7} xs={12}>
        <Link to={`/searchlist/rooms/${post.room_id}`} target="_blank">
          <NameCard/>
          </Link>
        </Grid>
       
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
        <Grid container item xs={12}>
          <FormRow />
        </Grid>
        
    </div>
  );
}

