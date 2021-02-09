import React ,{ useState }from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WifiIcon from '@material-ui/icons/Wifi';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import { IoWaterOutline } from 'react-icons/io5';
import HotTubIcon from '@material-ui/icons/HotTub';
import ToysIcon from '@material-ui/icons/Toys';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import { BiFoodMenu } from "react-icons/bi"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { BiCctv } from "react-icons/bi";
import { GiGuards } from "react-icons/gi";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BathtubIcon from '@material-ui/icons/Bathtub';
import { IconContext } from "react-icons";
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { makeStyles } from '@material-ui/core/styles';
import KitchenIcon from '@material-ui/icons/Kitchen';

const useStyles = makeStyles((theme) => ({
    type1: {
        fontSize:'1.25em',
        width:'1em',
        height:'1em',
      },
      type2: {
          marginTop:'2px',
          marginBottom:'2px',
      }
  }));


export default function Item({post,bookvalues,setbookvalues}) {

    const [checked, setChecked] = React.useState(
        {wifi:'',
        house_TV:false,
        room_TV:false,
        house_refridgerator:false,
        room_refridgerator:false,
        purified_water:false,
        geyser:false,
        AC:false,
        cooler:false,
        breakfast:false,
        lunch:false,
        dinner:false}
  
    )


   
  

    const mystyle = {
      fontSize:'13px',
    }

    const mystyle1 = {
        fontSize:'1.5em',
      }
      const classes = useStyles();

     
      React.useEffect(() => {
    
        setChecked({wifi:bookvalues.wifi,house_TV:bookvalues.house_TV,room_TV:bookvalues.room_TV,
            house_refridgerator:bookvalues.house_refridgerator,room_refridgerator:bookvalues.room_refridgerator,
        purified_water:bookvalues.purified_water,geyser:bookvalues.geyser,AC:bookvalues.AC,cooler:bookvalues.cooler,
        breakfast:bookvalues.breakfast,lunch:bookvalues.lunch,dinner:bookvalues.dinner});

        
      
      },[bookvalues])
      
      const handleChange = (event) => {
        var z= bookvalues.duration; 
        var w = bookvalues.capacity
        if(bookvalues.wifi===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_wifi;
            bookvalues.month_price=bookvalues.month_price - post.cost_wifi;
        }
        if(bookvalues.wifi===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_wifi;
            bookvalues.month_price=bookvalues.month_price + post.cost_wifi;
        }
      setbookvalues({...bookvalues,wifi:!bookvalues.wifi})
    };
    const handleChange1 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.house_TV===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_TV;
            bookvalues.month_price=bookvalues.month_price - post.cost_TV;
        }
        if(bookvalues.house_TV===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_TV;
            bookvalues.month_price=bookvalues.month_price + post.cost_TV;
        }
        setbookvalues({...bookvalues,house_TV:!bookvalues.house_TV})
      };
      const handleChange2 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.room_TV===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_roomTV;
            bookvalues.month_price=bookvalues.month_price - post.cost_roomTV;
        }
        if(bookvalues.room_TV===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_roomTV;
            bookvalues.month_price=bookvalues.month_price + post.cost_roomTV;
        }
        setbookvalues({...bookvalues,room_TV:!bookvalues.room_TV})
      };
      const handleChange3 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.house_refridgerator===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_refridgerator;
            bookvalues.month_price=bookvalues.month_price - post.cost_refridgerator;
        }
        if(bookvalues.house_refridgerator===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_refridgerator;
            bookvalues.month_price=bookvalues.month_price + post.cost_refridgerator;
        }
        setbookvalues({...bookvalues,house_refridgerator:!bookvalues.house_refridgerator})
      };
      const handleChange4 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.room_refridgerator===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_roomrefridgerator;
            bookvalues.month_price=bookvalues.month_price - post.cost_roomrefridgerator;
        }
        if(bookvalues.room_refridgerator===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_roomrefridgerator;
            bookvalues.month_price=bookvalues.month_price + post.cost_roomrefridgerator;
        }
        setbookvalues({...bookvalues,room_refridgerator:!bookvalues.room_refridgerator})
      };
      const handleChange5 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.purified_water===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_purified_water;
            bookvalues.month_price=bookvalues.month_price - post.cost_purified_water;
        }
        if(bookvalues.purified_water===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_purified_water;
            bookvalues.month_price=bookvalues.month_price + post.cost_purified_water;
        }
        setbookvalues({...bookvalues,purified_water:!bookvalues.purified_water})
      };
      const handleChange6 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.geyser===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_geyser;
            bookvalues.month_price=bookvalues.month_price - post.cost_geyser;
        }
        if(bookvalues.geyser===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_geyser;
            bookvalues.month_price=bookvalues.month_price + post.cost_geyser;
        }
        setbookvalues({...bookvalues,geyser:!bookvalues.geyser})
      };
      const handleChange7 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.AC===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_AC;
            bookvalues.month_price=bookvalues.month_price - post.cost_AC;
        }
        if(bookvalues.AC===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_AC;
            bookvalues.month_price=bookvalues.month_price + post.cost_AC;
        }
        setbookvalues({...bookvalues,AC:!bookvalues.AC})
      };
      const handleChange8 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.cooler===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_cooler;
            bookvalues.month_price=bookvalues.month_price - post.cost_cooler;
        }
        if(bookvalues.cooler===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_cooler;
            bookvalues.month_price=bookvalues.month_price + post.cost_cooler;
        }
        setbookvalues({...bookvalues,cooler:!bookvalues.cooler})
      };
      const handleChange9 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.breakfast===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_breakfast;
            bookvalues.month_price=bookvalues.month_price - post.cost_breakfast;
        }
        if(bookvalues.breakfast===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_breakfast;
            bookvalues.month_price=bookvalues.month_price + post.cost_breakfast;
        }
        setbookvalues({...bookvalues,breakfast:!bookvalues.breakfast})
      };
      const handleChange10 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.lunch===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_lunch;
            bookvalues.month_price=bookvalues.month_price - post.cost_lunch;
        }
        if(bookvalues.lunch===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_lunch;
            bookvalues.month_price=bookvalues.month_price + post.cost_lunch;
        }
        setbookvalues({...bookvalues,lunch:!bookvalues.lunch})
      };
      const handleChange11 = (event) => {
        var w = bookvalues.capacity
        var z= bookvalues.duration; 
        if(bookvalues.dinner===true)
        {
            bookvalues.price=bookvalues.price - w*z*post.cost_dinner;
            bookvalues.month_price=bookvalues.month_price - post.cost_dinner;
        }
        if(bookvalues.dinner===false)
        {
            bookvalues.price=bookvalues.price + w*z*post.cost_dinner;
            bookvalues.month_price=bookvalues.month_price + post.cost_dinner;
        }
        setbookvalues({...bookvalues,dinner:!bookvalues.dinner})
      };

    return (
      
        

       <IconContext.Provider value={{ size: "1.5em",}}>

        <Grid container alignItems="center" spacing={1}>
        {
            post.electricity ? 
            <Grid container alignItems="center" className={classes.type2}>
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon className={classes.type1}><FlashOnIcon className={classes.type1}/></Icon>
               </Box>
           </Grid>
           <Grid item xs={4}>
               <Typography variant="p">
                   <Box >
                       Electricity
                   </Box>
               </Typography>
           </Grid>
           <Grid item xs={2}>
               <Typography variant='p'>
                   <Box>
                       ({post.cost_electricity})
                   </Box>
               </Typography>
           </Grid>
           <Grid item>
           
           </Grid>
       </Grid>  : null
        }

{
            post.water_facility ? 
            <Grid container alignItems="center" className={classes.type2}>
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <IoWaterOutline />
               </Box>
           </Grid>
           <Grid item xs={4}>
               <Typography variant="p">
                   <Box >
                       Water facility
                   </Box>
               </Typography>
           </Grid>
           <Grid item xs={2}>
               <Typography variant='p'>
                   <Box>
                       ({post.cost_water})
                   </Box>
               </Typography>
           </Grid>
           <Grid item>
           
           </Grid>
       </Grid>  : null
        }

       { 

        post.wifi ? 
        <Grid container alignItems="center" className={classes.type2}>
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon fontSize='small' className={classes.type1}><WifiIcon className={classes.type1}/></Icon>
               </Box>
           </Grid>
           <Grid item xs={4}>
               <Typography variant="p">
                   <Box >
                       Wifi Facility
                   </Box>
               </Typography>
           </Grid>
           <Grid item xs={2}>
               <Typography variant='p'>
                   <Box>
                       ({post.cost_wifi})
                   </Box>
               </Typography>
           </Grid>

           {
               post.removable_wifi ? <Grid item>
               <Checkbox
                        checked={checked.wifi===true}
                        onChange={handleChange}
                        size="small"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
               </Grid> : null
           }
           
       </Grid> : null
       }


{ 
       post.house_TV ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><TvOutlinedIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                      Common TV
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_TV})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_house_TV ? <Grid item>
              <Checkbox
                       checked={checked.house_TV===true}
                       onChange={handleChange1}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
          }
          
      </Grid> : null
       }
       
       { 
       post.room_TV ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><TvOutlinedIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                      Room TV
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_roomTV})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_room_TV ? <Grid item>
              <Checkbox
                       checked={checked.room_TV===true}
                       onChange={handleChange2}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
          }
          
      </Grid> : null
       }


