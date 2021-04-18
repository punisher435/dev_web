import React from 'react'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  AreaSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import {
  stackOffsetWiggle,
  stackOrderInsideOut,
  curveCatmullRom,
  area,
} from 'd3-shape';

import { Stack, Animation } from '@devexpress/dx-react-chart';

import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    
  font: {
    fontSize:'40px'
  },
}));
  


function Multicolor_chart({roombookings,shopbookings,apartmentbookings}) {
    const Area = (props) => {
        const path = area()
          .x(({ arg }) => arg)
          .y1(({ val }) => val)
          .y0(({ startVal }) => startVal)
          .curve(curveCatmullRom);
      
        return <AreaSeries.Path {...props} path={path} />;
      };
    const titleStyle = { marginRight: '120px' };
const TitleText = props => <Title.Text {...props} style={titleStyle} />;

var year = new Date().getFullYear()
var a = 0;
var b =0;
var c = 0;
var d =0;
var e =0;
var f =0;

var sa = 0;
var sb =0;
var sc = 0;
var sd =0;
var se =0;
var sf =0;

var aa = 0;
var ab =0;
var ac = 0;
var ad =0;
var ae =0;
var af =0;


roombookings.map(booking => {
   
    if( parseInt(booking.created_at.slice(0,4))===year )
    { a = a+booking.seller_pay;}
    else if( parseInt(booking.created_at.slice(0,4))===(year-1) )
    { b = b+booking.seller_pay;}

    else if( parseInt(booking.created_at.slice(0,4))===(year-2) )
    { c = c+booking.seller_pay;}

    else if( parseInt(booking.created_at.slice(0,4))===(year-3) )
    { d = d+booking.seller_pay;}
    else if( parseInt(booking.created_at.slice(0,4))===(year-4) )
    { e = e+booking.seller_pay;}
    else if( parseInt(booking.created_at.slice(0,4))===(year-5) )
    { f = f+booking.seller_pay;}
    
    
    
})
shopbookings.map(booking1 => {
 
  if( parseInt(booking1.created_at.slice(0,4))===year )
  { sa = sa+booking1.seller_pay;}
  else if( parseInt(booking1.created_at.slice(0,4))===(year-1) )
  { sb = sb+booking1.seller_pay;}

  else if( parseInt(booking1.created_at.slice(0,4))===(year-2) )
  { sc = sc+booking1.seller_pay;}

  else if( parseInt(booking1.created_at.slice(0,4))===(year-3) )
  { sd = sd+booking1.seller_pay;}
  else if( parseInt(booking1.created_at.slice(0,4))===(year-4) )
  { se = se+booking1.seller_pay;}
  else if( parseInt(booking1.created_at.slice(0,4))===(year-5) )
  { sf = sf+booking1.seller_pay;}
  
  
  
})

apartmentbookings.map(booking2 => {
 
  if( parseInt(booking2.created_at.slice(0,4))===year )
  { aa = aa+booking2.seller_pay;}
  else if( parseInt(booking2.created_at.slice(0,4))===(year-1) )
  { ab = ab+booking2.seller_pay;}

  else if( parseInt(booking2.created_at.slice(0,4))===(year-2) )
  { ac = ac+booking2.seller_pay;}

  else if( parseInt(booking2.created_at.slice(0,4))===(year-3) )
  { ad = ad+booking2.seller_pay;}
  else if( parseInt(booking2.created_at.slice(0,4))===(year-4) )
  { ae = ae+booking2.seller_pay;}
  else if( parseInt(booking2.created_at.slice(0,4))===(year-5) )
  { af = af+booking2.seller_pay;}
  
  
  
})


 const data = [{
    year: year, roombookings: a, shopbookings: sa, apartmentbookings:aa,
  },
  {
    year: year-1, roombookings: b, shopbookings: sb, apartmentbookings:ab,
  },
  {
    year: year-2, roombookings: c, shopbookings: sc, apartmentbookings:ac,
  },
  {
    year: year-3, roombookings: d, shopbookings: sd, apartmentbookings:ad,
  },
  {
    year: year-4, roombookings: e, shopbookings: se, apartmentbookings:ae,
  },
  {
    year: year-5, roombookings: f, shopbookings: sf, apartmentbookings:af,
  },

  ];

  const classes = useStyles();


    return (
        <div>
             <Paper>
        <Chart
          data={data}
          style={{ paddingLeft: '20px' , fontSize:'70px'}}
          className={classes.font}
        >
          <ArgumentAxis tickFormat={() => tick => tick} className={classes.font}/>

          <AreaSeries
            name="Room bookings"
            valueField="roombookings"
            argumentField="year"
            seriesComponent={Area}
            className={classes.font}
          />
          <AreaSeries
            name="Shop bookings"
            valueField="shopbookings"
            argumentField="year"
            seriesComponent={Area}
            className={classes.font}
          />
          <AreaSeries
            name="Apartment bookings"
            valueField="apartmentbookings"
            argumentField="year"
            seriesComponent={Area}
            className={classes.font}
          />
          
          <Animation />
          <Legend position="bottom"/>
          <Title
            text="Bookings earnings in types"
            textComponent={TitleText}
          />
          <Stack
            stacks={[
              { series: ['Room bookings', 'Shop bookings', 'Apartment bookings'] },
            ]}
            offset={stackOffsetWiggle}
            order={stackOrderInsideOut}
          />
        </Chart>
      </Paper>
        </div>
    )
}

export default Multicolor_chart
