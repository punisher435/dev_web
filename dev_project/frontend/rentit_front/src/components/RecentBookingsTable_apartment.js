import React from 'react';
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
import Button from '@material-ui/core/Button';


import { Link, NavLink,Redirect } from 'react-router-dom';




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


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    backgroundColor:'white',
  },
  table2: {
    backgroundColor:'blue !important',
  },
  tablerow: {
    backgroundColor:'blue !important',
  },
  button: {
    display: 'block',
    marginTop: 2,
  },
  formControl: {
    margin: 2,
    minWidth: 85,
  },
  textclass: {
    borderBottom: 0
  },
  endclass: {
    color:'#f44336 !important',
  },
  normalclass: {
    color:'#4BB543 !important',
  },
  
});



export default function CustomizedTables2({bookings,setbookings,title}) {
  const classes = useStyles();



  return (
    <>
    <Grid container alignItems='center' justify='space-between'>
      <Grid item>
        <Typography variant="h5" color="inherit" noWrap className={classes.title}>
          <Box mt={1} ml={1} mb={1} fontWeight="fontWeightBold">
                {title} Bookings History
          </Box>
        </Typography>

      </Grid>
      
    </Grid>
    <TableContainer component={Paper} className={classes.table2}>
      <Table className={classes.table} aria-label="customized table">
      {/* <caption className={classes.caption}>Show more</caption> */}
        <TableHead className={classes.tablerow} >
          <TableRow>
            <StyledTableCell>BOOKED ON</StyledTableCell>
            <StyledTableCell align="right">PRIMARY GUEST</StyledTableCell>
            <StyledTableCell align="right">BOOKING ID</StyledTableCell>
            <StyledTableCell align="right">APARTMENT NAME</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
            <StyledTableCell align="right">BOOKING STATUS</StyledTableCell>
            <StyledTableCell align="right">DETAILS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {
            bookings.map(
              booking => (

               <StyledTableRow key={booking.booking_id}>
       
              <StyledTableCell component="th" scope="row" className={classes.textclass}>
              {booking.created_at}
              </StyledTableCell>
              <StyledTableCell align="right">{booking.first_name} {booking.last_name}</StyledTableCell>
              <StyledTableCell align="right">{booking.booking_id}</StyledTableCell>
              <StyledTableCell align="right">{booking.apartment_name}</StyledTableCell>
              <StyledTableCell align="right">{booking.price_to_be_paid}</StyledTableCell>
              <StyledTableCell align="right">{booking.cancelled ? <p className={classes.endclass}>cancelled</p> : <p className={classes.normalclass}>active</p>}</StyledTableCell>
              <StyledTableCell align="right"><Link style={{textAlign: 'center',textDecoration:'none'}} to={`/dashboard/recentbookings/apartment-bookings/${booking.booking_id}`}><Button>View details ...</Button></Link></StyledTableCell>
            </StyledTableRow>

              )
            )
          }
        </TableBody>
      </Table>
      
    </TableContainer>
    </>
  );
}
