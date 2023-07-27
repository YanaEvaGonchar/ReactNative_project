import React from 'react';

import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';

import Reload from '../icons/reload.svg';

const CoPilotButton = () => {
  return (
    <Button onPress={() => {}}>
      <Block
        flexDirection={'row'}
        gap={8}
        justifyContent={'center'}
        alignItems={'center'}
        width={'210px'}
        height={'36px'}
        bg={'#af514c'}
        borderRadius={'30px'}
        borderColor={'black'}
        borderWidth={'1px'}>
        <Text fontSize={16} textAlign={'center'} color={'white'}>
          Recently Completed
        </Text>
        <Reload width={20} height={20} />
      </Block>
    </Button>
  );
};

export default CoPilotButton;
