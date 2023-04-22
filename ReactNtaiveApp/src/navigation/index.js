import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import {WalletDetails} from '../screens/WalletDetails';
const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#42b883',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="WalletDetails"
        component={WalletDetails}
        options={{
          headerStyle: {
            backgroundColor: '#161622',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
