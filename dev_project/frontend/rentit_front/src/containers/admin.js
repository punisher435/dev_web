import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles((theme) => ({
    
  
 
    // necessary for content to be below app bar
    myclass: {
      padding:'6%'
     
  },
  
  myclass1: {
    padding:'30px'
},
    imageclass: {
      width:'350px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    erorclass: {
        width:'50%',
        marginLeft:'25%',
    },
    papernewclass:{
      padding:20,
      [theme.breakpoints.up('sm')]: {
        padding:30,
      },
     
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
     
    },
  }));

function Admin(props) {

    const classes = useStyles();

    const [booking1,setbooking1] = React.useState('')
    const [booking,setbooking] = React.useState()
    const [type,settype] = React.useState()

    const handleclick1 = async (e) => {
      e.preventDefault();

      const config = {
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
        params:{
          type:type
        },
      };
     
      
      
        try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcesejjnf298sh382g09181vsa91/admin_me/booking/${booking1}/`,config,config);
        
        setbooking(res.data)
        var x, txt = "";

        for (x in res.data) {
          txt += (x + " " + res.data[x] + "............");
        };
        
        document.getElementById("bookingobject").innerHTML = txt;
       
        
      
      }
        catch{
         
          
        }

      }
     


    if(props.profile){
    return (
        <div>

            <br />

            
            

        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
           >
             <Grid item xs={8} >

{
                props.profile.is_superuser ? <><FormControl className={classes.form}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type}
                  onChange={e => {settype(e.target.value)}}
                >
                  
                  <MenuItem value={'room'}>Room</MenuItem>
                  <MenuItem value={'shop'}>Shop</MenuItem>
                  <MenuItem value={'apartment'}>Apartment</MenuItem>
                </Select>
                
              </FormControl><TextField
                multiline
                variant="outlined"
                margin="normal"
                
                fullWidth
                rows={1}
                id="account_no"
                name="account_no"
                label="Room booking id"
                value={booking1}
                onInput={(e) => {setbooking1(e.target.value)}}

                
              /><Button variant="contained" onClick={e => {handleclick1(e)}}>Fetch</Button> </>
              : null
            }
            </Grid>
            <Grid item xs={8} >
            <p id="bookingobject"></p>
            </Grid>


           </Grid>
        </div>
    )}
    else{
        return (
            <div></div>
        )
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated,
    profile : state.authreducers.user
  });
  
export default connect(mapStateToProps)(Admin);

