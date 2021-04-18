import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width:'70vw',
    maxWidth:'450px',

  },
});



export default function BasicTable({mybooking,profile,type}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        
        <TableBody>
          
            <TableRow key='wifi'>
              <TableCell component="th" scope="row">
                WIFI
              </TableCell>
              <TableCell align="right"> {mybooking.wifi ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow>
            {
              type==='room' ? <TableRow key='house_TV'>
              <TableCell component="th" scope="row">
                House TV
              </TableCell>
              <TableCell align="right"> {mybooking.house_TV ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

            {
              type==='room' ? <TableRow key='room_TV'>
              <TableCell component="th" scope="row">
                Room TV
              </TableCell>
              <TableCell align="right"> {mybooking.room_TV ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

{
              type==='shop' || type==='apartment' ? <TableRow key='TV'>
              <TableCell component="th" scope="row">
                TV
              </TableCell>
              <TableCell align="right"> {mybooking.TV ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

            {
              type==='room' || type==='apartment' ? <TableRow key='house_refridgerator'>
              <TableCell component="th" scope="row">
                House refridgerator
              </TableCell>
              <TableCell align="right"> {mybooking.house_refridgerator ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

            {
              type==='room' ? <TableRow key='room_refridgerator'>
              <TableCell component="th" scope="row">
                Room refridgerator
              </TableCell>
              <TableCell align="right"> {mybooking.room_refridgerator ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

            <TableRow key='purified_water'>
              <TableCell component="th" scope="row">
                Purified water
              </TableCell>
              <TableCell align="right"> {mybooking.purified_water ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow>

            {
              type==='room' || type==='apartment' ? <TableRow key='geyser'>
              <TableCell component="th" scope="row">
               Geyser
              </TableCell>
              <TableCell align="right"> {mybooking.geyser ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

          <TableRow key='AC'>
              <TableCell component="th" scope="row">
                AC
              </TableCell>
              <TableCell align="right"> {mybooking.AC ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow>

            <TableRow key='cooler'>
              <TableCell component="th" scope="row">
                Cooler
              </TableCell>
              <TableCell align="right"> {mybooking.cooler ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow>

            {
              type==='room' ? <TableRow key='breakfast'>
              <TableCell component="th" scope="row">
                Breakfast
              </TableCell>
              <TableCell align="right"> {mybooking.breakfast ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

            {
              type==='room' ? <TableRow key='lunch'>
              <TableCell component="th" scope="row">
                Lunch
              </TableCell>
              <TableCell align="right"> {mybooking.lunch ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }

            {
              type==='room' ? <TableRow key='dinner'>
              <TableCell component="th" scope="row">
                Dinner
              </TableCell>
              <TableCell align="right"> {mybooking.dinner ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }
            
            {
              type==='shop' ? <TableRow key='laundry'>
              <TableCell component="th" scope="row">
                Laundry
              </TableCell>
              <TableCell align="right"> {mybooking.laundry ? 'Selected' : 'Not Selected'} </TableCell>
              
            </TableRow> : null
            }



            

            
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}