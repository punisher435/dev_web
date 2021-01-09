import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ReactImageMagnify from 'react-image-magnify';
import style from './css/imagemodel.module.css';

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
    width: '75%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

export default function SimpleModal({open,change,photo}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);



  const handleClose = () => {
    change(false);
  };

  const body = (
    <div style={modalStyle} className={`${classes.paper} ${style.boxclass}`}>
      <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: photo
    },
    largeImage: {
        src: photo,
        width: 1200,
        height: 1800
    }
} }  enlargedImagePosition='over' fadeDurationInMs={400} className={`${style.boxclass}`}/>
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
