import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#6C757D',
    color: theme.palette.common.white,
    // height: ,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      height: 70,
    },
    '&:nth-of-type(even)': {
      // backgroundColor: theme.palette.action.hover,
      height: 70,
    },
  },
}))(TableRow);

function preventDefault(event) {
  event.preventDefault();
}

function createData(bookedOn, primaryGuest, bookingId, hostelName, price, paymentStatus ) {
  return {bookedOn, primaryGuest, bookingId, hostelName, price, paymentStatus };
}

const rows = [
  createData("11 Mar '18", "Jatin Lambho", "UGIN7N6", "Rentit 13324", "$ 1234", "Pending"),
  createData("11 Mar '18", "Jatin Lambho", "UGIN7N6", "Rentit 13324", "$ 1234", "Pending"),
  createData("11 Mar '18", "Jatin Lambho", "UGIN7N6", "Rentit 13324", "$ 1234", "Pending"),
  createData("11 Mar '18", "Jatin Lambho", "UGIN7N6", "Rentit 13324", "$ 1234", "Pending"),
  createData("11 Mar '18", "Jatin Lambho", "UGIN7N6", "Rentit 13324", "$ 1234", "Pending"),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  button: {
    display: 'block',
    marginTop: 2,
  },
  formControl: {
    margin: 2,
    minWidth: 85,
  },
  
});



export default function CustomizedTables() {
  const classes = useStyles();
  const [duration, setDuration] = React.useState('all');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
    <Grid container alignItems='center' justify='space-between'>
      <Grid item>
        <Typography variant="h5" color="inherit" noWrap className={classes.title}>
          <Box mt={1} ml={1} mb={1} fontWeight="fontWeightBold">
                Booking History
          </Box>
        </Typography>

      </Grid>
      <Grid item>
        <Box mr={1} mt={1} mb={1}>

      <FormControl className={classes.formControl} >
        <InputLabel id="demo-controlled-open-select-label">Duration</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={duration}
          onChange={handleChange}
          MenuProps={MenuProps}
          >
          <MenuItem value="all" >
            <em>all</em>
          </MenuItem>
          <MenuItem value={1}>1 month</MenuItem>
          <MenuItem value={2}>2 months</MenuItem>
          <MenuItem value={3}>3 months</MenuItem>
          <MenuItem value={4}>4 months</MenuItem>
          <MenuItem value={5}>5 months</MenuItem>
          <MenuItem value={6}>6 months</MenuItem>
          <MenuItem value={7}>7 months</MenuItem>
          <MenuItem value={8}>8 months</MenuItem>
          <MenuItem value={9}>9 months</MenuItem>
          <MenuItem value={10}>10 months</MenuItem>
          <MenuItem value={11}>11 months</MenuItem>
          <MenuItem value={12}>1 year</MenuItem>
          <MenuItem value={13}>1    year 1 month</MenuItem>
          <MenuItem value={14}>1 year 2 months</MenuItem>
          <MenuItem value={15}>1 year 3 months</MenuItem>
          <MenuItem value={16}>1 year 4 months</MenuItem>
          <MenuItem value={17}>1 year 5 months</MenuItem>
          <MenuItem value={18}>1 year 6 months</MenuItem>
          <MenuItem value={19}>1 year 7 months</MenuItem>
          <MenuItem value={20}>1 year 8 months</MenuItem>
          <MenuItem value={21}>1 year 9 months</MenuItem>
          <MenuItem value={22}>1 year 10 months</MenuItem>
          <MenuItem value={23}>1 year 11 months</MenuItem>
          <MenuItem value={24}>2 years</MenuItem>
        </Select>
      </FormControl>
          </Box>

      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
      {/* <caption className={classes.caption}>Show more</caption> */}
        <TableHead>
          <TableRow>
            <StyledTableCell>BOOKED ON</StyledTableCell>
            <StyledTableCell align="right">PRIMARY GUEST</StyledTableCell>
            <StyledTableCell align="right">BOOKING ID</StyledTableCell>
            <StyledTableCell align="right">HOSTEL NAME</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
            <StyledTableCell align="right">PAYMENT STATUS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
              {row.bookedOn}
              </StyledTableCell>
              <StyledTableCell align="right">{row.primaryGuest}</StyledTableCell>
              <StyledTableCell align="right">{row.bookingId}</StyledTableCell>
              <StyledTableCell align="right">{row.hostelName}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.paymentStatus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
        <Typography variant="subtitle1" color="inherit" noWrap className={classes.title}>
      <Box mt={1} ml={1} mb={1} >
            See More Orders
      </Box>
          </Typography>
        </Link>
      </div>
    </TableContainer>
    </>
  );
}
