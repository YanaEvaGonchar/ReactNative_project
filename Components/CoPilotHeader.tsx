import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

import Home from '../icons/home.svg';
import Settings from '../icons/settings.svg';

const CoPilotHeader = ({navigation, title}) => {
  return (
    <Block
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      height={'100px'}
      bg={'#182545'}
      paddingVertical={'15px'}
      paddingHorizontal={'18px'}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Home width={36} height={36} />
      </TouchableOpacity>
      <Text color={'white'} fontSize={20}>
        {title}
      </Text>
      <Settings width={36} height={36} />
    </Block>
  );
};

export default CoPilotHeader;
