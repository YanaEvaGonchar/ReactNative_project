/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC, useState} from 'react';
import {Animated} from 'react-native';
import {Block} from '../styled/Block';
import ItemCard from './ItemCard';

import items from '../items/items';

const Article: FC = () => {
  const [slideAnimations] = useState(() =>
    items.map(() => new Animated.Value(0)),
  );
  const [showDeleteButton, setShowDeleteButton] = useState<number | null>(null);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [imageOpacities] = useState(() =>
    items.map(() => new Animated.Value(1)),
  );

  const handlePress = (itemId: number | null) => {
    const index = items.findIndex(item => item.id === itemId);

    if (showDeleteButton === itemId) {
      setShowDeleteButton(null);
      setPrevIndex(null);
      Animated.parallel([
        Animated.timing(slideAnimations[index], {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(imageOpacities[index], {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      if (prevIndex !== null) {
        Animated.parallel([
          Animated.timing(slideAnimations[prevIndex], {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(imageOpacities[prevIndex], {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start();
      }
      setShowDeleteButton(itemId);
      setPrevIndex(index);
      Animated.parallel([
        Animated.timing(slideAnimations[index], {
          toValue: -70,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(imageOpacities[index], {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleDelete = () => {
    console.log('deleted');
  };

  return (
    <Block borderBottomColor={'grey'} borderBottomWidth={'0.5px'}>
      {items.map((item, index) => (
        <ItemCard
          key={item.id}
          item={item}
          handlePress={handlePress}
          handleDelete={handleDelete}
          slideAnimation={slideAnimations[index]}
          imageOpacity={imageOpacities[index]}
          showDeleteButton={showDeleteButton}/>
      ))}
    </Block>
  );
};

export default Article;
