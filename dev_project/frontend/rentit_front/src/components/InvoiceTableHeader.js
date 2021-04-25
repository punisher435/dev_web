import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = `${process.env.REACT_APP_INVOICE_COLOR}`
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: `${process.env.REACT_APP_INVOICE_COLOR}`,
        backgroundColor: `${process.env.REACT_APP_INVOICE_COLOR}`,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '40%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Item Description</Text>
        <Text style={styles.qty}>Selected</Text>
        
    </View>
  );
  
  export default InvoiceTableHeader