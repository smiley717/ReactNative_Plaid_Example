import React from 'react';
import {View, Text} from 'react-native';
import {useRoot} from '../../Context';
export function Assets(props) {
  const [data, setData] = React.useState(null);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  const {
    state: {accessToken, itemId},
  } = useRoot();

  const getAssets = React.useCallback(async () => {
    await fetch(`http://${address}:8080/api/assets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('🚀 getAssets', data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  React.useEffect(() => {
    getAssets();
  }, []);
  return (
    <View>
      <Text>todo...</Text>
    </View>
  );
}
