import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Summary from './pages/Summary';
import Registration from './pages/Registration';
import Sign from './pages/Sign';
import Scanner from './pages/Scanner';
import Chart from './pages/Chart';
import BarcodeScanning from './pages/BarcodeScanning';
import FaceID from './pages/FaceID';
import Splash from './pages/Splash';
import BubbleLevel from './pages/BubbleLevel';
import MediaPlayer from './pages/MediaPlayer';
import VideoPlayer from './pages/VideoPlayer';

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const [splash, setSplash] = useState(true);

  const onAnimationFinish = () => {
    setSplash(false);
  };

  return (
    <>
      {splash ? (
        <Splash onAnimationFinish={onAnimationFinish} />
      ) : (
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Registration" component={Registration} />
            <Drawer.Screen name="Summary" component={Summary} />
            <Drawer.Screen name="Signature" component={Sign} />
            <Drawer.Screen name="Scanner" component={Scanner} />
            <Drawer.Screen name="World population сhart" component={Chart} />
            <Drawer.Screen name="Barcode Scaner" component={BarcodeScanning} />
            <Drawer.Screen name="Face ID" component={FaceID} />
            <Drawer.Screen name="Bubble Level" component={BubbleLevel} />
            <Drawer.Screen name="Media Player" component={MediaPlayer} />
            <Drawer.Screen name="Video Player" component={VideoPlayer} />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
