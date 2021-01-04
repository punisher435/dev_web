import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    root1: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    api:{
      height:'450px'
    },
    mystyle: {
      position: '-webkit-sticky',
    position: 'sticky',
    top: 0,
    },
    media1 : {
      width:'100%',
      right:0,
    },
    media2 : {
      width:'100%',
      right:0,
    },
    typo1 :{
      fontSize: '1.5rem',
      fontWeight: 'normal',
    },
    typo2 :{
      fontSize: '1rem',
      fontWeight: 'normal',
      marginLeft:'1rem',
      color:'#f50057',
    },
    paraclass:{
      marginTop:'15px',
    },
    margingrid : {
      marginTop:'100px',
    },
    sizeclass: {
      width:'50%',
      fontSize: '1.5rem',
    },
    divclass:{
      width:'80%',
      height:'30%',
      position:'absolute',
      overflowX:'hidden',
      left:30,
      right:20,
      margin: '0  auto -150px',
  
    },
    apiclass:{
      width:'100%',
      height:'100%',
      position:'absolute',
      overflowX:'hidden',
      left:'17%',
      right:20,
      margin: '0  auto -150px',
  
    },
    paraclass1 :{
      position:'relative',
      float:'bottom',
    },
    buttonclass : {
        padding:0,
    }
    
}));


function Mobileimages({props}) {

    const [photos,changephotos] = useState({
        a:props.photo1,
        b:props.photo2,
        c:props.photo3,
        d:props.photo4,
        e:props.photo5,
      })

    const classes = useStyles();
    return (
        <div>
            <Grid item xs={12}>
            <img src={photos.a} className={classes.media1}/>
          </Grid>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
          <Grid item xs={3}>
          <Button className={classes.buttonclass} onclick={() => {
                const temp=photos.a;
                changephotos({
                    ...photos,a:photos.b,b:temp,
                });
            }}><img src={photos.b} className={classes.media2}/></Button>
          </Grid>
          <Grid item xs={3}>
          <Button><img src={photos.c} className={classes.media2}/></Button>
          </Grid>
          <Grid item xs={3}>
          <Button><img src={photos.d} className={classes.media2}/></Button>
          </Grid>
          <Grid item xs={3}>
          <Button><img src={photos.e} className={classes.media2}/></Button>
          </Grid>
          
          </Grid>
        </div>
    )
}

export default Mobileimages;
