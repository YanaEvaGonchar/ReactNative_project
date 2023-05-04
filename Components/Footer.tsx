/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC} from 'react';
import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

type Props = {
  title: string;
};

const Footer: FC<Props> = ({title}) => {
  const handlePress = () => {
    console.log('Button was pressed');
  };

  return (
    <Block
      flexDirection={'row'}
      alignItems={'center'}
      alignSelf={'center'}
      width={'100%'}
      justifyContent={'center'}
      paddingVertical={'10px'}
      borderBottomColor={'grey'}
      borderBottomWidth={'0.5px'}
      borderTopColor={'grey'}
      borderTopWidth={'0.5px'}>
      <Button
        onPress={handlePress}
        width={'340px'}
        height={'70px'}
        borderColor={'blue'}
        borderWidth={'1px'}
        borderRadius={'5px'}
        justifyContent={'center'}
        paddingHorizontal={'50px'}
        alignItems={'center'}>
        <Text color={'blue'} fontSize={18} textAlign={'center'}>
          {title}
        </Text>
      </Button>
    </Block>
  );
};

export default Footer;
