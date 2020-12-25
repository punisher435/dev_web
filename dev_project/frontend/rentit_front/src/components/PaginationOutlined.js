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

  return (
    <div className={classes.root}>
      <Pagination count={totalposts/postsPerPage} variant="outlined" color="secondary" page={currentPage} onChange={handleChange} />
    </div>
  );
}