import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
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
    maxWidth:'400px',

  },
});






export default function BasicTable({mybooking,profile,type}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        
        <TableBody>
          
            <StyledTableRow key='wifi'>
              <StyledTableCell component="th" scope="row">
                WIFI
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.wifi ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow>
            {
              type==='room' ? <StyledTableRow key='house_TV'>
              <StyledTableCell component="th" scope="row">
                House TV
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.house_TV ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

            {
              type==='room' ? <StyledTableRow key='room_TV'>
              <StyledTableCell component="th" scope="row">
                Room TV
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.room_TV ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

{
              type==='shop' || type==='apartment' ? <StyledTableRow key='TV'>
              <StyledTableCell component="th" scope="row">
                TV
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.TV ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

            {
              type==='room' || type==='apartment' ? <StyledTableRow key='house_refridgerator'>
              <StyledTableCell component="th" scope="row">
                House refridgerator
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.house_refridgerator ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

            {
              type==='room' ? <StyledTableRow key='room_refridgerator'>
              <StyledTableCell component="th" scope="row">
                Room refridgerator
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.room_refridgerator ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

            <StyledTableRow key='purified_water'>
              <StyledTableCell component="th" scope="row">
                Purified water
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.purified_water ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow>

            {
              type==='room' || type==='apartment' ? <StyledTableRow key='geyser'>
              <StyledTableCell component="th" scope="row">
               Geyser
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.geyser ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

          <StyledTableRow key='AC'>
              <StyledTableCell component="th" scope="row">
                AC
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.AC ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow>

            <StyledTableRow key='cooler'>
              <StyledTableCell component="th" scope="row">
                Cooler
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.cooler ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow>

            {
              type==='room' ? <StyledTableRow key='breakfast'>
              <StyledTableCell component="th" scope="row">
                Breakfast
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.breakfast ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

            {
              type==='room' ? <StyledTableRow key='lunch'>
              <StyledTableCell component="th" scope="row">
                Lunch
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.lunch ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }

            {
              type==='room' ? <StyledTableRow key='dinner'>
              <StyledTableCell component="th" scope="row">
                Dinner
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.dinner ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }
            
            {
              type==='shop' ? <StyledTableRow key='laundry'>
              <StyledTableCell component="th" scope="row">
                Laundry
              </StyledTableCell>
              <StyledTableCell align="right"> {mybooking.laundry ? 'Selected' : 'Not Selected'} </StyledTableCell>
              
            </StyledTableRow> : null
            }



            

            
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}