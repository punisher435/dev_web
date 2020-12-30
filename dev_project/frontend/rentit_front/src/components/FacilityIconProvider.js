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


export default function Item({post}) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  

    const mystyle = {
      fontSize:'13px',
    }
    
    return (
      
        

       <IconContext.Provider value={{ size: "1.5em",}}>
       { 
       post.removable_wifi ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon fontSize='small' ><WifiIcon /></Icon>
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid> 
       : <></>
       }


{ 
       post.removable_house_TV ?  
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon fontSize='small' ><TvOutlinedIcon /></Icon>
               </Box>
           </Grid>
           <Grid item xs={4}>
               <Typography variant="p">
                   <Box >
                       House TV
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid> 
       : <></>
       }
       
       { 
       post.removable_room_TV ?  
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon fontSize='small' ><TvOutlinedIcon /></Icon>
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
                       ({post.cost_TV})
                   </Box>
               </Typography>
           </Grid>
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid> 
       : <></>
       }
       { 
       post.removable_purified_water ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={0}>
                   <Icon ><IoWaterOutline /></Icon>
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_geyser ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon ><HotTubIcon /></Icon>
               </Box>
           </Grid>
           <Grid item xs={4}>
               <Typography variant="p">
                   <Box >
                       Hot Water
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_AC ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon ><AcUnitIcon /></Icon>
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_cooler ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box  mr={1} ml={1}>
                   <Icon ><ToysIcon /></Icon>
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_laundry ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon ><LocalLaundryServiceIcon /></Icon>
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
                       ({post.cost_laundry})
                   </Box>
               </Typography>
           </Grid>
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_iron ?
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon ><WhatshotIcon /></Icon>
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
                       ({post.cost_iron})
                   </Box>
               </Typography>
           </Grid>
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_breakfast ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box  mr={1} ml={1}>
                   <Icon ><FreeBreakfastIcon /></Icon>
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_lunch ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon ><FastfoodIcon /></Icon>
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }
       { 
       post.removable_dinner ? 
       <Grid container alignItems="center">
           <Grid item xs={2} >
               <Box mr={1} ml={1}>
                   <Icon ><BiFoodMenu /></Icon>
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
           <Grid item>
           <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size="small"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
           </Grid>
       </Grid>
       : <></>
       }

       
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
