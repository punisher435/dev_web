import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './css/App.css';
import RecipeReviewCard from './newcardroom';




function Scrollroom({rooms}) {

    const MenuItem = ({room}) => {
        return <RecipeReviewCard post={room}/>;
      };
      
      // All items component
      // Important! add unique key
      const Menu = (rooms) =>
        rooms.map(room => {
          
      
          return <MenuItem room={room} />;
        });

    const Arrow = ({ text, className }) => {
        return (
          <div
            className={className}
          >{text}</div>
        );
      };

    const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
    
    const [menuItems,setitems] = React.useState()

    React.useEffect(() => {
      setitems(Menu(rooms))
    },[rooms])
     
   
    
    if(rooms){
      const menu = menuItems;
      
    return (
        <div className="App">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          
          
        />
      </div>
    )}
    else{
      return <></>;
    }
}

export default Scrollroom
