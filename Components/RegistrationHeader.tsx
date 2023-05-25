import React, {FC} from 'react';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

const RegistrationHeader: FC = () => {
  return (
    <Block
      height={'250px'}
      justifyContent={'center'}
      alignItems={'center'}
      marginBottom={30}
      bg={'#f1931b'}>
      <Block flexDirection={'row'} alignItems={'baseline'}>
        <Text fontSize={120} color="#fff">
          D
        </Text>
        <Block position={'absolute'} top={'10%'} left={'20%'}>
          <Text fontSize={40} color="#fff">
            ®
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default RegistrationHeader;
