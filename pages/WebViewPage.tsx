import React from 'react';
import {WebView} from 'react-native-webview';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

const WebViewPage = () => {
  const [showWebView, setShowWebView] = React.useState(false);

  const handleLinkPress = () => {
    setShowWebView(true);
  };

  const handleWebViewClose = () => {
    setShowWebView(false);
  };

  if (showWebView) {
    return (
      <Block flex={1}>
        <Button
          paddingVertical={'10px'}
          paddingHorizontal={'20px'}
          onPress={handleWebViewClose}
          bg={'silver'}>
          <Text textAlign={'center'}>Close</Text>
        </Button>
        <Block flex={2}>
          <WebView
            source={{uri: 'https://www.npmjs.com/package/react-native-webview'}}
          />
        </Block>
      </Block>
    );
  }

  return (
    <Block flex={1}>
      <Button
        paddingVertical={'10px'}
        paddingHorizontal={'20px'}
        width={'100%'}
        onPress={handleLinkPress}
        bg={'silver'}>
        <Text
          textAlign={'center'}
          color={'blue'}
          textDecorationLine={'underline'}>
          Open WebView
        </Text>
      </Button>
    </Block>
  );
};

export default WebViewPage;
