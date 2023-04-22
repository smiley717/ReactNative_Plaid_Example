import React from 'react';
import {View, Text} from 'react-native';
import {useRoot} from '../../Context';
export function Items(props) {
  const [data, setData] = React.useState(null);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  const {
    state: {accessToken, itemId},
  } = useRoot();
  const getItems = React.useCallback(async () => {
    await fetch(`http://${address}:8080/api/item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('🚀 getItems', data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  React.useEffect(() => {
    getItems();
  }, []);
  return (
    <View>
      <Text>todo..</Text>
    </View>
  );
}
