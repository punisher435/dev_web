import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
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
    
  },
  font:{
      fontWeight: 'bold',
      
     
  },
  font1:{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:'20px',
    
   
}
});

function createData(name, value) {
  return { name, value};
}





export default function BasicTable({room}) {
  const classes = useStyles();

  const rows = [
    createData('WIFI', `${room.wifi ? 'Yes' : 'No'}` ),
    createData('Purified Water', `${room.purified_water ? 'Yes' : 'No'}` ),
    createData('TV', `${room.TV ? 'Yes' : 'No'}` ),
    createData('Power Backup', `${room.power_backup ? 'Yes' : 'No'}` ),
    
    createData('AC', `${room.AC ? 'Yes' : 'No'}` ),
    createData('Cooler', `${room.cooler ? 'Yes' : 'No'}` ),
    
    createData('Shop cleaning', `${room.shop_cleaning ? 'Yes' : 'No'}` ),
    
    
    createData('CCTV in building', `${room.cctv_building ? 'Yes' : 'No'}` ),
    createData('Sequrity Guard in building', `${room.building_guard ? 'Yes' : 'No'}` ),
    createData('Separate Washroom', `${room.separate_washroom ? 'Yes' : 'No'}` ),
    createData('Electricity', `${room.electricity ? 'Yes' : 'No'}` ),
    createData('Water Facility', `${room.water_facility ? 'Yes' : 'No'}` ),
  ];

  const rows1 = [
    createData('Category', room.category ),
   
    createData('Gender Specificty', `${room.gender}` ),
    createData('Verified', `${room.verified ? 'Yes' : 'No'}` ),
    createData('Address', room.location ),
    createData('City', room.city ),
    createData('State', room.state ),
    createData('Country', room.country ),
    createData('Landmark', room.landmark ),
    createData('Pincode', room.pincode ),
    createData('Length', `${room.length} m` ),
    createData('Breadth', `${room.breadth} m` ),
    createData('Height', `${room.height} m` ),
    createData('Furniture', `${room.furniture}` ),
    createData('Additional Facility', `${room.facility}` ),
    createData('Description', `${room.description}` ),
    createData('No. of Balcony in shop', `${room.balcony}` ),
    createData('No. of Washroom in shop', `${room.washroom}` ),
    
    createData('No. of Rooms in shop', `${room.total_rooms}` ),
    createData('No. of Fans in shop', `${room.fans}` ),
   
    createData('Shop floor no. (Note: Ground Floor is referred as 0)', `${room.floor_no} ` ),
    createData('Total Floors of shop', `${room.total_floors}` ),
  ];

  const rows2 = [
    
    
    createData('Shop Policy', room.shop_policy ),
    
  ];

  const rows3 = [
    
    createData(room.nearby_station1, `${room.distance1} km` ),
    createData(room.nearby_station2, `${room.distance2} km` ),
   
    
  ];
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
          <StyledTableRow>
            <StyledTableCell className={classes.font1}>Details</StyledTableCell>
            <StyledTableCell className={classes.font1}></StyledTableCell>
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {rows1.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" className={classes.font}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>

      <TableHead>
          <StyledTableRow>
            <StyledTableCell className={classes.font1}>Facilities</StyledTableCell>
            <StyledTableCell className={classes.font1}></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" className={classes.font}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>

       
      <TableHead>
          <StyledTableRow>
            <StyledTableCell className={classes.font1}>Policies</StyledTableCell>
            <StyledTableCell className={classes.font1}></StyledTableCell>
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {rows2.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" className={classes.font}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>

        <TableHead>
          <StyledTableRow>
            <StyledTableCell className={classes.font1}>Nearby Stations</StyledTableCell>
            <StyledTableCell className={classes.font1}></StyledTableCell>
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {rows3.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" className={classes.font}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
        

      </Table>
    </TableContainer>
  );
}