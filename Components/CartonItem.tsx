import React from 'react';
import {TouchableOpacity, Animated} from 'react-native';

import {Text} from 'react-native';
import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import RightArrow from '../icons/right-arrow.svg';

import Carton from '../types/Carton';

type Props = {
  carton: Carton;
  handlePress: (itemId: number | null) => void;
  slideAnimation: Animated.Value;
  showDeleteButton: boolean;
};

const CartonItem: React.FC<Props> = ({
  carton,
  handlePress,
  slideAnimation,
  showDeleteButton,
}) => {
  return (
    <Block
      borderBottomColor={'grey'}
      borderBottomWidth={'0.5px'}
      >
      <Block
        paddingVertical={'25px'}
        paddingHorizontal={'20px'}
        borderBottomColor={'grey'}
        borderBottomWidth={'0.5px'}>
        <Block
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Block flexDirection={'row'} alignItems={'center'}>
            <Block>
              <Text marginBottom={5} fontSize={10} fontWeight={'bold'}>
                {carton.code}
              </Text>
            </Block>
          </Block>

          <Animated.View
            style={{
              transform: [
                {translateX: slideAnimation},
                {scaleX: showDeleteButton ? 0.9 : 1},
              ],
            }}>
            <Block
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-around'}>
              <Block marginRight={10}>
                <Button
                  onPress={handlePress}
                  width={'80px'}
                  height={'15px'}
                  bg={'grey'}
                  borderRadius={'10px'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Text color={'#fff'} fontSize={12}>
                    {carton.quantity}
                  </Text>
                </Button>
              </Block>

              <TouchableOpacity onPress={handlePress}>
                <RightArrow width={10} height={10} />
              </TouchableOpacity>
            </Block>
          </Animated.View>
        </Block>
      </Block>

      {showDeleteButton && (
        <Block
          bg={'red'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
          width={'70px'}
          position={'absolute'}
          top={'0'}
          right={'0'}>
          <Button onPress={() => ''}>
            <Text color={'#fff'}>Delete</Text>
          </Button>
        </Block>
      )}
    </Block>
  );
};

export default CartonItem;
