/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Summary from './pages/Summary';
import Registration from './pages/Registration';
import Sign from './pages/Sign';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/*<SafeAreaView style={backgroundStyle}>*/}
      {/*  <Summary />*/}
      {/*</SafeAreaView>*/}
      {/*<Registration />*/}
      <Sign />
    </NavigationContainer>
  );
}

export default App;
