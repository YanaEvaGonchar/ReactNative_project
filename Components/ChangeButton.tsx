import React, {FC, useState} from 'react';
import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

type Props = {
  onButtonChange: (value: string) => void;
};

const ChangeButton: FC<Props> = ({onButtonChange}) => {
  const [activeButton, setActiveButton] = useState('Cartons');

  const handlePress = (buttonName: string) => {
    setActiveButton(buttonName);
    onButtonChange(buttonName);
  };

  return (
    <Block
      bg={'#e0e0e0'}
      paddingVertical={'2px'}
      paddingHorizontal={'5px'}
      height={'35px'}
      flexDirection={'row'}
      justifyContent={'space-between'}>
      <Button
        onPress={() => handlePress('Cartons')}
        width={'50%'}
        height={'100%'}
        bg={activeButton === 'Cartons' ? '#fff' : 'transparent'}
        borderRadius={'5px'}
        justifyContent={'center'}
        alignItems={'center'}
        shadowColor={'#000'}
        elevation={1}>
        <Text color={'#000'} fontSize={12} fontWeight={'bold'}>
          Cartons
        </Text>
      </Button>

      <Button
        onPress={() => handlePress('Articles')}
        width={'50%'}
        height={'100%'}
        bg={activeButton === 'Articles' ? '#fff' : 'transparent'}
        borderRadius={'5px'}
        justifyContent={'center'}
        alignItems={'center'}
        shadowColor={'#000'}
        elevation={1}>
        <Text color={'#000'} fontSize={12} fontWeight={'bold'}>
          Articles
        </Text>
      </Button>
    </Block>
  );
};

export default ChangeButton;
