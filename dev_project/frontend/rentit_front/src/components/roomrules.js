



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {
  const top = '50' ;
  const left = '50' ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width:'100%',
   
   
    maxWidth:'400px',
    height:'75vh',
    overflowY: 'scroll',
    overflowx: 'hidden',
    maxHeight:'731px',
    
    top:'15vh',
    left:'8vw',
    padding:20,
    backgroundColor:' #f0e4e4',
    backgroundSize:'cover',
    

    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      padding:20,
      width:'100%',
      maxWidth:'400px',
      height:'75vh',maxHeight:'731px',
      overflowY: 'scroll',
      overflowx: 'hidden',
      backgroundColor:' #f0e4e4',
      backgroundSize:'cover',
      top:'25vh',
      left:'30vw',
    },

    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      padding:20,
      width:'100%',
      maxWidth:'700px',
      height:'75vh',maxHeight:'731px',
      overflowY: 'scroll',
      overflowx: 'hidden',
      backgroundColor:' #f0e4e4 ',
      backgroundSize:'cover',
      top:'15vh',
      left:'27vw',
    },
 
    
   
 

   
    boxShadow: theme.shadows[5],
  },
}));

export default function SimpleModal1({open,handleopen,handleclose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);



  const handleClose = () => {
    handleclose(false);
  };

  const body = (
    <div className={`${classes.paper}`}>
       <h2 id="roomrules_title">Instructions for filling :</h2>
           
           <ol>
           <li className={classes.textclass}>
             Your added property won't be avaiable for booking on the website until it gets verified
           </li>
           <li className={classes.textclass}>
            All * marked fields are required.
           </li>
               <li className={classes.textclass}>
                      All images,video and address proof are necessary for verification. However you don't have to add them all at once, you can
                      submit the form without uploading them.
               </li>
               <li className={classes.textclass}>
                     Address proof includes:
                     <ul>
                       <li>Passport</li>
                       <li>Voter ID Card or Election Commission Photo ID Card</li>
                       <li>Ration Card</li>
                       <li>Aadhaar Card</li>
                       <li>Permanent Driving License</li>
                       <li>Utility Bills (water, electricity, phone or gas bill)</li>
                       <li>Notarized Sale Agreement</li>
                       <li>Address Proof Affidavit</li>

                     </ul>
               </li>
               <li className={classes.textclass}>
                 All information filled in this form must be correct and valid
               </li>
               <li className={classes.textclass}>
                 Address proof once uploaded cannot be changed
               </li>
               <li className={classes.textclass}>
                 City, District, State, Country, are not editable once submitted
               </li>
               <li className={classes.textclass}>
                 The final price asked in the form is the one after the discount (if any) and all the other facilites charge will be added during payment (except laundry(in case of rooms only), iron, cleaning)  
               </li>
               <li className={classes.textclass}>
                 If you don't charge a fixed amount on electricity and water supply, but charge it according to the consumption by the guest
                 ,then you must enter 0 in the respective fields and write it down in the room,shop or house policy section
               </li>

               <li className={classes.textclass}>
                 The video and images of the room, shop or apartment should cover the whole property and should be recorded in proper light.
               </li>

               <li className={classes.textclass}>
                 You must mark the location of the property in the map in order to submit the map (it is editable even after submitting the form)
  </li>

                 <li className={classes.textclass}>
           If you want to view these instructions again, then click the button "view instructions" on the bottom of the page
           </li>
           </ol>
      
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
