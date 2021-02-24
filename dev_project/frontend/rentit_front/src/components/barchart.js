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
        if(booking.cancelled===false){
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
        else if( parseInt(booking.created_at.slice(0,4))===(year-6) )
        { g = g+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-7) )
        { h = h+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-8) )
        { i = i+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-9) )
        { j = j+booking.seller_pay;}
        }
        
    })
    shopbookings.map(booking => {
        if(booking.cancelled===false){
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
        else if( parseInt(booking.created_at.slice(0,4))===(year-6) )
        { g = g+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-7) )
        { h = h+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-8) )
        { i = i+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-9) )
        { j = j+booking.seller_pay;}
        }
        
    })

    apartmentbookings.map(booking => {
        if(booking.cancelled===false){
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
        else if( parseInt(booking.created_at.slice(0,4))===(year-6) )
        { g = g+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-7) )
        { h = h+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-8) )
        { i = i+booking.seller_pay;}
        else if( parseInt(booking.created_at.slice(0,4))===(year-9) )
        { j = j+booking.seller_pay;}
        }
        
    })

    const data1 = [
        { year: year, earnings: a },
        { year: year-1, earnings: b },
        { year: year-2, earnings: c },
        { year: year-3, earnings: d },
        { year: year-4, earnings: e },
        { year: year-5, earnings: f },
        { year: year-6, earnings: g },
        { year: year-7, earnings: h },
        { year: year-8, earnings: i },
        { year: year-9, earnings: j },
      ];
      console.log(a,b,c,d,e,f,g,h,i,j)

    return (
        <div>
            <Paper>
        <Chart
          data={data1}
          width={1000}
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
        </div>
    );
}

export default BarChart

