
import React from 'react'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import { Legend } from '@devexpress/dx-react-chart-material-ui';





function PieChart({roombookings,shopbookings,apartmentbookings}) {

    var a = roombookings.length;
    var b = shopbookings.length;
    var c = apartmentbookings.length;

    const data = [
        { type: 'Room', bookings: a },
        { type: 'Shop', bookings: b },
        { type: 'Apartment', bookings: c }
        
      ];

      const legendRootStyle = {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
      };
      const LegendRoot = props => (
        <Legend.Root {...props} style={legendRootStyle} />
      );
      
      const legendItemStyle = {
        flexDirection: 'column',
        marginLeft: '-8px',
        marginRight: '-8px',
      };
      const LegendItem = props => (
        <Legend.Item {...props} style={legendItemStyle} />
      );
      
      const legendLabelStyle = {
        whiteSpace: 'nowrap',
      };
      const LegendLabel = props => (
        <Legend.Label {...props} style={legendLabelStyle} />
      );
    
    
    return (
        <div>
            <Paper>
        <Chart
          data={data}
        >
          <PieSeries
            valueField="bookings"
            argumentField="type"
          />
          <Title
            text="Bookings type:"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
        </Chart>
      </Paper>
            
        </div>
    )
}

export default PieChart
