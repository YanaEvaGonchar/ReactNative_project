/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text} from 'react-native';
import {Block} from '../styled/Block';

import Box from '../icons/box.svg';
import Tag from '../icons/tag.svg';

const IdTag = () => {
  return (
    <Block
      bg={'#c0c0c0'}
      paddingVertical={'5px'}
      paddingHorizontal={'15px'}
      flexDirection={'row'}
      justifyContent={'space-between'}>
      <Block
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={10}>
        <Box width={20} height={20} />
        <Text>ID number</Text>
      </Block>

      <Block
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={7}>
        <Tag width={20} height={20} />
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{fontSize: 10}}>9</Text>
      </Block>
    </Block>
  );
};

export default IdTag;
