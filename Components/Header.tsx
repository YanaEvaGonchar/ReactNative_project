/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Block} from '../styled/Block';
import {Text} from 'react-native';

import Bluetooth from '../icons/bluetooth.svg';
import Wifi from '../icons/wifi.svg';
import Cloud from '../icons/cloud.svg';

const Header = () => {
  return (
    <Block
      borderBottomColor={'grey'}
      borderBottomWidth={'0.5px'}
      paddingVertical={'10px'}>
      <Block
        flexDirection={'row'}
        justifyContent={'space-between'}
        paddingVertical={'10px'}
        paddingHorizontal={'10px'}>
        <Block flexDirection={'row'} alignItems={'center'} width={'25%'}>
          <Bluetooth width={50} height={50} />
          <Text>100%</Text>
        </Block>

        <Block alignItems={'center'} justifyContent={'center'} width={'35%'}>
          <Wifi width={50} height={50} />
        </Block>

        <Block alignItems={'center'} justifyContent={'center'} width={'25%'}>
          <Cloud width={50} height={50} />
        </Block>
      </Block>

      <Block flexDirection={'row'} justifyContent={'space-around'}>
        <Text style={{color: 'blue', fontSize: 14}}>Cancel</Text>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Articles In Carton
        </Text>
        <Text style={{color: 'blue', fontSize: 14}}>Confirm</Text>
      </Block>
    </Block>
  );
};

export default Header;
