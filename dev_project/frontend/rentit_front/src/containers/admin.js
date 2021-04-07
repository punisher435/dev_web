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
    const [type,settype] = React.useState('')

    const [booking2,setbooking2] = React.useState('')
    const [booking22,setbooking22] = React.useState()
    const [type2,settype2] = React.useState('')

    const [room,setroom] = React.useState('')
    const [email,setemail] = React.useState()
    const [type3,settype3] = React.useState('')


    
    const [tempdiscount,settempdiscount] = React.useState()
    const [type4,settype4] = React.useState('')

    const [discount,setdiscount] = React.useState()
    const [type5,settype5] = React.useState('')

    const [commission,setcommission] = React.useState()
    const [type6,settype6] = React.useState('')

    const [type7,settype7] = React.useState('')

    const [sellercommission,setsellercommission] = React.useState()
    const [comm_type1,setcomm_type] = React.useState('percent')


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

            const handleclick5 = async (e) => {
              e.preventDefault();
              setopen(true);
        
              const config = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                params:{
                  type:type3,
                  email:email,
                },
              };
             
              
              
                try{
        
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcesfnei9uq8ahd012bwq901hababn2/admin_me/seller/1/`,config,config);
                
                setroom(res.data)
                var x, txt = "";
                res.data.map((booking) => {
                  for (x in booking) {
                    txt += ('<strong>' + x + '</strong>'+ " " + booking[x] + "<br />");
                  };
                  txt +='<br /><br /><br />'
                })
                
                
                document.getElementById("seller_room").innerHTML = txt;
                setopen(false)
               
                
              
              }
                catch{
                 
                  setopen(false)
                }
        
              }



              const handleclick6 = async (e) => {
                e.preventDefault();
                setopen(true);
          
                const config = {
                  headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `JWT ${localStorage.getItem('access')}`,
                  },
                  params:{
                    type:type4,
                    x:tempdiscount,
                  },
                };
               
                
                
                  try{
          
                  const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcesvnei929ah92vb1bx819uad8192bzs/admin_me/temp_discount/1/`,config,config);
                  
                  
                  var txt = res.data;
                  
                  
                  
                  document.getElementById("tempdiscountme").innerHTML = txt;
                  setopen(false)
                 
                  
                
                }
                  catch{
                   
                    setopen(false)
                  }
          
                }



                const handleclick7 = async (e) => {
                  e.preventDefault();
                  setopen(true);
            
                  const config = {
                    headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${localStorage.getItem('access')}`,
                    },
                    params:{
                      type:type5,
                      x:discount,
                    },
                  };
                 
                  
                  
                    try{
            
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcesnwiuqiqah8qbbavcbqkq8281h911/admin_me/discount/1/`,config,config);
                    
                    
                    var txt = res.data;
                    
                    
                    
                    document.getElementById("discountme").innerHTML = txt;
                    setopen(false)
                   
                    
                  
                  }
                    catch{
                     
                      setopen(false)
                    }
            
                  }


                  const handleclick8 = async (e) => {
                    e.preventDefault();
                    setopen(true);
              
                    const config = {
                      headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `JWT ${localStorage.getItem('access')}`,
                      },
                      params:{
                        type:type6,
                        x:commission,
                        comm_type:comm_type1,
                      },
                    };
                   
                    
                    
                      try{
              
                      const res = await axios.get(`${process.env.REACT_APP_API_URL}/soucesf3292830290sh2009223anhdhh921h/admin_me/commission/1/`,config,config);
                      
                      
                      var txt = res.data;
                      
                      
                      
                      document.getElementById("commissionme").innerHTML = txt;
                      setopen(false)
                     
                      
                    
                    }
                      catch{
                       
                        setopen(false)
                      }
              
                    }



                    const handleclick9 = async (e) => {
                      e.preventDefault();
                      setopen(true);
                
                      const config = {
                        headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `JWT ${localStorage.getItem('access')}`,
                        },
                        params:{
                         
                          x:sellercommission,
                        },
                      };
                     
                      
                      
                        try{
                
                        const res = await axios.get(`${process.env.REACT_APP_API_URL}/sourcednuw889382yhhgh23gr372938980sg932/admin_me/seller/commission/1/`,config,config);
                        
                        
                        var txt = res.data;
                        
                        
                        
                        document.getElementById("sellercommissionme").innerHTML = txt;
                        setopen(false)
                       
                        
                      
                      }
                        catch{
                         
                          setopen(false)
                        }
                
                      }




                      const handleclick10 = async (e) => {
                        e.preventDefault();
                        setopen(true);
                  
                        const config = {
                          headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `JWT ${localStorage.getItem('access')}`,
                          },
                          params:{
                           
                            type:type7
                          },
                        };
                       
                        
                        
                          try{
                  
                          const res = await axios.put(`${process.env.REACT_APP_API_URL}/sourceahwbhduih2198yay92y91gghcxvv28192192034/admin_me/refresh/1/`,config,config);
                          
                          
                          var txt = res.data;
                          
                          
                          
                          document.getElementById("refreshme").innerHTML = txt;
                          setopen(false)
                         
                          
                        
                        }
                          catch{
                           
                            setopen(false)
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
                  <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  
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
                id="booking_id"
                name="booking_id"
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
                  <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  
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
                id="room_id"
                name="room_id"
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

            <br />

            <Grid item xs={8} >

            {
                props.profile.is_superuser ? <><FormControl className={classes.form}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type3}
                  onChange={e => {settype3(e.target.value)}}
                >
                  <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  
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
                id="email"
                name="email"
                label="seller email"
                value={email}
                onInput={(e) => {setemail(e.target.value)}}

                
              /><Button variant="contained" onClick={e => {handleclick5(e)}}>Fetch</Button><br /><br />
               </>
              : null
            }
            </Grid>
            
            <Grid item xs={8} >
            <p id="seller_room"></p>
            </Grid>

            <br />

            <Grid item xs={8} >

            {
                props.profile.is_superuser ? <><FormControl className={classes.form}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type4}
                  onChange={e => {settype4(e.target.value)}}
                >
                  <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  
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
                id="temp_discount"
                name="temp_discount"
                label="Fake discount"
                value={tempdiscount}
                onInput={(e) => {settempdiscount(e.target.value)}}

                
              /><Button variant="contained" onClick={e => {handleclick6(e)}}>Apply</Button><br /><br />
               </>
              : null
            }
            </Grid>

            <Grid item xs={8} >
            <p id="tempdiscountme"></p>
            </Grid>
            
            <br />

            <Grid item xs={8} >

            {
                props.profile.is_superuser ? <><FormControl className={classes.form}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type5}
                  onChange={e => {settype5(e.target.value)}}
                >
                  <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  
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
                id="discount"
                name="discount"
                label="Company discount"
                value={discount}
                onInput={(e) => {setdiscount(e.target.value)}}

                
              /><Button variant="contained" onClick={e => {handleclick7(e)}}>Apply</Button><br /><br />
               </>
              : null
            }
            </Grid>

            <Grid item xs={8} >
            <p id="discountme"></p>
            </Grid>

            <br />


            <Grid item xs={8} >

            {
                props.profile.is_superuser ? <><FormControl className={classes.form}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type6}
                  onChange={e => {settype6(e.target.value)}}
                >
                  <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  
                  <MenuItem value={'room'}>Room</MenuItem>
                  <MenuItem value={'shop'}>Shop</MenuItem>
                  <MenuItem value={'apartment'}>Apartment</MenuItem>
                </Select>
                
              </FormControl>
              
              <FormControl className={classes.form}>
                <InputLabel id="type">Commission Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={comm_type1}
                  onChange={e => {setcomm_type(e.target.value)}}
                >
                  
                  <MenuItem value={'percent'}>Percent</MenuItem>
                  <MenuItem value={'fix'}>Fix amount</MenuItem>
                 
                </Select>
                
              </FormControl>
              
              <TextField
                multiline
                variant="outlined"
                margin="normal"
                
                fullWidth
                rows={1}
                id="discount"
                name="discount"
                label="Commission"
                value={commission}
                onInput={(e) => {setcommission(e.target.value)}}

                
              /><Button variant="contained" onClick={e => {handleclick8(e)}}>Apply</Button><br /><br />
               </>
              : null
            }
            </Grid>

            <Grid item xs={8} >
            <p id="commissionme"></p>
            </Grid>

            <br />



            <Grid item xs={8} >

            {
                props.profile.is_superuser ? <><TextField
                multiline
                variant="outlined"
                margin="normal"
                
                fullWidth
                rows={1}
                id="discount"
                name="discount"
                label="Seller Commission"
                value={sellercommission}
                onInput={(e) => {setsellercommission(e.target.value)}}

                
              /><Button variant="contained" onClick={e => {handleclick9(e)}}>Apply</Button><br /><br />
               </>
              : null
            }
            </Grid>

            <Grid item xs={8} >
            <p id="sellercommissionme"></p>
            </Grid>

            <Grid item xs={8} >

            {
                props.profile.is_superuser ? <><FormControl className={classes.form}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type7}
                  onChange={e => {settype7(e.target.value)}}
                >
                  <MenuItem value="">
            <em>None</em>
          </MenuItem>
                  
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
                id="refresh"
                name="refresh"
                label="refresh"
                value="refresh rooms"
               
                
              /><Button variant="contained" onClick={e => {handleclick10(e)}}>Refresh</Button><br /><br />
               </>
              : null
            }
            </Grid>

            <Grid item xs={8} >
            <p id="refreshme"></p>
            </Grid>

            <br />
            



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

