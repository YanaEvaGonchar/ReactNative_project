import React from 'react';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';

const InAppBrowserPage = () => {
  const handleLinkPress = async () => {
    try {
      const url =
        'https://www.npmjs.com/package/react-native-inappbrowser-reborn';
      await InAppBrowser.open(url, {
        toolbarColor: 'silver',
        showTitle: true,
        enableDefaultShare: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
          Open InAppBrowser
        </Text>
      </Button>
    </Block>
  );
};

export default InAppBrowserPage;
