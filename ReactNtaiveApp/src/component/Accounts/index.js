import React from 'react';
import {View, Text} from 'react-native';
import {useRoot} from '../../Context';
export function Accounts(props) {
  const [data, setData] = React.useState(null);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  const {
    state: {accessToken, itemId},
  } = useRoot();

  const getAccounts = React.useCallback(async () => {
    await fetch(`http://${address}:8080/api/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('🚀 getTransactions', data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  React.useEffect(() => {
    getAccounts();
  }, []);
  console.log('WalletDetails from wallteDetals ', data);
  return (
    <View>
      <Text>data</Text>
    </View>
  );
}
