import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width:'70vw',
    maxWidth:'450px',

  },
});



export default function BasicTable({booking,profile}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        
        <TableBody>
          
            <TableRow key='name'>
              <TableCell component="th" scope="row">
                Customer name
              </TableCell>
              <TableCell align="right">{booking.first_name + ' ' + booking.last_name}</TableCell>
              
            </TableRow>

            <TableRow key='mobile'>
              <TableCell component="th" scope="row">
                Mobile no.
              </TableCell>
              <TableCell align="right">{booking.country_code}  {booking.mobile}</TableCell>
              
            </TableRow>

            <TableRow key='alternate_mobile'>
              <TableCell component="th" scope="row">
               Alternate Mobile no.
              </TableCell>
              <TableCell align="right">{booking.country_code}  {booking.alternate_mobile}</TableCell>
              
            </TableRow>

            <TableRow key='booked_from'>
              <TableCell component="th" scope="row">
               Booked from
              </TableCell>
              <TableCell align="right">{booking.booked_from}</TableCell>
              
            </TableRow>

            <TableRow key='booked_till'>
              <TableCell component="th" scope="row">
               Booked till
              </TableCell>
              <TableCell align="right">{booking.booked_till}</TableCell>
              
            </TableRow>
            {
                booking.capacity ? <TableRow key='capacity'>
                <TableCell component="th" scope="row">
                 Capacity
                </TableCell>
                <TableCell align="right">{booking.capacity}</TableCell>
                
              </TableRow> :null
            }

            <TableRow key='duration'>
              <TableCell component="th" scope="row">
               Duration
              </TableCell>
              <TableCell align="right">{booking.duration} Months</TableCell>
              
            </TableRow>

            <TableRow key='coupon'>
              <TableCell component="th" scope="row">
               Coupon
              </TableCell>
              <TableCell align="right">{booking.coupon}</TableCell>
              
            </TableRow>

            

            {
                profile.is_seller ? <TableRow key='paid'>
                <TableCell component="th" scope="row">
                 Paid
                </TableCell>
                <TableCell align="right">{booking.paid ? 'Yes' : 'No'}</TableCell>
                
              </TableRow> :null
            }

            {
                profile.is_seller ? <TableRow key='payment'>
                <TableCell component="th" scope="row">
                 Amount 
                </TableCell>
                <TableCell align="right">{booking.currency} {booking.seller_pay}</TableCell>
                
              </TableRow> :null
            }

            {
                booking.cancelled ? <TableRow key='cancelled'>
                <TableCell component="th" scope="row">
                 Cancelled
                </TableCell>
                <TableCell align="right">{booking.cancelled ? 'Yes' : 'No'}</TableCell>
                
              </TableRow> :null
            } 

{
                booking.cancelled ? <TableRow key='cancelled'>
                <TableCell component="th" scope="row">
                 Cancellation date
                </TableCell>
                <TableCell align="right">{booking.cancelled_date.slice(0,10)}</TableCell>
                
              </TableRow> :null
            }

            {
                booking.cancelled ? <TableRow key='cancelled'>
                <TableCell component="th" scope="row">
                 Cancellation time
                </TableCell>
                <TableCell align="right">{booking.cancelled_date.slice(11,19)}</TableCell>
                
              </TableRow> :null
            }  

            {
                booking.cancelled && profile.is_seller ? <TableRow key='cancelled'>
                <TableCell component="th" scope="row">
                 Cancellation Reason
                </TableCell>
                <TableCell align="right">{booking.cancellation_reason}</TableCell>
                
              </TableRow> :null
            } 

{
                booking.cancelled ? <TableRow key='cancelled'>
                <TableCell component="th" scope="row">
                 Refund amount
                </TableCell>
                <TableCell align="right">{booking.currency} {booking.refund_amount}</TableCell>
                
              </TableRow> :null
            } 


{
                booking.is_extended ? <TableRow key='is_extended'>
                <TableCell component="th" scope="row">
                 Extension of other booking
                 </TableCell>
                <TableCell align="right">{booking.is_extended ? 'Yes' : 'No'}</TableCell>
                
              </TableRow> :null
            } 

{
                booking.extended_on ? <TableRow key='extended_on'>
                <TableCell component="th" scope="row">
                 Extended On
                </TableCell>
                <TableCell align="right">{booking.extended_on}</TableCell>
                
              </TableRow> :null
            } 

{
                booking.extended ? <TableRow key='extended'>
                <TableCell component="th" scope="row">
                Extended
                </TableCell>
                <TableCell align="right">{booking.extended ? 'Yes' : 'No'}</TableCell>
                
              </TableRow> :null
            } 
            {
                booking.paylater ? <TableRow key='paylater'>
                <TableCell component="th" scope="row">
                Pay later
                </TableCell>
                <TableCell align="right">{booking.paylater ? 'Yes' : 'No'}</TableCell>
                
              </TableRow> :null
            } 

{
                booking.paylater_date ? <TableRow key='paylater_date'>
                <TableCell component="th" scope="row">
                Pay later date
                </TableCell>
                <TableCell align="right">{booking.paylater_date ? 'Yes' : 'No'}</TableCell>
                
              </TableRow> :null
            } 
            
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}