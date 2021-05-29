import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width:'100vw',
    maxWidth:'450px',

  },
});



export default function BasicTable({booking,profile,name}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        
        <TableBody>
          
            <StyledTableRow key='name'>
              <StyledTableCell component="th" scope="row">
                Guest name
              </StyledTableCell>
              <StyledTableCell align="right">{booking.first_name + ' ' + booking.last_name}</StyledTableCell>
              
            </StyledTableRow>

            <StyledTableRow key='mobile'>
              <StyledTableCell component="th" scope="row">
                Mobile no.
              </StyledTableCell>
              <StyledTableCell align="right">{booking.country_code}  {booking.mobile}</StyledTableCell>
              
            </StyledTableRow>

            <StyledTableRow key='alternate_mobile'>
              <StyledTableCell component="th" scope="row">
               Alternate Mobile no.
              </StyledTableCell>
              <StyledTableCell align="right">{booking.country_code}  {booking.alternate_mobile}</StyledTableCell>
              
            </StyledTableRow>

            <StyledTableRow key='product_name'>
              <StyledTableCell component="th" scope="row">
                Name
              </StyledTableCell>
              <StyledTableCell align="right">{name}</StyledTableCell>
              
            </StyledTableRow>

            
            <StyledTableRow key='booked_from'>
              <StyledTableCell component="th" scope="row">
               Booked from
              </StyledTableCell>
              <StyledTableCell align="right">{booking.booked_from}</StyledTableCell>
              
            </StyledTableRow>

            <StyledTableRow key='booked_till'>
              <StyledTableCell component="th" scope="row">
               Booked till
              </StyledTableCell>
              <StyledTableCell align="right">{booking.booked_till}</StyledTableCell>
              
            </StyledTableRow>
            {
                booking.capacity ? <StyledTableRow key='capacity'>
                <StyledTableCell component="th" scope="row">
                 Capacity
                </StyledTableCell>
                <StyledTableCell align="right">{booking.capacity}</StyledTableCell>
                
              </StyledTableRow> :null
            }

            <StyledTableRow key='duration'>
              <StyledTableCell component="th" scope="row">
               Duration
              </StyledTableCell>
              <StyledTableCell align="right">{booking.duration} Months</StyledTableCell>
              
            </StyledTableRow>

            <StyledTableRow key='coupon'>
              <StyledTableCell component="th" scope="row">
               Coupon
              </StyledTableCell>
              <StyledTableCell align="right">{booking.coupon}</StyledTableCell>
              
            </StyledTableRow>

            

            {
                profile.is_seller ? <StyledTableRow key='paid'>
                <StyledTableCell component="th" scope="row">
                 Paid
                </StyledTableCell>
                <StyledTableCell align="right">{booking.paid ? 'Yes' : 'No'}</StyledTableCell>
                
              </StyledTableRow> :null
            }

            {
                profile.is_seller ? <StyledTableRow key='payment'>
                <StyledTableCell component="th" scope="row">
                 Amount 
                </StyledTableCell>
                <StyledTableCell align="right">{booking.currency} {booking.seller_pay}</StyledTableCell>
                
              </StyledTableRow> :null
            }

            {
                booking.cancelled ? <StyledTableRow key='cancelled'>
                <StyledTableCell component="th" scope="row">
                 Cancelled
                </StyledTableCell>
                <StyledTableCell align="right">{booking.cancelled ? 'Yes' : 'No'}</StyledTableCell>
                
              </StyledTableRow> :null
            } 

{
                booking.cancelled ? <StyledTableRow key='cancelled'>
                <StyledTableCell component="th" scope="row">
                 Cancellation date
                </StyledTableCell>
                <StyledTableCell align="right">{booking.cancelled_date.slice(0,10)}</StyledTableCell>
                
              </StyledTableRow> :null
            }

            {
                booking.cancelled ? <StyledTableRow key='cancelled'>
                <StyledTableCell component="th" scope="row">
                 Cancellation time
                </StyledTableCell>
                <StyledTableCell align="right">{booking.cancelled_date.slice(11,19)}</StyledTableCell>
                
              </StyledTableRow> :null
            }  

            {
                booking.cancelled && profile.is_seller ? <StyledTableRow key='cancelled'>
                <StyledTableCell component="th" scope="row">
                 Cancellation Reason
                </StyledTableCell>
                <StyledTableCell align="right">{booking.cancellation_reason}</StyledTableCell>
                
              </StyledTableRow> :null
            } 

{
                booking.cancelled ? <StyledTableRow key='cancelled'>
                <StyledTableCell component="th" scope="row">
                 Refund amount
                </StyledTableCell>
                <StyledTableCell align="right">{booking.currency} {booking.refund_amount}</StyledTableCell>
                
              </StyledTableRow> :null
            } 


{
                booking.is_extended ? <StyledTableRow key='is_extended'>
                <StyledTableCell component="th" scope="row">
                 Extension of other booking
                 </StyledTableCell>
                <StyledTableCell align="right">{booking.is_extended ? 'Yes' : 'No'}</StyledTableCell>
                
              </StyledTableRow> :null
            } 

{
                booking.extended_on ? <StyledTableRow key='extended_on'>
                <StyledTableCell component="th" scope="row">
                 Extended On
                </StyledTableCell>
                <StyledTableCell align="right">{booking.extended_on}</StyledTableCell>
                
              </StyledTableRow> :null
            } 

{
                booking.extended ? <StyledTableRow key='extended'>
                <StyledTableCell component="th" scope="row">
                Extended
                </StyledTableCell>
                <StyledTableCell align="right">{booking.extended ? 'Yes' : 'No'}</StyledTableCell>
                
              </StyledTableRow> :null
            } 
            {
                booking.paylater ? <StyledTableRow key='paylater'>
                <StyledTableCell component="th" scope="row">
                Pay later
                </StyledTableCell>
                <StyledTableCell align="right">{booking.paylater ? 'Yes' : 'No'}</StyledTableCell>
                
              </StyledTableRow> :null
            } 

{
                booking.paylater_date ? <StyledTableRow key='paylater_date'>
                <StyledTableCell component="th" scope="row">
                Pay later date
                </StyledTableCell>
                <StyledTableCell align="right">{booking.paylater_date ? 'Yes' : 'No'}</StyledTableCell>
                
              </StyledTableRow> :null
            } 
            
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}