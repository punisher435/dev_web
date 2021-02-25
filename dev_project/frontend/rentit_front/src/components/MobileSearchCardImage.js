import React ,{ useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { grey } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import RatingWithCompliments from './MobileRatingSearchCard' 
import axios from 'axios'

axios.defaults.xsrfHeaderName = `${process.env.XSRF_COOKIE}`;
axios.defaults.xsrfCookieName = `${process.env.CSRF_COOKIE}`;

const useStyles = makeStyles((theme) => ({

  root1: {
    maxWidth: '100%',
    height: '100%',
    // textAlign: 'center',

    borderLeft: 2,
    borderLeftColor: grey,
  },
  iconroot:{
    color:'#f44336',
  },


  media: {
    height: 175,
  },

  media2: {
    height: 85,
  },
  mystyle2: {
      // fontWeight: 'bold',
      color: '#282828',
  }

}));

export default function NestedGrid({isAuthenticated,post,wishlist,changewishlist,setOpen1,wishlistitems,changeitemswishlist}) {
  const classes = useStyles();

  function MediaCard() {
    const [photos,changephotos] = useState({
      a:post.photo1,
      b:post.photo2,
      c:post.photo3,
      d:post.photo4,
      // c:'data:image/jpeg;base64,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',
      // b:'data:image/jpeg;base64,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',
      // a:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dpsQOyWEiAslBt1vqi0p-hY_YtMSXLmKCQ&usqp=CAU',
      // d:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-LmIs26AxRpNOAcQYJvD0Ki1BF2esKLrE1g&usqp=CAU',
    })

    
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
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/souraawdgrg33w24/wishlist/rooms/${post.room_id}/`,config);

          if(res.data == 'Removed from wishlist'){changewishlist(false); changeitemswishlist(wishlistitems-1); console.log(wishlistitems);}
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
              room_id:post.room_id,
            },
          };
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/souraawdgrg33w24/wishlist/rooms/`,config,config);

          if(res.data == 'Added to wishlist'){changewishlist(true); changeitemswishlist(wishlistitems+1); console.log(wishlistitems);}
        }
      }else{
        setOpen1(true);
      }

    }

    return (
      <Grid
  container
  alignItems="center"
  spacing = {1}
>

<Grid item xs={12}>
<Card className={classes.root1}>
          <CardMedia
            className={classes.media}
            image={photos.a}
            title="Contemplative Reptile"
          >
              <Grid container >
                  <Grid item xs={10}>
                  <Typography variant="h5" component="h3"  className={classes.mystyle2}>
                      <Box textAlign='left' ml={1} mt={1} className={classes.mystyle2}>
                        <span style={{color: '#282828'}}>{post.title}</span>
                        {/* <span style={{color: '#282828'}}>Chhapri Hostel, Udaipur</span> */}
                      </Box>
                    </Typography>


            <Grid container justify='flex-start'>
              <Grid item>
                <Box ml={1}>
                  <RatingWithCompliments rating={3}/>
                </Box>
              </Grid>
            </Grid>


                  </Grid>

                    <Grid item xs={1}>
                        { 
                        wishlist ? <Grid item xs={1}>
                            <IconButton color='#f44336'  onClick={(event) => {handleclick(event);}} className={classes.iconroot}>
                            <FavoriteIcon />
                            </IconButton>
                            </Grid> :
                            <Grid item xs={1}>
                                <IconButton color='#f44336'  onClick={(event) => {handleclick1(event);}} fontSize="large" className={classes.iconroot}>
                                    <FavoriteBorderOutlinedIcon />
                                    </IconButton>
                                    </Grid>
                        }
                        </Grid>
            </Grid>

              
           

          </CardMedia>
        {/* </CardActionArea> */}
    </Card>
    
</Grid>



<Grid item xs={12}>
<Grid
  container
  direction="col"
  justify="center"
  spacing = {0}
>
    
<Grid item xs={4}>
    <Card >
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


<Grid item xs={4}>
<Card>
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
          >
              
          </CardMedia>
        </CardActionArea>
      </Card>
</Grid>
<Grid item xs={4}>
<Card>
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


  function FormRow() {
    return (
      <React.Fragment>
          <Grid container justify="center">
            <Grid item xs={12}>
            <MediaCard/>
            </Grid>
          </Grid>
      </React.Fragment>
    );
  }

  return (
          <FormRow />
  );
}

