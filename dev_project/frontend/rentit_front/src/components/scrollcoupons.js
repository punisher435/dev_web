import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './css/App.css';
import RecipeReviewCard from './newcoupon';


const useStyles = makeStyles((theme) => ({
  scrollclass:{
    
  },
}));



function Scrollroom({rooms}) {

  const classes = useStyles();

    const MenuItem = ({room}) => {
        return <RecipeReviewCard mycoupon={room}/>;
      };
      
      // All items component
      // Important! add unique key
      const Menu = (rooms) =>
        
        rooms.map(room => {
          
          return <MenuItem room={room} key={room.coupoun_code}/>;
        })
        

    const Arrow = ({ text, className }) => {
        return (
          <div
            className={className}
          >{text}</div>
        );
      };

    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
    const [try1,set1] = React.useState(false)
    
    const [menuItems,setitems] = React.useState()

    React.useEffect(() => {
      setitems(Menu(rooms))
     
      
      
    },[rooms])
     
   
    
    if(rooms && menuItems){


      const menu = menuItems;
   
      
     
      
      
    return (
        <div className="App">
        <ScrollMenu
          data={menu}
          
          className={classes.scrollclass}
          wheel={true}
          alignCenter={false}
         
          
          
        />
      </div>
    )}
    else{
      return <></>;
    }
}

export default Scrollroom
