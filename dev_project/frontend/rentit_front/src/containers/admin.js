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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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

    const [booking2,setbooking2] = React.useState('')
    const [booking22,setbooking22] = React.useState()
    const [type2,settype2] = React.useState()


    const [open,setopen] = React.useState()

    const handleclick1 = async (e) => {
      e.preventDefault();
      setopen(true);

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
          txt += ('<strong>' + x + '</strong>'+ " " + res.data[x] + "<br />");
        };
        
        document.getElementById("bookingobject").innerHTML = txt;
        setopen(false)
       
        
      
      }
        catch{
         
          setopen(false)
        }

      }

      const handleclick2 = async (e) => {
        e.preventDefault();

        setopen(true)
  
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
  
          const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcesejjnf298sh382g09181vsa91/admin_me/booking/${booking1}/`,config,config);
          
          handleclick1(e);
          setopen(false)
          
         
          
        
        }
          catch{
           
            setopen(false)
            setbooking('Error')
          }
  
        }



        const handleclick3 = async (e) => {
          e.preventDefault();
          setopen(true);
    
          const config = {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
            params:{
              type:type2
            },
          };
         
          
          
            try{
    
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcefej2991hw9gwggt71v1va88121/admin_me/room/${booking2}/`,config,config);
            
            setbooking22(res.data)
            var x, txt = "";
            res.data.map((booking) => {
              for (x in booking) {
                txt += ('<strong>' + x + '</strong>'+ " " + booking[x] + "<br />");
              };
              txt +='<br /><br /><br />'
            })
            
            
            document.getElementById("bookingobject22").innerHTML = txt;
            setopen(false)
           
            
          
          }
            catch{
             
              setopen(false)
            }
    
          }
    
          const handleclick4 = async (e) => {
            e.preventDefault();
    
            setopen(true)
      
            const config = {
              headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `JWT ${localStorage.getItem('access')}`,
              },
              params:{
                type:type2
              },
            };
           
            
            
              try{
      
              const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourcefej2991hw9gwggt71v1va88121/admin_me/room/${booking2}/`,config,config);
              
              handleclick3(e);
              setopen(false)
              
             
              
            
            }
              catch{
               
                setopen(false)
                setbooking22('Error')
              }
      
            }

        
      
     


    if(props.profile){
    return (
        <div>

            <br />

            <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>

            
            

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

                
              /><Button variant="contained" onClick={e => {handleclick1(e)}}>Fetch</Button><br /><br />
              <Button variant="contained" onClick={e => {handleclick2(e)}}>Cancel</Button>  </>
              : null
            }
            </Grid>
            <Grid item xs={8} >
            <p id="bookingobject"></p>
            </Grid>
            <br />


            <Grid item xs={8} >

{
                props.profile.is_superuser ? <><FormControl className={classes.form}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type2}
                  onChange={e => {settype2(e.target.value)}}
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
                label="Room id"
                value={booking2}
                onInput={(e) => {setbooking2(e.target.value)}}

                
              /><Button variant="contained" onClick={e => {handleclick3(e)}}>Fetch</Button><br /><br />
              <Button variant="contained" onClick={e => {handleclick4(e)}}>Refresh</Button>  </>
              : null
            }
            </Grid>
            <Grid item xs={8} >
            <p id="bookingobject22"></p>
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

