import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Sellerreview from './seller_reviews_product';

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
    width: '85%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],

    [theme.breakpoints.up('sm')]: {
        position: 'absolute',
    width: '48%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
      },
  },
}));

export default function SimpleModal({open,change,id}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);



  const handleClose = () => {
    change(false);
  };

  const body = (
    <div style={modalStyle} className={`${classes.paper}`}>
      <Sellerreview id={id} />
    </div>
  );

  return (
    <div >
      <Modal
      className="newfont"
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
