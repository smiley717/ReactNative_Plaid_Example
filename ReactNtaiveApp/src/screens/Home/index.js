import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
import {useRoot} from '../../Context';
function HomeScreen({navigation}) {
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
  const [linkToken, setLinkToken] = React.useState(null);
  const {dispatch, state} = useRoot();

  console.log(linkToken);

  const createLinkToken = React.useCallback(async () => {
    await fetch(`http://${address}:8080/api/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setLinkToken(data.link_token);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setLinkToken]);

  React.useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken]);
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>React Native Plaid</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PlaidLink
          tokenConfig={{
            token: linkToken,
            noLoadingState: false,
          }}
          onSuccess={async success => {
            await fetch(`http://${address}:8080/api/set_access_token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({public_token: success.publicToken}),
            })
              .then(response => response.json())
              .then(data => {
                dispatch({
                  type: 'SET_STATE',
                  accessToken: data.access_token,
                  itemId: data.item_id,
                });
              })
              .catch(err => {
                console.log(err);
              });
            navigation.navigate('WalletDetails');
          }}
          onExit={response => {
            console.log(response);
          }}>
          <View style={styles.button}>
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 20}}>
              Launch Wallet
            </Text>
            <Image source={require('../../assets/next.png')} />
          </View>
        </PlaidLink>
      </View>
    </View>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textView: {
    width: '100%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: '600',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#42b883',
    borderRadius: 10,
  },
});
