import React ,{ useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({

  root1: {
    maxWidth: '100%',
    height: '100%',
    textAlign: 'center',

    borderLeft: 2,
    borderLeftColor: grey,
  },



  media: {
    height: 200,
  },

  media2: {
    height: 100,
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
  direction="col"
  justify="center"
  alignItems="center"
  spacing = {1}
>

<Grid item xs={12}>
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



<Grid item xs={12}>
<Grid
  container
  direction="col"
  justify="center"
  spacing = {1}
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
          />
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