{ 
       post.house_refridgerator ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><KitchenIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                   House refridgerator
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_refridgerator})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_house_refridgerator ? <Grid item>
              <Checkbox
                       checked={checked.house_refridgerator===true}
                       onChange={handleChange3}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
          }
          
      </Grid> : null
       }
       
       { 
       post.room_refridgerator ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><KitchenIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Room refridgerator
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_roomrefridgerator})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_room_refridgerator ? <Grid item>
              <Checkbox
                       checked={checked.room_refridgerator===true}
                       onChange={handleChange4}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
          }
          
      </Grid> : null
       }



       { 

post.purified_water ? 
<Grid container alignItems="center" className={classes.type2}>
   <Grid item xs={2} >
       <Box mr={1} ml={1}>
          <IoWaterOutline />
       </Box>
   </Grid>
   <Grid item xs={4}>
       <Typography variant="p">
           <Box >
           Pure Water
           </Box>
       </Typography>
   </Grid>
   <Grid item xs={2}>
       <Typography variant='p'>
             <Box>
                ({post.cost_purified_water})
            </Box>
       </Typography>
   </Grid>

   {
       post.removable_purified_water ? <Grid item>
       <Checkbox
                checked={checked.purified_water===true}
                onChange={handleChange5}
                size="small"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
       </Grid> : null
   }
   
</Grid> : null

       
       }
       { 
       post.geyser ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><HotTubIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Geyser
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_geyser})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_geyser ? <Grid item>
              <Checkbox
                       checked={checked.geyser===true}
                       onChange={handleChange6}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
       }
       </Grid> :null 
}

