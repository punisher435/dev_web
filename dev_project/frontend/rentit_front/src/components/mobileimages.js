import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import styles from './css/hover.module.css';
import ReactImageMagnify from 'react-image-magnify';

import SimpleModal from './imagemodal';


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
        border:0,
    },
    media3 :{
      width:'90%',
      height:'30%',
      maxHeight:'150px',
      marginTop: '10px',
      marginLeft: '5%',
      marginRight: '5%',
      marginBottom: '2%',
      display: 'flex',
    },
   
    mediaclass:{
      maxHeight:'150px',
      maxWidth:'200px',
    },
    
}));


export default function Mobileimages({p1,p2,p3,p4,p5}) {

  const [open,changeopen] = useState(false)

    const [photos,changephotos] = useState({
        a:p1,
        b:p2,
        c:p3,
        d:p4,
        e:p5,
      })

    useEffect(
      () => {
        changephotos({
          a:p1,
          b:p2,
          c:p3,
          d:p4,
          e:p5,
        });
      }
    ,[p1,p2,p3,p4,p5])

    const classes = useStyles();
    return (
        <div>
            <SimpleModal open={open} change={changeopen} photo={photos.a}/>
            <Grid item xs={12}>
            <Button className={classes.buttonclass} onClick={() => {changeopen(true);}}><img src={photos.a} className={styles.img1}/></Button>
          </Grid>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
            className={classes.media3}
          >
          <Grid item xs={3}>
          <Button className={classes.buttonclass} onClick={() => {
                const temp=photos.a;
                changephotos({
                    ...photos,a:photos.b,b:temp,
                });
            }}><div className={classes.mediaclass}><img src={photos.b} className={styles.img2}/></div></Button>
          </Grid>
          <Grid item xs={3}>
          <Button className={classes.buttonclass} onClick={() => {
                const temp=photos.a;
                changephotos({
                    ...photos,a:photos.c,c:temp,
                });
            }}><div className={classes.mediaclass}><img src={photos.c} className={styles.img2}/></div></Button>
          </Grid>
          <Grid item xs={3}>
          <Button className={classes.buttonclass} onClick={() => {
                const temp=photos.a;
                changephotos({
                    ...photos,a:photos.d,d:temp,
                });
            }}><div className={classes.mediaclass}><img src={photos.d} className={styles.img2}/></div></Button>
          </Grid>
          <Grid item xs={3}>
          <Button className={classes.buttonclass} onClick={() => {
                const temp=photos.a;
                changephotos({
                    ...photos,a:photos.e,e:temp,
                });
            }}><div className={classes.mediaclass}><img src={photos.e} className={styles.img2}/></div></Button>
          </Grid>
          
          </Grid>
        </div>
    )
}

