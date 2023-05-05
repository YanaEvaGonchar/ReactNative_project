/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text} from 'react-native';
import {Block} from '../styled/Block';
import ItemCard from './ItemCard';

import items from '../items/items';

const Article = () => {
  return (
    <Block borderBottomColor={'grey'} borderBottomWidth={'0.5px'}>
      <Block
        flexDirection={'row'}
        justifyContent={'space-between'}
        paddingHorizontal={'20px'}
        paddingVertical={'10px'}
        borderBottomColor={'grey'}
        borderBottomWidth={'0.5px'}>
        <Text style={{color: 'grey'}}>ARTICLE</Text>
        <Text style={{color: 'grey'}}>ACT</Text>
      </Block>

      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Block>
  );
};

export default Article;
