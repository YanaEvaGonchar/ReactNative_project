import React from 'react';
import {TouchableOpacity, Animated} from 'react-native';

import {Text} from '../styled/Text';
import {Block} from '../styled/Block';
import {Image} from '../styled/Image';
import {Button} from '../styled/Button';
import RightArrow from '../icons/right-arrow.svg';

import longsleeve from '../photos/longsleeve.png';

import Item from '../types/Item';

type Props = {
  item: Item;
  handlePress: (itemId: number | null) => void;
  handleDelete: () => void;
  slideAnimation: Animated.Value;
  imageOpacity: Animated.Value;
  showDeleteButton: number | null;
};

const ItemCard: React.FC<Props> = ({
  item,
  handlePress,
  handleDelete,
  slideAnimation,
  imageOpacity,
  showDeleteButton,
}) => {
  return (
    <Block borderBottomColor={'grey'} borderBottomWidth={'0.5px'}>
      <Animated.View
        style={{
          transform: [{translateX: slideAnimation}, {scaleX: 0.9}],
        }}>
        <Block
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingVertical={'12px'}>
          <Block flexDirection={'row'} alignItems={'center'}>
            <Animated.View style={{opacity: imageOpacity}}>
              <Image
                resizeMode={'contain'}
                width="80px"
                height="80px"
                onError={() => console.log('error')}
                onLoad={() => console.log('loaded')}
                source={longsleeve}
              />
            </Animated.View>

            <Block>
              <Text marginBottom={5} fontSize={10}>
                {item.code}
              </Text>
              <Block
                flexDirection={'row'}
                justifyContent={'flex-start'}
                marginBottom={5}>
                <Text marginRight={30} fontSize={10}>
                  {item.color}
                </Text>
                <Text fontSize={10}>{item.size}</Text>
              </Block>
              <Text color={'grey'} fontSize={10}>
                {item.description}
              </Text>
            </Block>
          </Block>

          <Block
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-around'}>
            <Block marginRight={10}>
              <Button
                onPress={() => 'clicked'}
                width={'80px'}
                height={'15px'}
                bg={'green'}
                borderRadius={'10px'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text color={'white'} fontSize={12}>
                  {item.quantity}
                </Text>
              </Button>
            </Block>

            <TouchableOpacity onPress={() => handlePress(item.id)}>
              <RightArrow width={10} height={10} />
            </TouchableOpacity>
          </Block>
        </Block>
      </Animated.View>

      {showDeleteButton === item.id && (
        <Block
          bg={'#f1411b'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
          width={'70px'}
          position={'absolute'}
          top={'0'}
          right={'0'}>
          <Button onPress={handleDelete}>
            <Text fontSize={16} color={'white'}>
              Delete
            </Text>
          </Button>
        </Block>
      )}
    </Block>
  );
};

export default ItemCard;
