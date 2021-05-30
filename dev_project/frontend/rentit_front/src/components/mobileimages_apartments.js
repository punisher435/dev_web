import React ,{ useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';

import { grey } from '@material-ui/core/colors';


import style from './css/hover.module.css'



import SimpleModal from './imagemodal';

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
  margin1:{
    padding:1,
  },


  root1: {
    width: '100%',
   
    textAlign: 'center',

    borderLeft: 2,
    borderLeftColor: grey,
  },

  root2: {
   width:200,
    height: '100%',
    textAlign: 'left',
    padding : '10px 0 0 20px',
  },


  root3: {
    maxWidth: 200,
    height: 150,
    textAlign: 'center',


    borderLeft: 2,
    borderLeftColor: grey,
  },


  media: {
    height: 500,
    width:'100vw',
    [theme.breakpoints.up('sm')]: {
      width:'100vw',
      heigth:550,
    },
  },

  media2: {
    height: 90,
   
    [theme.breakpoints.up('sm')]: {
      height: 110,
     
    },
  },

  media3: {
    height: 90,
   
   
    [theme.breakpoints.up('sm')]: {
      height: 110,
     
      
    },
   
  },
  textroot: {
    marginLeft:'2px',
    fontWeight:'bold',
    fontSize:'25px',
    display: 'inline',
  },
  textroot1: {
    marginLeft:'2px',
    fontWeight:'1rem',
    fontSize:'18px',
    display: 'inline',
    marginLeft:'10px',
    color:'#877f7f'
  },
  textroot2: {
    fontWeight:'bold',
    fontSize:'20px',
    display: 'inline',
    marginLeft:'10px',
    color:'#dea300'
  },

  textroot4: {
    fontWeight:'bold',
    fontSize:'22px',
    display: 'inline',
    marginLeft:'6px',
    marginBottom:'10px',
    color:'#dea300'
  },
  textroot5: {
    color:'#f44336',
    fontSize:'16px',
    
    marginTop:'5px',
  },
  iconroot: {
    display: 'inline',
  },
  im1:{
    
  },

  buttonroot: {
    
    color:'green'
  },
  mystyle2 :{
    fontSize:'25px',
  },
  grid1:{
    marginTop:'1%',
    width:'100vw',
   
  }

}));

