import React, {FC} from 'react';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Image} from '../styled/Image';

import Enter from '../icons/enter.svg';

import Task from '../types/Task';

const CoPilotTask: FC<Task> = ({photo, Icon, title, text}) => {
  return (
    <Block
      flexDirection={'row'}
      height={'61px'}
      borderRadius={'16px'}
      borderWidth={'1px'}
      borderColor={'black'}
      marginBottom={5}
      paddingVertical={'5px'}
      paddingHorizontal={'4px'}>
      <Block
        alignSelf={'center'}
        marginRight={8}
        width={'52px'}
        height={'52px'}>
        <Image
          resizeMode={'contain'}
          onError={() => console.log('error')}
          onLoad={() => console.log('loaded')}
          source={photo}
        />
      </Block>
      <Block flexDirection={'column'} justifyContent={'space-between'}>
        <Block flexDirection={'row'} gap={5} alignItems={'center'}>
          <Icon height={20} />
          <Text fontSize={16}>{title}</Text>
        </Block>
        <Text fontSize={14}>{text}</Text>
      </Block>
      <Block position={'absolute'} right={'0px'} bottom={'0px'}>
        <Enter />
      </Block>
    </Block>
  );
};

export default CoPilotTask;
