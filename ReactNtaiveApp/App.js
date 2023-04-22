import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import {RootProvider} from './src/Context';

const screenBackgroundColor = {
  colors: {
    background: '#161622',
  },
};
function App() {
  return (
    <SafeAreaProvider>
      <RootProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <NavigationContainer theme={screenBackgroundColor}>
          <RootNavigation />
        </NavigationContainer>
      </RootProvider>
    </SafeAreaProvider>
  );
}

export default App;
