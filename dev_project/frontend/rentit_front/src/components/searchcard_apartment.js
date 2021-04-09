import React ,{ useState,useEffect }from 'react';
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
import { Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ScrollableIcons from './ScrollableIcons'

import CustomizedRatings from './rating_meter';
import { connect } from 'react-redux'
import axios from 'axios'
import SimpleModal1 from '../components/bookcardmodel1_apartment';

axios.defaults.xsrfHeaderName = `${process.env.REACT_APP_XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.REACT_APP_CSRF_COOKIE}`;

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
  iconroot1: {
    display: 'inline',
    color:'#f44336',
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




function NestedGrid({ mypost,setmypost,openmycard,setmycard,filters,setfilters,post, isAuthenticated, setOpen1,setOpen2,changeitemswishlist,changeitemscart,wishlistitems,cartitems}) {
  const classes = useStyles();

  const [booked,setbooked] = useState(true);

  const [wishlist,changewishlist] = useState(false)
  const [space,setspace] = useState(0);
  const date = new Date(Date.now())

  const [mybookcard,openbookcard] =  useState(false)
  const [loginpage,setloginpage] =  useState(false)

  const [newdate,setnewdate] = useState(new Date(Date.now()))
  

  const handlebookcard = e => {
    e.preventDefault();

    setmypost(post);
    setmycard(true);
  }
 
  
 

    var x;
    var y;
    if(parseInt(date.getMonth()+1)<10)
    {
      x = `0${date.getMonth()+1}`;
    }
    if(parseInt(date.getMonth()+1)>=10)
    {
      x = `${date.getMonth()+1}`;
    }
    if(parseInt(date.getDate())<10)
    {
      y = `0${date.getDate()}`;
    }
    if(parseInt(date.getDate())>=10)
    {
      y = `${date.getDate()}`;
    }

    const [mydate,setdate] = useState(`${date.getFullYear()}-${x}-${y}`)
    

  function MediaCard() {
    const [photos,changephotos] = useState({
      a:post.photo1,
      b:post.photo2,
      c:post.photo3,
      d:post.photo4,
    })

    



    useEffect(async () => {

      const date = post.bookedtill;
      var tempnew = new Date(Date.now());
      tempnew.setFullYear(parseInt(date.slice(0,4)));
      tempnew.setMonth(parseInt(date.slice(5,7))-1);
      tempnew.setDate(parseInt(date.slice(8,))+1);
      setnewdate(tempnew);
      if(filters){
        setdate(filters.bookedtill);
      }

      if( ( (parseInt(date.slice(8,)) < parseInt(mydate.slice(8,))-1) && (parseInt(date.slice(5,7))==parseInt(mydate.slice(5,7))) && (parseInt(date.slice(0,4))==parseInt(mydate.slice(0,4)) ) ) || 
      ( (parseInt(date.slice(5,7))<parseInt(mydate.slice(5,7))) && (parseInt(date.slice(0,4))==parseInt(mydate.slice(0,4))) ) ||  (parseInt(date.slice(0,4))<parseInt(mydate.slice(0,4))))
      {
          setbooked(false);
      }


      if(isAuthenticated){
      const config = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
      };
      try {
      await axios.get(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/${post.apartment_id}/`,config,config)
      .then(res => {
          
        changewishlist(res.data);
      })
      .catch(err => {
        
      })
      
      }
      catch{
      }
    }

    }
      ,[isAuthenticated,post])

  
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

    

    const handleclick = async (event) => {
      event.preventDefault();

      if(isAuthenticated)
      {
        if(wishlist)
        {
          const config = {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
          };
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/${post.apartment_id}/`,config);

          if(res.data == 'Removed from wishlist'){changewishlist(false); changeitemswishlist(wishlistitems-1);}
        }
      }else{
        setOpen1(true);
      }

    }

    const handleclick1 = async (event) => {
      event.preventDefault();

      if(isAuthenticated)
      {
        if(!wishlist)
        {
          const config = {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
            params: {
              apartment_id:post.apartment_id,
            },
          };
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/sourcenasdknahi29ad/wishlist/apartments/`,config,config);

          if(res.data == 'Added to wishlist'){changewishlist(true);  changeitemswishlist(wishlistitems+1);}
        }
      }else{
        setOpen1(true);
      }

    }

  

    

    

    
    const y=post.owner_discount+post.company_discount+post.commission+post.fake_discount;



  



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
        wishlist ? <Grid item md={1}><IconButton color='error' onClick={(event) => {handleclick(event);}} className={classes.iconroot1}><FavoriteIcon /></IconButton></Grid> : <Grid item md={1}><IconButton color='error' onClick={(event) => {handleclick1(event);}} className={classes.iconroot1}><FavoriteBorderOutlinedIcon /></IconButton></Grid>
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


        <ScrollableIcons post={post}/>
         <br />

        <div style={mystyle}>
       
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        >
    
        <Grid item md={6}>
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
        <Grid item md={3}>
          { 
          booked ? <></> :<p className={classes.textroot5}>Hurry! book now</p>
        }
        </Grid>
        <Grid item md={3}>
          { 
          !post.verified || booked ? <Button variant="outlined" color="secondary">
          Not Avaiable until {`${newdate.getDate()}-${parseInt(newdate.getMonth())+1}-${newdate.getFullYear()}`} 
        </Button> :<Button variant="contained" color="secondary" onClick={e => {handlebookcard(e);}}>
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
        <Link to={`/housing/${post.apartment_id}`} target="_blank" style={{textDecoration:'none'}}>
          <NameCard/>
          </Link>
        </Grid>
       
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
        <Grid container item xs={12}>
        <SimpleModal1 details={post} open={mybookcard} change={openbookcard} loginpage={loginpage} setloginpage={setloginpage}/>
          <FormRow />
        </Grid>
        
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.authreducers.isAuthenticated,
  access: state.authreducers.access
});

export default connect(mapStateToProps)(NestedGrid);

