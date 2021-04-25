import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = `${process.env.REACT_APP_INVOICE_COLOR}`
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: `${process.env.REACT_APP_INVOICE_COLOR}`,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableFooter = ({pay}) => {
    
    return(    
        <View style={styles.row}>
            <Text style={styles.description}>TOTAL</Text>
            <Text style={styles.total}>{pay}</Text>
        </View>
    )
};
  
  export default InvoiceTableFooter