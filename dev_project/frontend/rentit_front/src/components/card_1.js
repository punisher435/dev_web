import React,{ useState } from 'react';
import { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { style } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { IconContext } from "react-icons";
import ToysIcon from '@material-ui/icons/Toys';
import WifiIcon from '@material-ui/icons/Wifi';
import HotTubIcon from '@material-ui/icons/HotTub';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { BiFoodMenu } from "react-icons/bi"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CardActionArea from '@material-ui/core/CardActionArea';
import RoomIcon from '@material-ui/icons/Room';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import RoomImage from './MobileSearchCard'


const useStyles = makeStyles((theme) => ({
root: {
maxWidth: 355,
maxLength: 400,
margin: '0 auto',
float: 'none',
 
},
media: {
height: 10,
paddingTop: '50.25%', // 16:9
marginLeft: '0px',
},
expand: {
transform: 'rotate(0deg)',
marginLeft: 'auto',
transition: theme.transitions.create('transform', {
duration: theme.transitions.duration.shortest,
}),
},
expandOpen: {
transform: 'rotate(180deg)',
},
avatar: {
backgroundColor: red[500],
},
}));

export default function RecipeReviewCard({post}) {
       const classes = useStyles();
       const [expanded, setExpanded] = React.useState(false);

 const handleExpandClick = () => {
      setExpanded(!expanded);
    };
     {
      const [photos,changephotos] = useState({
        a:post.photo1,
        b:post.photo2,
        c:post.photo3,
        d:post.photo4,
      })
    
  
 return (
<Card className={classes.root}>
 <CardHeader
 backgroundimage
   action={
        <div>
          
      <Grid item md={1}>
        { 
        post.wishlist ? <Grid item md={1}>
            <Icon color='error' className={classes.iconroot}>
            <FavoriteIcon />
            </Icon>
            </Grid> :
             <Grid item md={1}>
                 <IconButton color='secondary'  fontSize="large" className={classes.iconroot}>
                     <FavoriteBorderOutlinedIcon />
                     </IconButton>
                     </Grid>
        }
        </Grid>
       </div>
    }
      title={post.title}
    />,
    
     
 <CardMedia>
 <RoomImage post={post}/>
 </CardMedia>
 
 
<CardContent>  
<Typography variant="body1" component="h2">
        <Icon color="error"><RoomIcon /></Icon>
          {post.location},{post.city},{post.state}
        </Typography>
        <hr/>
        
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing="1"
        justify="space-around"

        >
        <IconContext.Provider value={{ size: "0.7em",}}>
        { 
        post.wifi ? <Grid item md={1}><div><Icon fontSize='small'><WifiIcon /></Icon><p >Wifi Facility</p></div></Grid> : <Grid item md={1}><div><WifiOffIcon /><p>no Wifi</p></div></Grid>
        }
        { 
        //post.geyser ? <Grid item md={1}><div><HotTubIcon /><p>  Hot Water</p></div></Grid> : <></>
        }
        { 
        post.AC ? <Grid item md={1}><div><AcUnitIcon /><p>AC</p></div></Grid> : <></>
        }
        { 
       // post.cooler ? <Grid item md={1}><div><ToysIcon /><p>Cooler</p></div></Grid> : <></>
        }
        { 
        post.laundry ? <Grid item md={1}><div><LocalLaundryServiceIcon /><p>Laundry</p></div></Grid> : <></>
        }
        { 
        post.breakfast ? <Grid item md={1}><div><FreeBreakfastIcon /><p>Breakfast</p></div></Grid> : <></>
        }
        { 
        //post.lunch ? <Grid item md={1}><div><FastfoodIcon /><p>lunch</p></div></Grid> : <></>
        }
        { 
        post.dinner ? <Grid item md={1}><div><BiFoodMenu /><p>dinner</p></div></Grid> : <></>
        }
        
       
     <IconButton
     className={clsx(classes.expand, {
[classes.expandOpen]: expanded,
})}
onClick={handleExpandClick}
aria-expanded={expanded}
aria-label="show more"
>
<ExpandMoreIcon />
  </IconButton>

        </IconContext.Provider>
           </Grid>
    <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing="2"
        >
    
        <Grid item md={4}>
        <Typography 
            color='error'  variant='h6' className={classes.textroot}>
          {post.currency}{post.final_price}
          </Typography>
          </Grid>
          <Grid item md={4}>
          <Typography
          variant='h6' className={classes.textroot1}>
          <s>{post.currency}{post.final_price}</s>
          </Typography>
          </Grid>
          <Grid item md={4}>
          <Typography
         variant='h6' className={classes.textroot2}>
            {post.owner_discount+post.company_discount}% off    
            </Typography>    
        </Grid>
    </Grid>
            
</CardContent>
<CardActions disableSpacing>

<IconButton
className={clsx(classes.expand, {
[classes.expandOpen]: expanded,
})}
onClick={handleExpandClick}
aria-expanded={expanded}
aria-label="show more"
>
<ExpandMoreIcon />
</IconButton>
</CardActions>
<Collapse in={expanded} timeout="auto" unmountOnExit>
<CardContent>
<Typography paragraph>Method:</Typography>
<Typography paragraph>
Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
minutes.
</Typography>
<Typography paragraph>
Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
</Typography>
<Typography paragraph>
Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
medium-low, add reserved shrimp and mussScrollMenuels, tucking them down into the rice, and cook
again without stirring, until mussels have opened and rice is just tender, 5 to 7
minutes more. (Discard any mussels that don’t open.)
</Typography>
<Typography>
Set aside off of the heat to let rest for 10 minutes, and then serve.
</Typography>
</CardContent>
</Collapse>
</Card>
);
}
}
