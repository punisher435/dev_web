import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationOutlined({paginate,postsPerPage,currentPage,totalposts}) {
  const classes = useStyles();
  const handleChange = (event, value) => {
    paginate(value);
  };

  var x = totalposts/postsPerPage;
  x= Math.trunc(x);
  if (totalposts%postsPerPage!==0){x=x+1;}

  return (
    <div className={classes.root}>
      <Pagination count={x} variant="outlined" color="secondary" page={currentPage} onChange={handleChange} />
    </div>
  );
}