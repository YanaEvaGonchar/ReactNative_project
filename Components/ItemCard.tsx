import React from 'react';

import {Text} from 'react-native';
import {Block} from '../styled/Block';
import {Image} from '../styled/Image';
import {Button} from '../styled/Button';
import RightArrow from '../icons/right-arrow.svg';

import longsleeve from '../photos/longsleeve.png';

type Item = {
  id: number;
  code: string;
  color: string;
  size: string;
  description: string;
  quantity: number;
  image: string;
};

type Props = {
  item: Item;
};

const ItemCard = ({item}: Props) => {
  const handlePress = () => {
    console.log('Button was pressed');
  };

  return (
    <Block
      borderBottomColor={'grey'}
      borderBottomWidth={'0.5px'}
      paddingVertical={'10px'}
      paddingHorizontal={'10px'}>
      <Block
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Block flexDirection={'row'} alignItems={'center'} gap={10}>
          <Image
            resizeMode={'contain'}
            width="80px"
            height="80px"
            onError={() => console.log('error')}
            onLoad={() => console.log('loaded')}
            source={longsleeve}
          />
          <Block>
            <Text style={{marginBottom: 5, fontSize: 12}}>{item.code}</Text>
            <Block
              flexDirection={'row'}
              justifyContent={'flex-start'}
              marginBottom={5}>
              <Text style={{marginRight: 20, fontSize: 12}}>{item.color}</Text>
              <Text style={{fontSize: 12}}>{item.size}</Text>
            </Block>
            <Text style={{color: 'grey', fontSize: 12}}>
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
              width={'80px'}
              height={'15px'}
              bg={'green'}
              borderRadius={'10px'}
              justifyContent={'center'}
              alignItems={'center'}
              onPress={handlePress}>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
                {item.quantity}
              </Text>
            </Button>
          </Block>
          <RightArrow width={10} height={10} />
        </Block>
      </Block>
    </Block>
  );
};

export default ItemCard;
