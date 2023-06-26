/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Summary from './pages/Summary';
import Registration from './pages/Registration';
import Sign from './pages/Sign';
import WebViewPage from './pages/WebViewPage';
import InAppBrowserPage from './pages/InAppBrowserPage';

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Registration" component={Registration} />
        <Drawer.Screen name="Summary" component={Summary} />
        <Drawer.Screen name="Signature" component={Sign} />
        <Drawer.Screen name="WebView" component={WebViewPage} />
        <Drawer.Screen name="InAppBrowser" component={InAppBrowserPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