export default function Mobileimages({post}) {
  const classes = useStyles();

  function MediaCard() {
    const [photos,changephotos] = useState({
      a:post.photo1,
      b:post.photo2,
      c:post.photo3,
      d:post.photo4,
      e:post.photo5,
      f:post.photo6,
      g:post.video,
    })
    const [open,changeopen] = useState(false)
  
    return (
      <Grid
  container
  direction="col"
  justify="center"
  alignItems="center"
  className="zoomtemp"
>

<SimpleModal open={open} change={changeopen} photo={photos.a}/>

<Grid>

{
  photos.a===post.video ? <Card className={classes.root1}>
  <CardActionArea>
    <CardMedia
      component="video"
      controls
      autoPlay
      className={`${classes.media}`}
      src={photos.a}
      title="Contemplative Reptile"
    
    />
  </CardActionArea>
</Card> : <Card className={classes.root1}>
        <CardActionArea>
          <CardMedia
            className={`${classes.media} ${style.pcimg1}`}
            image={photos.a}
            title="Contemplative Reptile"
            onClick={() => {changeopen(true);}}
          />
        </CardActionArea>
    </Card>
}


</Grid>




<Grid
  container
  direction="row"
  justify="center"
 
>
    
<Grid item xs={2}  className={classes.margin1}>
{
  photos.b===post.video ? <Card>
  <CardActionArea>
    <CardMedia
      className={`${classes.media3}`}
      component="video"
      autoPlay
      src={photos.b}
      title="Contemplative Reptile"
      onClick={
        () => {
          const temp=photos.a;
          changephotos({
            ...photos,
            a:photos.b,
            b:temp,
          })
        }
      }
    />
  </CardActionArea>
</Card> : <Card>
        <CardActionArea>
          <CardMedia
            className={`${classes.media2} ${style.pcimg2}`}
           
          
            image={photos.b}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  ...photos,
                  a:photos.b,
                  b:temp,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
}
</Grid>


<Grid item xs={2}  className={classes.margin1}>
{
  photos.c===post.video ? <Card>
  <CardActionArea>
    <CardMedia
      className={`${classes.media3}`}
      component="video"
      autoPlay
      src={photos.c}
      title="Contemplative Reptile"
      onClick={
        () => {
          const temp=photos.a;
          changephotos({
            ...photos,
            a:photos.c,
            c:temp,
          })
        }
      }
    />
  </CardActionArea>
</Card> : <Card>
        <CardActionArea>
          <CardMedia
            className={`${classes.media2} ${style.pcimg2}`}
           
          
            image={photos.c}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  ...photos,
                  a:photos.c,
                  c:temp,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
}
</Grid>
<Grid item xs={2}  className={classes.margin1}>
{
  photos.d===post.video ? <Card>
  <CardActionArea>
    <CardMedia
      className={`${classes.media3}`}
      component="video"
      autoPlay
      src={photos.d}
      title="Contemplative Reptile"
      onClick={
        () => {
          const temp=photos.a;
          changephotos({
            ...photos,
            a:photos.d,
            d:temp,
          })
        }
      }
    />
  </CardActionArea>
</Card> : <Card>
        <CardActionArea>
          <CardMedia
            className={`${classes.media2} ${style.pcimg2}`}
           
          
            image={photos.d}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  ...photos,
                  a:photos.d,
                  d:temp,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
}
</Grid>

<Grid item xs={2} className={classes.margin1}>
{
  photos.e===post.video ? <Card>
  <CardActionArea>
    <CardMedia
      className={`${classes.media3}`}
      component="video"
      autoPlay
      src={photos.e}
      title="Contemplative Reptile"
      onClick={
        () => {
          const temp=photos.a;
          changephotos({
            ...photos,
            a:photos.e,
            e:temp,
          })
        }
      }
    />
  </CardActionArea>
</Card> : <Card>
        <CardActionArea>
          <CardMedia
            className={`${classes.media2} ${style.pcimg2}`}
           
          
            image={photos.e}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  ...photos,
                  a:photos.e,
                  e:temp,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
}
</Grid>



<Grid item xs={2} className={classes.margin1}>
{
  photos.f===post.video ? <Card>
  <CardActionArea>
    <CardMedia
      className={`${classes.media3}`}
      component="video"
      autoPlay
      src={photos.f}
      title="Contemplative Reptile"
      onClick={
        () => {
          const temp=photos.a;
          changephotos({
            ...photos,
            a:photos.f,
            f:temp,
          })
        }
      }
    />
  </CardActionArea>
</Card> : <Card>
        <CardActionArea>
          <CardMedia
            className={`${classes.media2} ${style.pcimg2}`}
           
          
            image={photos.f}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  ...photos,
                  a:photos.f,
                  f:temp,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
}
</Grid>


<Grid item xs={2} className={classes.margin1}>
{
  photos.g===post.video ? <Card>
  <CardActionArea>
    <CardMedia
      className={`${classes.media3}`}
      component="video"
      autoPlay
      src={photos.g}
      title="Contemplative Reptile"
      onClick={
        () => {
          const temp=photos.a;
          changephotos({
            ...photos,
            a:photos.g,
            g:temp,
          })
        }
      }
    />
  </CardActionArea>
</Card> : <Card>
        <CardActionArea>
          <CardMedia
            className={`${classes.media2} ${style.pcimg2}`}
           
          
            image={photos.g}
            title="Contemplative Reptile"
            onClick={
              () => {
                const temp=photos.a;
                changephotos({
                  ...photos,
                  a:photos.g,
                  g:temp,
                })
              }
            }
          />
        </CardActionArea>
      </Card>
}
</Grid>



</Grid>
</Grid>


    );
  }



  function FormRow() {
    return (
      <React.Fragment>
          <Grid container justify="center">
            <Grid item xs={9}>
            <MediaCard/>
            </Grid>
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

