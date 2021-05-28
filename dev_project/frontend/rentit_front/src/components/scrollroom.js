import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { makeStyles} from '@material-ui/core/styles';
import './css/App.css';
import RecipeReviewCard from './newcardroom';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Hidden from '@material-ui/core/Hidden';


const useStyles = makeStyles((theme) => ({
  scrollclass:{
    width:'125vw',
  },
}));



function Scrollroom({rooms}) {

  const classes = useStyles();

    const MenuItem = ({room}) => {
        return <RecipeReviewCard post={room} />;
      };
      
      // All items component
      // Important! add unique key
      const Menu = (rooms) =>
        
        rooms.map(room => {
          
          return <MenuItem room={room} key={room.room_id}/>;
        })
        

        const Arrow = ({ text, className }) => {
          return (
            <Button variant="outlined"
              id={className}
            >{text}</Button>
          );
        };
  
      const ArrowLeft = Arrow({ text: <ArrowBackIosIcon />, className: 'yoyoarrow2' });
      const ArrowRight = Arrow({ text: <ArrowForwardIosIcon />, className: 'yoyoarrow1' });
    const [try1,set1] = React.useState(false)
    
    const [menuItems,setitems] = React.useState()

    React.useEffect(() => {
      setitems(Menu(rooms))
     
      
      
    },[rooms])
     
   
    
    if(rooms && menuItems){


      const menu = menuItems;
   
      
     
      
      
    return (
        <div className="App">
       <Hidden mdDown><ScrollMenu
          data={menu}
         
          className={classes.scrollclass}
         
          alignCenter={false}
          arrowClass='yoyoarrow1'
          wheel={false}
          transition={process.env.REACT_APP_Y}
          inertiaScrollingSlowdown={process.env.REACT_APP_X}
          
         
          arrowRight={ArrowRight}
          inertiaScrolling={true}
          
        /></Hidden>
         <Hidden lgUp><ScrollMenu
          data={menu}
          transition={process.env.REACT_APP_Y}
          className={classes.scrollclass}
          wheel={false}
          alignCenter={false}
          inertiaScrollingSlowdown={process.env.REACT_APP_X}
         
          inertiaScrolling={true}
          
        /></Hidden>
      </div>
    )}
    else{
      return <></>;
    }
}

export default Scrollroom
