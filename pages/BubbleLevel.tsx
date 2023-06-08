import React, {useEffect, useState} from 'react';
import {accelerometer} from 'react-native-sensors';

import {Block} from '../styled/Block';
import {Animated} from 'react-native';

const BubbleLevel = () => {
  const [position, setPosition] = useState({x: 0, y: 0, z: 0});

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      setPosition({x, y, z});
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const bubbleLevelTransform = {
    transform: [{translateX: position.x * 10}, {translateY: position.y * 10}],
  };

  return (
    <Block flex={1} justifyContent={'center'} alignItems={'center'}>
      <Block
        width={'90%'}
        height={'80%'}
        borderWidth={'2px'}
        borderColor={'#0d3d8c'}
        bg={'#cadbf3'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Animated.View style={bubbleLevelTransform}>
          <Block
            width={'40px'}
            height={'40px'}
            borderRadius={'20px'}
            bg={'#0d3d8c'}
          />
        </Animated.View>
      </Block>
    </Block>
  );
};

export default BubbleLevel;
