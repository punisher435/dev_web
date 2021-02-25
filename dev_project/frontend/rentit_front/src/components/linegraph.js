
import React from 'react'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

const format = () => tick => tick;
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}`}
    />
  );
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));



function LineGraph({roombookings,shopbookings,apartmentbookings}) {

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
    { a = a+1;}
    else if( parseInt(booking.created_at.slice(0,4))===(year-1) )
    { b = b+1;}
  
    else if( parseInt(booking.created_at.slice(0,4))===(year-2) )
    { c = c+1;}
  
    else if( parseInt(booking.created_at.slice(0,4))===(year-3) )
    { d = d+1;}
    else if( parseInt(booking.created_at.slice(0,4))===(year-4) )
    { e = e+1;}
    else if( parseInt(booking.created_at.slice(0,4))===(year-5) )
    { f = f+1;}
    
    
    
  })
  shopbookings.map(booking1 => {
  
  if( parseInt(booking1.created_at.slice(0,4))===year )
  { sa = sa+1;}
  else if( parseInt(booking1.created_at.slice(0,4))===(year-1) )
  { sb = sb+1;}
  
  else if( parseInt(booking1.created_at.slice(0,4))===(year-2) )
  { sc = sc+1;}
  
  else if( parseInt(booking1.created_at.slice(0,4))===(year-3) )
  { sd = sd+1;}
  else if( parseInt(booking1.created_at.slice(0,4))===(year-4) )
  { se = se+1;}
  else if( parseInt(booking1.created_at.slice(0,4))===(year-5) )
  { sf = sf+1;}
  
  
  
  })
  
  apartmentbookings.map(booking2 => {
  
  if( parseInt(booking2.created_at.slice(0,4))===year )
  { aa = aa+1;}
  else if( parseInt(booking2.created_at.slice(0,4))===(year-1) )
  { ab = ab+1;}
  
  else if( parseInt(booking2.created_at.slice(0,4))===(year-2) )
  { ac = ac+1;}
  
  else if( parseInt(booking2.created_at.slice(0,4))===(year-3) )
  { ad = ad+1;}
  else if( parseInt(booking2.created_at.slice(0,4))===(year-4) )
  { ae = ae+1;}
  else if( parseInt(booking2.created_at.slice(0,4))===(year-5) )
  { af = af+1;}
  
  
  
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
  const classes = demoStyles();
    return (
        <div>
            <Paper>
        <Chart
          data={data}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            max={50}
            labelComponent={ValueLabel}
          />

          <LineSeries
            name="Room bookings"
            valueField="roombookings"
            argumentField="year"
          />
          <LineSeries
            name="Shop bookings"
            valueField="shopbookings"
            argumentField="year"
          />
          <LineSeries
            name="Apartment bookings"
            valueField="apartmentbookings"
            argumentField="year"
          />
          <Legend position="bottom" />
          <Title
            text={`No. of bookings per year:`}
            textComponent={TitleText}
          />
          <Animation />
        </Chart>
      </Paper>
        </div>
    )
}

export default LineGraph
