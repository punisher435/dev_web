import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

import Hidden from '@material-ui/core/Hidden';
import  {useMediaQuery} from '@material-ui/core';





function BarChart({roombookings,shopbookings,apartmentbookings}) {

    var year = new Date().getFullYear()
    var a = 0;
    var b =0;
    var c = 0;
    var d =0;
    var e =0;
    var f =0;
    var g =0;
    var h =0;
    var i =0;
    var j = 0;

    roombookings.map(booking => {
        if(booking.cancelled==false){
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
        
        }
        
    })
    shopbookings.map(booking1 => {
      if(booking1.cancelled==false){
      if( parseInt(booking1.created_at.slice(0,4))===year )
      { a = a+booking1.seller_pay;}
      else if( parseInt(booking1.created_at.slice(0,4))===(year-1) )
      { b = b+booking1.seller_pay;}
    
      else if( parseInt(booking1.created_at.slice(0,4))===(year-2) )
      { c = c+booking1.seller_pay;}
    
      else if( parseInt(booking1.created_at.slice(0,4))===(year-3) )
      { d = d+booking1.seller_pay;}
      else if( parseInt(booking1.created_at.slice(0,4))===(year-4) )
      { e = e+booking1.seller_pay;}
      else if( parseInt(booking1.created_at.slice(0,4))===(year-5) )
      { f = f+booking1.seller_pay;}
      
      }
      
    })

    apartmentbookings.map(booking2 => {
      if(booking2.cancelled==false){
      if( parseInt(booking2.created_at.slice(0,4))===year )
      { a = a+booking2.seller_pay;}
      else if( parseInt(booking2.created_at.slice(0,4))===(year-1) )
      { b = b+booking2.seller_pay;}
    
      else if( parseInt(booking2.created_at.slice(0,4))===(year-2) )
      { c = c+booking2.seller_pay;}
    
      else if( parseInt(booking2.created_at.slice(0,4))===(year-3) )
      { d = d+booking2.seller_pay;}
      else if( parseInt(booking2.created_at.slice(0,4))===(year-4) )
      { e = e+booking2.seller_pay;}
      else if( parseInt(booking2.created_at.slice(0,4))===(year-5) )
      { f = f+booking2.seller_pay;}
      
      }
      
    })

    const isSmall = useMediaQuery("(max-width: 375px)");

    const data1 = [
        { year:`${year}` , earnings: parseFloat(a) },
        { year: `${year-1}`, earnings: parseFloat(b) },
        { year: `${year-2}`, earnings: c },
        { year:`${year-3}`, earnings: d },
        { year:`${year-4}`, earnings: e },
        // { year:`${year-5}`, earnings: f },
       
        
      ];
      console.log(a,b,c,d,e,f,g,h,i,j)

    return (
        <div>
          <Hidden smDown>
            <Paper>
        <Chart
          data={data1}
          width={430}
          height={430}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="earnings"
            argumentField="year"
          />
          <Title text="Earnings" />
          <Animation />
        </Chart>
      </Paper>
      </Hidden>

      <Hidden mdUp>
            <Paper>

        {isSmall && <Chart
          data={data1}
          width={340}
          height={350}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="earnings"
            argumentField="year"
          />
          <Title text="Earnings" />
          <Animation />
          </Chart>
          }

        {
          !isSmall && <Chart
          data={data1}
          width={330}
          height={350}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="earnings"
            argumentField="year"
          />
          <Title text="Earnings" />
          <Animation />
        </Chart>
      } 
      </Paper>
      </Hidden>
        </div>
    );
}

export default BarChart