{ 
       post.AC ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><AcUnitIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  AC
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_AC})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_AC ? <Grid item>
              <Checkbox
                       checked={checked.AC===true}
                       onChange={handleChange7}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
       }
       </Grid> :null 
}

{ 
       post.cooler ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><ToysIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Cooler
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_cooler})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_cooler ? <Grid item>
              <Checkbox
                       checked={checked.cooler===true}
                       onChange={handleChange8}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
       }
       </Grid> :null 
}

{ 
       post.laundry ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><LocalLaundryServiceIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Laundry
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_laundry}/use)
                   </Box>
              </Typography>
          </Grid>

          
       </Grid> :null 
}


{ 
       post.iron ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><WhatshotIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Iron
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_iron}/use)
                   </Box>
              </Typography>
          </Grid>

          
       </Grid> :null 
}

{ 
       post.breakfast ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><FreeBreakfastIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Breakfast
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_breakfast})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_breakfast ? <Grid item>
              <Checkbox
                       checked={checked.breakfast===true}
                       onChange={handleChange9}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
       }
       </Grid> :null 
}

{ 
       post.lunch ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><FastfoodIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Lunch
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_lunch})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_lunch ? <Grid item>
              <Checkbox
                       checked={checked.lunch===true}
                       onChange={handleChange10}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
       }
       </Grid> :null 
}

{ 
       post.dinner ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><BiFoodMenu className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Dinner
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_dinner})
                   </Box>
              </Typography>
          </Grid>

          {
              post.removable_dinner ? <Grid item>
              <Checkbox
                       checked={checked.dinner===true}
                       onChange={handleChange11}
                       size="small"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                   />
              </Grid> : null
       }
       </Grid> :null 
}
   
{ 
       post.room_cleaning ? 
       <Grid container alignItems="center" className={classes.type2}>
          <Grid item xs={2} >
              <Box mr={1} ml={1}>
                  <Icon className={classes.type1}><LocalLaundryServiceIcon className={classes.type1}/></Icon>
              </Box>
          </Grid>
          <Grid item xs={4}>
              <Typography variant="p">
                  <Box >
                  Room Cleaning
                  </Box>
              </Typography>
          </Grid>
          <Grid item xs={2}>
              <Typography variant='p'>
                    <Box>
                       ({post.cost_cleaning}/use)
                   </Box>
              </Typography>
          </Grid>

          
       </Grid> :null 
}
   
       
       
     

       </Grid>

       
       </IconContext.Provider>

    )
    
}


