import React, {FC, useState} from 'react';
import {Animated} from 'react-native';

import {Block} from '../styled/Block';

import cartons from '../items/cartons';
import CartonItem from './CartonItem';

const Carton: FC = ({}) => {
  const [slideAnimation] = useState(new Animated.Value(0));
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handlePress = () => {
    setShowDeleteButton(!showDeleteButton);
    Animated.timing(slideAnimation, {
      toValue: showDeleteButton ? 0 : -50,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Block borderBottomColor={'grey'} borderBottomWidth={'0.5px'}>
      {cartons.map((carton, index) => (
        <CartonItem
          key={carton.id}
          carton={carton}
          handlePress={handlePress}
          slideAnimation={slideAnimation}
          showDeleteButton={showDeleteButton}
        />
      ))}
    </Block>
  );
};

export default Carton;
