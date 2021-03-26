import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
       
    },
    billTo: {
        
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Booked by:</Text>
        <Text>{invoice.company}</Text>
        <Text>{invoice.phone}</Text>
        <Text>{invoice.phone2}</Text>
        <Text>Capacity : {invoice.capacity}</Text>
        <Text>Duration :{invoice.duration} Months</Text>
        <Text>Cancelled : {invoice.cancelled}</Text>
        <Text>Extended : {invoice.extended}</Text>
        <Text>Coupon : {invoice.coupon}</Text>
        {
            invoice.refunded==='Yes' ? <Text>Refunded : Yes</Text> : null
        }
    </View>
  );
  
  export default BillTo