// <IconContext.Provider value={{ size: "1.5em",}}>
//         { 
//         post.wifi ? 
//         <Grid item ><div><Icon fontSize='small' ><WifiIcon /></Icon><p style={mystyle}>Wifi Facility</p></div></Grid> 
//         : <></>
//         }
        
//         { 
//         post.room_TV ?  
//         <Grid item ><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>Room TV</p></div> </Grid> 
//         : <p></p>
//         }
//         { 
//         post.house_TV ? 
//         <Grid item ><div><Icon fontSize='small'><TvOutlinedIcon /></Icon><p>House TV</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.balcony ? 
//         <Grid item ><div><Icon fontSize='small'><MeetingRoomOutlinedIcon /></Icon><p>Balcony</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.separate_washroom ? 
//         <Grid item><div><Icon fontSize='small'><BathtubIcon /></Icon><p>Separate washroom</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.purified_water ? 
//         <Grid item ><div><IoWaterOutline /><p>Pure Water</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.geyser ? 
//         <Grid item ><div><HotTubIcon /><p>  Hot Water</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.AC ? 
//         <Grid item ><div><AcUnitIcon /><p>AC</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.cooler ? 
//         <Grid item ><div><ToysIcon /><p>Cooler</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.laundry ? 
//         <Grid item ><div><LocalLaundryServiceIcon /><p>Laundry</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.iron ?
//          <Grid item ><div><WhatshotIcon /><p>Iron</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.guest_allowed ? 
//         <Grid item ><div><AccessibilityIcon /><p>Guest Allowed</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.breakfast ? <Grid item ><div><FreeBreakfastIcon /><p>Breakfast</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.lunch ? 
//         <Grid item ><div><FastfoodIcon /><p>lunch</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.dinner ? 
//         <Grid item ><div><BiFoodMenu /><p>dinner</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.cctv_building ? 
//         <Grid item ><div><BiCctv /><p>CCTV</p></div></Grid> 
//         : <></>
//         }
//         { 
//         post.building_guard ? 
//         <Grid item><div><GiGuards /><p>Sequrity guard</p></div></Grid> 
//         : <></>
//         }
//         </IconContext.Provider>









    //    <IconContext.Provider value={{ size: "1.5em",}}>
    //     { 
    //     post.wifi ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon fontSize='small' ><WifiIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                     Wifi Facility
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid> 
    //     : <></>
    //     }
        
    //     { 
    //     post.room_TV ?  
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon fontSize='small' ><TvOutlinedIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Room TV
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid> 
    //     : <p></p>
    //     }
    //     { 
    //     post.house_TV ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon fontSize='small' ><TvOutlinedIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 House TV
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid> 
    //     : <></>
    //     }
    //     { 
    //     post.balcony ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon fontSize='small' ><MeetingRoomOutlinedIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Balcony
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid> 
    //     : <></>
    //     }
    //     { 
    //     post.separate_washroom ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon fontSize='small' ><BathtubIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Separate washroom
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.purified_water ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><IoWaterOutline /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                     Pure Water
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.geyser ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><HotTubIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Hot Water
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.AC ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><AcUnitIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 AC
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.cooler ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><ToysIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                     Cooler
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.laundry ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><LocalLaundryServiceIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Laundry
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.iron ?
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><WhatshotIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Iron
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.guest_allowed ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><AccessibilityIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Guest Allowed
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.breakfast ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><FreeBreakfastIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Breakfast
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.lunch ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><FastfoodIcon /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Lunch
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.dinner ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><BiFoodMenu /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 dinner
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.cctv_building ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><BiCctv /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 CCTV
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     { 
    //     post.building_guard ? 
    //     <Grid container alignItems="center">
    //         <Grid item>
    //             <Box textAlign='center'>
    //                 <Icon ><GiGuards /></Icon>
    //             </Box>
    //         </Grid>
    //         <Grid item>
    //             <Typography variant="p">
    //                 <Box textAlign='center' mt={1}>
    //                 Sequrity guard
    //                 </Box>
    //             </Typography>
    //         </Grid>
    //     </Grid>
    //     : <></>
    //     }
    //     </IconContext.Provider>
