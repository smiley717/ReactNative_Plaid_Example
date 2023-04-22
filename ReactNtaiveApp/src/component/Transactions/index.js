import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useRoot} from '../../Context';
export function Transactions(props) {
  const [transactionData, setTransactionData] = React.useState(null);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  const {
    state: {accessToken, itemId},
  } = useRoot();
  const getTransactions = React.useCallback(async () => {
    await fetch(`http://${address}:8080/api/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        setTransactionData(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  console.log('🚀 ~ file: index.js:26 ~ getTransactions ', transactionData);

  React.useEffect(() => {
    if (transactionData == null) {
      getTransactions();
    }
  }, [transactionData]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '40%',
          }}>
          <Image
            source={require('../../assets/cart.png')}
            style={{
              height: 24,
              width: 24,
              margin: 10,
            }}
          />
          <View>
            <Text style={styles.fontStyle}>Merchant</Text>
            <Text style={styles.text}>{item.merchant_name ?? 'Unknown'}</Text>
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.fontStyle}>Payment Mode</Text>
          <Text style={styles.text}>{item.payment_channel}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '30%',
          }}>
          <Image
            source={require('../../assets/wallet.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>{item.amount}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{marginTop: 10}}>
      <FlatList
        data={transactionData?.latest_transactions}
        renderItem={renderItem}
        keyExtractor={item => item?.account_id}
        maxToRenderPerBatch={5}
        initialNumToRender={10}
        style={{paddingTop: 10}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    height: 100,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },

  fontStyle: {
    color: '#fff',
    fontSize: 12,
  },
});
