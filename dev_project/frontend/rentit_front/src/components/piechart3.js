
import React from 'react'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import { Legend } from '@devexpress/dx-react-chart-material-ui';





function PieChart3({roombookings,shopbookings,apartmentbookings}) {

    var a = 0;
    var b =0;
    var c =0;
    var d =0;
    var e =0;
    var f =0 ;

    roombookings.map(booking => {
        if(booking.extended===true){a=a+1;}
        else{b=b+1;}
    })
    shopbookings.map(booking => {
        if(booking.extended===true){c=c+1;}
        else{d=d+1;}
    })
    apartmentbookings.map(booking => {
        if(booking.extended===true){e=e+1;}
        else{f=f+1;}
    })

    const data = [
        { type: 'Room bookings', bookings: b },
        { type: ' Extended room bookings', bookings: a },
        { type: 'Shop bookings', bookings: d },
        { type: ' Extended shop bookings', bookings: c },
        { type: 'Apartment bookings', bookings: f },
        { type: ' Extended apartment bookings', bookings: e },
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
        marginLeft: '-2px',
        marginRight: '-2px',
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
            innerRadius={0.6}
          />
          <Title
            text="Extension Analysis"
          />
          <Animation />
          <Legend
            position="left"
            
            labelComponent={LegendLabel}
          />
        </Chart>
      </Paper>
            
        </div>
    )
}

export default PieChart3
