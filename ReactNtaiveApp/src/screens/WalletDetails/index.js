import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Transactions} from '../../component/Transactions';
import {Balance} from '../../component/Balance';
export function WalletDetails(props) {
  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.heading}>Wallet Balance</Text>
        </View>
        <Balance />
      </View>
      <View style={styles.transactions}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.heading}>Last Transactions</Text>
        </View>
        <Transactions />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  transactions: {
    paddingBottom: 50,
    height: '75%',
  },
  balance: {
    height: '25%',
    width: '100%',
  },
});
